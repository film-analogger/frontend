import { render, screen } from '@testing-library/react';
import { type ManufacturerRead } from '~/api/client';
import { ManufacturerCard } from './ManufacturerCard';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const baseManufacturer: Pick<
    ManufacturerRead,
    'id' | 'name' | 'primaryColor' | 'secondaryColor' | 'tertiaryColor' | 'website'
> = {
    id: '1',
    name: 'Kodak',
};

describe('ManufacturerCard', () => {
    it('renders the manufacturer name', () => {
        render(
            <ManufacturerCard
                chemistriesCount={0}
                filmsCount={0}
                manufacturer={baseManufacturer}
                processes={[]}
            />,
        );
        expect(screen.getByText('Kodak')).toBeInTheDocument();
    });

    it('renders the films and chemistries counts', () => {
        render(
            <ManufacturerCard
                chemistriesCount={3}
                filmsCount={12}
                manufacturer={baseManufacturer}
                processes={[]}
            />,
        );
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('manufacturers.list.films')).toBeInTheDocument();
        expect(screen.getByText('manufacturers.list.chemistries')).toBeInTheDocument();
    });

    it('renders a chip for each process', () => {
        render(
            <ManufacturerCard
                chemistriesCount={0}
                filmsCount={0}
                manufacturer={baseManufacturer}
                processes={['C-41', 'E-6']}
            />,
        );
        expect(screen.getByText('C-41')).toBeInTheDocument();
        expect(screen.getByText('E-6')).toBeInTheDocument();
    });

    it('does not render website link when website is not set', () => {
        render(
            <ManufacturerCard
                chemistriesCount={0}
                filmsCount={0}
                manufacturer={baseManufacturer}
                processes={[]}
            />,
        );
        expect(screen.queryByText(/http/i)).not.toBeInTheDocument();
    });

    it('renders the website when set', () => {
        render(
            <ManufacturerCard
                chemistriesCount={0}
                filmsCount={0}
                manufacturer={{ ...baseManufacturer, website: 'https://www.kodak.com' }}
                processes={[]}
            />,
        );
        expect(screen.getByText('https://www.kodak.com')).toBeInTheDocument();
    });

    it('applies primaryColor and secondaryColor to the header band', () => {
        render(
            <ManufacturerCard
                chemistriesCount={0}
                filmsCount={0}
                manufacturer={{
                    ...baseManufacturer,
                    primaryColor: '#FFD700',
                    secondaryColor: '#000000',
                }}
                processes={[]}
            />,
        );
        expect(screen.getByText('Kodak')).toHaveStyle({
            backgroundColor: '#FFD700',
            color: '#000000',
        });
    });
});
