import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NewDevelopmentLogWizard from './NewDevelopmentLogWizard';
import type { ChemistryRead, FilmRead } from '~/api/client';

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

const film: FilmRead = {
    '@id': '/films/1',
    '@type': 'film',
    id: '1',
    name: 'HP5 Plus',
    description: '',
    process: 'B&W',
    sensibility: 400,
    manufacturer: {
        '@id': '/manufacturers/1',
        '@type': 'manufacturer',
        name: 'Ilford',
        status: 'official',
    },
    status: 'official',
};

const chemistry: ChemistryRead = {
    '@id': '/chemistries/1',
    '@type': 'chemistry',
    id: '1',
    name: 'DD-X',
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
        name: 'Ilford',
        status: 'official',
    },
    status: 'official',
};

const mockApiFilmsGetCollection = vi.fn();
const mockApiCamerasGetCollection = vi.fn();
const mockApiChemistriesGetCollection = vi.fn();
const mockApiTagsGetCollection = vi.fn();
const mockApiDevelopmentLogsPost = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useFilmApi: () => ({ filmApi: { apiFilmsGetCollection: mockApiFilmsGetCollection } }),
        useCameraApi: () => ({
            cameraApi: { apiCamerasGetCollection: mockApiCamerasGetCollection },
        }),
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesGetCollection: mockApiChemistriesGetCollection },
        }),
        useTagApi: () => ({ tagApi: { apiTagsGetCollection: mockApiTagsGetCollection } }),
        useDevelopmentLogApi: () => ({
            developmentLogApi: { apiDevelopmentLogsPost: mockApiDevelopmentLogsPost },
        }),
    };
});

const renderWizard = () =>
    render(
        <MemoryRouter>
            <NewDevelopmentLogWizard />
        </MemoryRouter>,
    );

const fillContext = async () => {
    fireEvent.mouseDown(await screen.findByLabelText('negatifs.wizard.fields.film'));
    fireEvent.click(within(screen.getByRole('listbox')).getByText('HP5 Plus · Ilford'));
    fireEvent.change(screen.getByLabelText('negatifs.wizard.fields.shotYear'), {
        target: { value: '2026' },
    });
};

describe('NewDevelopmentLogWizard', () => {
    beforeEach(() => {
        mockApiFilmsGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [film] },
        });
        mockApiCamerasGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [] },
        });
        mockApiChemistriesGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [chemistry] },
        });
        mockApiTagsGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [] },
        });
        mockApiDevelopmentLogsPost.mockReset();
        mockNavigate.mockReset();
    });

    it('disables the next button until the required shooting fields are filled', async () => {
        renderWizard();
        expect(screen.getByText('negatifs.wizard.next').closest('button')).toBeDisabled();

        await fillContext();

        expect(screen.getByText('negatifs.wizard.next').closest('button')).toBeEnabled();
    }, 15000);

    it('walks through all 4 steps and submits the development log', async () => {
        mockApiDevelopmentLogsPost.mockResolvedValue({
            data: { '@id': '/development_logs/1', id: '1' },
        });

        renderWizard();

        await fillContext();
        fireEvent.click(screen.getByText('negatifs.wizard.next'));

        fireEvent.change(await screen.findByLabelText('negatifs.wizard.fields.durationSeconds'), {
            target: { value: '570' },
        });
        fireEvent.click(screen.getByText('negatifs.wizard.next'));

        expect(await screen.findByText('negatifs.wizard.fields.rating')).toBeInTheDocument();
        fireEvent.click(screen.getByText('negatifs.wizard.next'));

        expect(
            screen.getByLabelText('negatifs.wizard.fields.developmentNotes'),
        ).toBeInTheDocument();
        fireEvent.click(screen.getByText('negatifs.wizard.submit'));

        await screen.findByText('negatifs.wizard.submit');
        expect(mockApiDevelopmentLogsPost.mock.calls[0]?.[0]).toMatchObject({
            developmentLogWriteDevelopmentLog: {
                film: '/films/1',
                isoShotAt: 400,
                process: 'B&W',
                shotAt: { year: 2026 },
            },
        });
        expect(mockNavigate).toHaveBeenCalledWith('/negatifs/1');
    }, 15000);

    it('lets the user select a chemistry for a development step', async () => {
        renderWizard();

        await fillContext();
        fireEvent.click(screen.getByText('negatifs.wizard.next'));

        const select = await screen.findByLabelText('negatifs.wizard.fields.chemistry');
        fireEvent.mouseDown(select);
        const listbox = within(screen.getByRole('listbox'));
        fireEvent.click(listbox.getByText('DD-X · Ilford'));

        expect(screen.getByRole('combobox')).toHaveTextContent('DD-X · Ilford');
    }, 15000);
});
