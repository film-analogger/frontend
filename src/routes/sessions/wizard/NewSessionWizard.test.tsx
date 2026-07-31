import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NewSessionWizard from './NewSessionWizard';
import type { ChemistryRead } from '~/api/client';

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
    },
    manufacturer: { '@id': '/manufacturers/1', '@type': 'manufacturer', name: 'Kodak' },
};

const mockApiChemistriesGetCollection = vi.fn();
const mockApiPrintSessionsPost = vi.fn();
const mockApiPrintsPost = vi.fn();
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
    };
});

const renderWizard = () =>
    render(
        <MemoryRouter>
            <NewSessionWizard />
        </MemoryRouter>,
    );

const fillSessionContext = () => {
    fireEvent.change(screen.getByLabelText('sessions.wizard.fields.number'), {
        target: { value: '14' },
    });
    fireEvent.change(screen.getByLabelText('sessions.wizard.fields.lab'), {
        target: { value: 'Atelier Grenelle' },
    });
    fireEvent.change(screen.getByLabelText('sessions.wizard.fields.enlarger'), {
        target: { value: 'Durst M670' },
    });
};

describe('NewSessionWizard', () => {
    beforeEach(() => {
        mockApiChemistriesGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [chemistry] },
        });
        mockApiPrintSessionsPost.mockReset();
        mockApiPrintsPost.mockReset();
        mockNavigate.mockReset();
    });

    it('disables the next button until the required session fields are filled', () => {
        renderWizard();
        expect(screen.getByText('sessions.wizard.next').closest('button')).toBeDisabled();

        fillSessionContext();

        expect(screen.getByText('sessions.wizard.next').closest('button')).toBeEnabled();
    });

    it('walks through all 4 steps and submits the session and its prints', async () => {
        mockApiPrintSessionsPost.mockResolvedValue({
            data: { '@id': '/print_sessions/1', id: '1' },
        });
        mockApiPrintsPost.mockResolvedValue({ data: { '@id': '/prints/1', id: '1' } });

        renderWizard();

        fillSessionContext();
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        expect(await screen.findByRole('combobox')).toBeInTheDocument();
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        expect(screen.getByText('sessions.wizard.printTitle:{"number":1}')).toBeInTheDocument();
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        expect(screen.getByLabelText('sessions.wizard.fields.sessionNotes')).toBeInTheDocument();
        fireEvent.click(screen.getByText('sessions.wizard.submit'));

        await screen.findByText('sessions.wizard.submit');
        expect(mockApiPrintSessionsPost.mock.calls[0]?.[0]).toMatchObject({
            printSessionWritePrintSession: {
                lab: 'Atelier Grenelle',
                enlarger: 'Durst M670',
                number: 14,
            },
        });
        expect(mockApiPrintsPost.mock.calls[0]?.[0]).toMatchObject({
            printWritePrint: {
                session: '/print_sessions/1',
                number: 1,
            },
        });
        expect(mockNavigate).toHaveBeenCalledWith('/sessions/1');
    }, 10000);

    it('lets the user select a chemistry for a bath', async () => {
        renderWizard();

        fillSessionContext();
        fireEvent.click(screen.getByText('sessions.wizard.next'));

        const select = await screen.findByLabelText('sessions.wizard.fields.chemistry');
        fireEvent.mouseDown(select);
        const listbox = within(screen.getByRole('listbox'));
        fireEvent.click(listbox.getByText('D-76 · Kodak'));

        expect(screen.getByRole('combobox')).toHaveTextContent('D-76 · Kodak');
    }, 10000);
});
