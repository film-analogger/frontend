import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { AddChemistryDialog } from './AddChemistryDialog';
import type { ChemistryRead, ChemistryTypeRead, ManufacturerRead } from '~/api/client';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const manufacturer: ManufacturerRead = {
    '@id': '/manufacturers/1',
    '@type': 'manufacturer',
    id: '1',
    name: 'Ilford',
    status: 'official',
};

const bwDeveloper: ChemistryTypeRead = {
    '@id': '/chemistry_types/1',
    '@type': 'chemistryType',
    id: '1',
    process: 'B&W',
    typeCode: 'DEV',
    typeLabel: 'Révélateur film',
    status: 'official',
};

const c41Bleach: ChemistryTypeRead = {
    '@id': '/chemistry_types/2',
    '@type': 'chemistryType',
    id: '2',
    process: 'C-41',
    typeCode: 'BLEACH',
    typeLabel: 'Blanchiment',
    status: 'official',
};

const mockApiChemistriesPost = vi.fn();
const mockApiManufacturersGetCollection = vi.fn();
const mockApiChemistryTypesGetCollection = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useChemistryApi: () => ({
            chemistryApi: { apiChemistriesPost: mockApiChemistriesPost },
        }),
        useManufacturerApi: () => ({
            manufacturerApi: { apiManufacturersGetCollection: mockApiManufacturersGetCollection },
        }),
        useChemistryTypeApi: () => ({
            chemistryTypeApi: {
                apiChemistryTypesGetCollection: mockApiChemistryTypesGetCollection,
            },
        }),
    };
});

describe('AddChemistryDialog', () => {
    const onClose = vi.fn();
    const onCreated = vi.fn();

    beforeEach(() => {
        mockApiChemistriesPost.mockReset();
        onClose.mockReset();
        onCreated.mockReset();
        mockApiManufacturersGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [manufacturer] },
        });
        mockApiChemistryTypesGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [bwDeveloper, c41Bleach] },
        });
    });

    const selectManufacturer = async () => {
        fireEvent.mouseDown(await screen.findByLabelText('dialogs.manufacturer.label'));
        fireEvent.click(within(screen.getByRole('listbox')).getByText('Ilford'));
    };

    it('only offers chemistry types matching the selected process', async () => {
        render(
            <AddChemistryDialog
                onClose={onClose}
                onCreated={onCreated}
                open
            />,
        );

        fireEvent.mouseDown(await screen.findByLabelText('chemistries.add.fields.chemistryType'));
        expect(screen.getByText('Révélateur film')).toBeInTheDocument();
        expect(screen.queryByText('Blanchiment')).not.toBeInTheDocument();
    }, 15000);

    it('submits a dilution row alongside the chemistry', async () => {
        mockApiChemistriesPost.mockResolvedValue({
            data: { '@id': '/chemistries/1', id: '1' } as ChemistryRead,
        });
        render(
            <AddChemistryDialog
                onClose={onClose}
                onCreated={onCreated}
                open
            />,
        );

        fireEvent.change(screen.getByLabelText('chemistries.add.fields.name'), {
            target: { value: 'ID-11' },
        });
        await selectManufacturer();
        fireEvent.mouseDown(screen.getByLabelText('chemistries.add.fields.chemistryType'));
        fireEvent.click(within(screen.getByRole('listbox')).getByText('Révélateur film'));

        fireEvent.click(screen.getByText('chemistries.add.submit'));

        await waitFor(() => {
            expect(mockApiChemistriesPost).toHaveBeenCalled();
        });
        expect(mockApiChemistriesPost.mock.calls[0]?.[0]).toMatchObject({
            chemistryWriteChemistryCatalogStatusWrite: {
                name: 'ID-11',
                manufacturer: '/manufacturers/1',
                chemistryType: '/chemistry_types/1',
                dilutions: [{ chemistryParts: 1, waterParts: 9, official: false }],
            },
        });
        expect(onCreated).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    }, 15000);

    it('adds a second dilution row that gets included in the payload', async () => {
        mockApiChemistriesPost.mockResolvedValue({
            data: { '@id': '/chemistries/1', id: '1' } as ChemistryRead,
        });
        render(
            <AddChemistryDialog
                onClose={onClose}
                onCreated={onCreated}
                open
            />,
        );

        fireEvent.change(screen.getByLabelText('chemistries.add.fields.name'), {
            target: { value: 'ID-11' },
        });
        await selectManufacturer();
        fireEvent.mouseDown(screen.getByLabelText('chemistries.add.fields.chemistryType'));
        fireEvent.click(within(screen.getByRole('listbox')).getByText('Révélateur film'));

        fireEvent.click(screen.getByText('chemistries.add.fields.dilutionAdd'));
        const waterInputs = screen.getAllByLabelText('chemistries.add.fields.dilutionWaterParts');
        fireEvent.change(waterInputs[1] as HTMLInputElement, { target: { value: '14' } });

        fireEvent.click(screen.getByText('chemistries.add.submit'));

        await waitFor(() => {
            expect(mockApiChemistriesPost).toHaveBeenCalled();
        });
        expect(mockApiChemistriesPost.mock.calls[0]?.[0]).toMatchObject({
            chemistryWriteChemistryCatalogStatusWrite: {
                dilutions: [
                    { chemistryParts: 1, waterParts: 9, official: false },
                    { chemistryParts: 1, waterParts: 14, official: false },
                ],
            },
        });
    }, 15000);
});
