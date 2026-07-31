import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ChemistryList from './ChemistryList';
import type { ChemistryRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, opts?: { count?: number }) =>
            `${key}${opts?.count !== undefined ? `:${String(opts.count)}` : ''}`,
    }),
}));

const makeChemistry = (overrides: Partial<ChemistryRead>): ChemistryRead => ({
    '@id': `/chemistries/${overrides.id ?? '1'}`,
    '@type': 'chemistry',
    id: '1',
    name: 'D-76',
    process: 'B&W',
    description: '',
    chemistryType: {
        '@id': '/chemistry_types/1',
        '@type': 'chemistryType',
        typeCode: 'DEV',
        typeLabel: 'Developer',
    },
    manufacturer: { '@id': '/manufacturers/1', '@type': 'manufacturer', name: 'Kodak' },
    dilutions: [{ chemistryParts: 1, waterParts: 1, official: true, label: '1+1' }],
    ...overrides,
});

const mockApiChemistriesGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesGetCollection: mockApiChemistriesGetCollection },
        }),
    };
});

const renderChemistryList = () =>
    render(
        <MemoryRouter>
            <ChemistryList />
        </MemoryRouter>,
    );

describe('ChemistryList', () => {
    beforeEach(() => {
        mockApiChemistriesGetCollection.mockReset();
    });

    it('shows a loading indicator while chemistries are being fetched', () => {
        mockApiChemistriesGetCollection.mockReturnValue(new Promise(() => {}));
        renderChemistryList();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        mockApiChemistriesGetCollection.mockRejectedValue(new Error('boom'));
        renderChemistryList();
        expect(await screen.findByText('errors.api.loadingData')).toBeInTheDocument();
    });

    it('renders the fetched chemistries', async () => {
        mockApiChemistriesGetCollection.mockResolvedValue({
            data: { 'hydra:member': [makeChemistry({ id: '1', name: 'D-76' })] },
        });
        renderChemistryList();
        expect(await screen.findByText('D-76')).toBeInTheDocument();
        expect(screen.getByText('Kodak')).toBeInTheDocument();
        expect(screen.getByText('1+1')).toBeInTheDocument();
    });

    it('filters chemistries by process when a filter chip is clicked', async () => {
        mockApiChemistriesGetCollection.mockResolvedValue({
            data: {
                'hydra:member': [
                    makeChemistry({ id: '1', name: 'D-76', process: 'B&W' }),
                    makeChemistry({ id: '2', name: 'Flexicolor', process: 'C-41' }),
                ],
            },
        });
        renderChemistryList();
        expect(await screen.findByText('D-76')).toBeInTheDocument();

        fireEvent.click(screen.getByText('C-41 · 1'));

        expect(screen.queryByText('D-76')).not.toBeInTheDocument();
        expect(screen.getByText('Flexicolor')).toBeInTheDocument();
    });
});
