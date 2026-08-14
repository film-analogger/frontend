import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { AddFilmDialog } from './AddFilmDialog';
import type { FilmRead, ManufacturerRead } from '~/api/client';

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

const mockApiFilmsPost = vi.fn();
const mockApiManufacturersGetCollection = vi.fn();
const mockApiManufacturersPost = vi.fn();
vi.mock('~/api/client', async () => {
    const actual = await vi.importActual('~/api/client');
    return {
        ...actual,
        useFilmApi: () => ({ filmApi: { apiFilmsPost: mockApiFilmsPost } }),
        useManufacturerApi: () => ({
            manufacturerApi: {
                apiManufacturersGetCollection: mockApiManufacturersGetCollection,
                apiManufacturersPost: mockApiManufacturersPost,
            },
        }),
    };
});

describe('AddFilmDialog', () => {
    const onClose = vi.fn();
    const onCreated = vi.fn();

    beforeEach(() => {
        mockApiFilmsPost.mockReset();
        mockApiManufacturersPost.mockReset();
        mockApiManufacturersGetCollection.mockReset().mockResolvedValue({
            data: { 'hydra:member': [manufacturer] },
        });
        onClose.mockReset();
        onCreated.mockReset();
    });

    it('does not fetch manufacturers while closed', () => {
        render(
            <AddFilmDialog
                onClose={onClose}
                onCreated={onCreated}
                open={false}
            />,
        );
        expect(mockApiManufacturersGetCollection).not.toHaveBeenCalled();
    });

    it('disables the submit button until the required fields are filled', async () => {
        render(
            <AddFilmDialog
                onClose={onClose}
                onCreated={onCreated}
                open
            />,
        );
        expect(screen.getByText('films.add.submit').closest('button')).toBeDisabled();

        fireEvent.change(screen.getByLabelText('films.add.fields.name'), {
            target: { value: 'HP5 Plus' },
        });
        fireEvent.change(screen.getByLabelText('films.add.fields.sensibility'), {
            target: { value: '400' },
        });
        fireEvent.mouseDown(await screen.findByLabelText('dialogs.manufacturer.label'));
        fireEvent.click(within(screen.getByRole('listbox')).getByText('Ilford'));

        expect(screen.getByText('films.add.submit').closest('button')).toBeEnabled();
    }, 15000);

    it('submits the film with the selected manufacturer as an IRI', async () => {
        mockApiFilmsPost.mockResolvedValue({
            data: { '@id': '/films/1', id: '1', name: 'HP5 Plus' } as FilmRead,
        });
        render(
            <AddFilmDialog
                onClose={onClose}
                onCreated={onCreated}
                open
            />,
        );

        fireEvent.change(screen.getByLabelText('films.add.fields.name'), {
            target: { value: 'HP5 Plus' },
        });
        fireEvent.change(screen.getByLabelText('films.add.fields.sensibility'), {
            target: { value: '400' },
        });
        fireEvent.mouseDown(await screen.findByLabelText('dialogs.manufacturer.label'));
        fireEvent.click(within(screen.getByRole('listbox')).getByText('Ilford'));

        fireEvent.click(screen.getByText('films.add.submit'));

        await waitFor(() => {
            expect(mockApiFilmsPost).toHaveBeenCalled();
        });
        expect(mockApiFilmsPost.mock.calls[0]?.[0]).toMatchObject({
            filmWriteFilmCatalogStatusWrite: {
                name: 'HP5 Plus',
                sensibility: 400,
                manufacturer: '1',
                status: 'personal',
            },
        });
        expect(onCreated).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    }, 15000);

    it('lets the user create a manufacturer inline and selects it', async () => {
        mockApiManufacturersPost.mockResolvedValue({
            data: {
                '@id': '/manufacturers/2',
                '@type': 'manufacturer',
                id: '2',
                name: 'Bergger',
                status: 'personal',
            },
        });
        render(
            <AddFilmDialog
                onClose={onClose}
                onCreated={onCreated}
                open
            />,
        );

        fireEvent.click(await screen.findByLabelText('dialogs.manufacturer.add'));
        fireEvent.change(screen.getByLabelText('manufacturers.add.fields.name'), {
            target: { value: 'Bergger' },
        });
        fireEvent.click(screen.getByText('manufacturers.add.submit'));

        await waitFor(() => {
            expect(mockApiManufacturersPost).toHaveBeenCalled();
        });
        expect(mockApiManufacturersPost.mock.calls[0]?.[0]).toMatchObject({
            manufacturerWriteManufacturerCatalogStatusWrite: {
                name: 'Bergger',
                status: 'personal',
            },
        });
        expect(screen.getByLabelText('dialogs.manufacturer.label')).toHaveTextContent('Bergger');
    }, 15000);
});
