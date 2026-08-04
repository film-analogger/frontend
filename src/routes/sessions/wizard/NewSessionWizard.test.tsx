import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NewSessionWizard from './NewSessionWizard';
import type { ChemistryRead, EnlargerRead, PhotoPaperRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: Record<string, unknown>) =>
            opts ? `${key}:${JSON.stringify(opts)}` : key,
    }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return { ...actual, useNavigate: () => mockNavigate };
});

const chemistry: ChemistryRead = {
    '@id': '/chemistries/1',
    '@type': 'chemistry',
    id: '1',
    name: 'D-76',
    process: 'B&W',
    chemistryType: {
        '@id': '/chemistry_types/1',
        '@type': 'chemistryType',
        typeCode: 'DEV',
        typeLabel: 'Developer',
        status: 'official',
    },
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Kodak',
        status: 'official',
    },
    status: 'official',
};

const enlarger: EnlargerRead = {
    '@id': '/enlargers/1',
    '@type': 'enlarger',
    id: '1',
    name: 'Durst M670',
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Durst',
        status: 'official',
    },
    status: 'official',
};

const photoPaper: PhotoPaperRead = {
    '@id': '/photo_papers/1',
    '@type': 'photoPaper',
    id: '1',
    name: 'Multigrade RC',
    manufacturer: {
        '@id': '/manufacturers/2',
        '@type': 'manufacturer',
        name: 'Ilford',
        status: 'official',
    },
    paperBase: 'rc',
    paperSurface: 'glossy',
    status: 'official',
};

const mockApiChemistriesGetCollection = vi.fn();
const mockApiPrintSessionsPost = vi.fn();
const mockApiPrintsPost = vi.fn();
const mockApiEnlargersGetCollection = vi.fn();
const mockApiPhotoPapersGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesGetCollection: mockApiChemistriesGetCollection },
        }),
        usePrintSessionApi: () => ({
            printSessionApi: { apiPrintSessionsPost: mockApiPrintSessionsPost },
        }),
        usePrintApi: () => ({ printApi: { apiPrintsPost: mockApiPrintsPost } }),
        useEnlargerApi: () => ({
            enlargerApi: { apiEnlargersGetCollection: mockApiEnlargersGetCollection },
        }),
        usePhotoPaperApi: () => ({
            photoPaperApi: { apiPhotoPapersGetCollection: mockApiPhotoPapersGetCollection },
        }),
    };
});

const renderWizard = () =>
    render(
        <MemoryRouter>
            <NewSessionWizard />
        </MemoryRouter>,
    );

const fillSessionContext = async () => {
    fireEvent.change(await screen.findByLabelText('sessions.wizard.fields.number'), {
        target: { value: '14' },
    });
    fireEvent.change(screen.getByLabelText('sessions.wizard.fields.lab'), {
        target: { value: 'Atelier Grenelle' },
    });
    fireEvent.mouseDown(screen.getByLabelText('sessions.wizard.fields.enlarger'));
    fireEvent.click(within(screen.getByRole('listbox')).getByText('Durst M670 · Durst'));
};

describe('NewSessionWizard', () => {
    beforeEach(() => {
        mockApiChemistriesGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [chemistry] },
        });
        mockApiPrintSessionsPost.mockReset();
        mockApiPrintsPost.mockReset();
        mockNavigate.mockReset();
        mockApiEnlargersGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [enlarger] },
        });
        mockApiPhotoPapersGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [photoPaper] },
        });
    });

    it('disables the next button until the required session fields are filled', async () => {
        renderWizard();
        expect(screen.getByText('sessions.wizard.next').closest('button')).toBeDisabled();

        await fillSessionContext();

        expect(screen.getByText('sessions.wizard.next').closest('button')).toBeEnabled();

        // Flushes the mount-time chemistries fetch inside act() so it doesn't
        // resolve after this test has already returned.
        await screen.findByText('sessions.wizard.next');
    }, 15000);

    it('walks through all 4 steps and submits the session and its prints', async () => {
        mockApiPrintSessionsPost.mockResolvedValue({
            data: { '@id': '/print_sessions/1', id: '1' },
        });
        mockApiPrintsPost.mockResolvedValue({ data: { '@id': '/prints/1', id: '1' } });

        renderWizard();

        await fillSessionContext();
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        expect(await screen.findByRole('combobox')).toBeInTheDocument();
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        expect(screen.getByText('sessions.wizard.printTitle:{"number":1}')).toBeInTheDocument();
        fireEvent.mouseDown(screen.getByLabelText('sessions.wizard.fields.photoPaper'));
        fireEvent.click(within(screen.getByRole('listbox')).getByText('Multigrade RC · Ilford'));
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        expect(screen.getByLabelText('sessions.wizard.fields.sessionNotes')).toBeInTheDocument();
        fireEvent.click(screen.getByText('sessions.wizard.submit'));

        await screen.findByText('sessions.wizard.submit');
        expect(mockApiPrintSessionsPost.mock.calls[0]?.[0]).toMatchObject({
            printSessionWritePrintSession: {
                lab: 'Atelier Grenelle',
                enlarger: '/enlargers/1',
                number: 14,
            },
        });
        expect(mockApiPrintsPost.mock.calls[0]?.[0]).toMatchObject({
            printWritePrint: {
                session: '/print_sessions/1',
                number: 1,
                photoPaper: '/photo_papers/1',
            },
        });
        expect(mockNavigate).toHaveBeenCalledWith('/sessions/1');
    }, 15000);

    it('lets the user select a chemistry for a bath', async () => {
        renderWizard();

        await fillSessionContext();
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        const select = await screen.findByLabelText('sessions.wizard.fields.chemistry');
        fireEvent.mouseDown(select);
        const listbox = within(screen.getByRole('listbox'));
        fireEvent.click(listbox.getByText('D-76 · Kodak'));

        expect(screen.getByRole('combobox')).toHaveTextContent('D-76 · Kodak');
    }, 15000);
});
