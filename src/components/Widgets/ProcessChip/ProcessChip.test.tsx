import { render, screen } from '@testing-library/react';
import { ProcessChip } from './ProcessChip';

describe('ProcessChip', () => {
    it('renders the process label', () => {
        render(<ProcessChip film={{ process: 'C-41' }} />);
        expect(screen.getByText('C-41')).toBeInTheDocument();
    });

    it('renders C-41 process with rainbow gradient', () => {
        const { container } = render(<ProcessChip film={{ process: 'C-41' }} />);
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveStyle({
            background: 'linear-gradient(90deg, Red, Orange, Yellow, Green, Blue, Indigo, Violet)',
            color: '#ffffff',
        });
    });

    it('renders E-6 process with blue background', () => {
        const { container } = render(<ProcessChip film={{ process: 'E-6' }} />);
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveStyle({ backgroundColor: '#1565C0', color: '#ffffff' });
    });

    it('renders B&W process with dark background', () => {
        const { container } = render(<ProcessChip film={{ process: 'B&W' }} />);
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveStyle({ backgroundColor: '#1a1a1a', color: '#ffffff' });
    });

    it('renders ECN-2 process with yellow background and dark text', () => {
        const { container } = render(<ProcessChip film={{ process: 'ECN-2' }} />);
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveStyle({ backgroundColor: '#F9A825', color: '#1a1a1a' });
    });

    it('renders RA4 process with orange background', () => {
        const { container } = render(<ProcessChip film={{ process: 'RA4' }} />);
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveStyle({ backgroundColor: '#E65100', color: '#ffffff' });
    });

    it('renders E-6 label', () => {
        render(<ProcessChip film={{ process: 'E-6' }} />);
        expect(screen.getByText('E-6')).toBeInTheDocument();
    });

    it('renders B&W label', () => {
        render(<ProcessChip film={{ process: 'B&W' }} />);
        expect(screen.getByText('B&W')).toBeInTheDocument();
    });

    it('renders ECN-2 label', () => {
        render(<ProcessChip film={{ process: 'ECN-2' }} />);
        expect(screen.getByText('ECN-2')).toBeInTheDocument();
    });

    it('renders RA4 label', () => {
        render(<ProcessChip film={{ process: 'RA4' }} />);
        expect(screen.getByText('RA4')).toBeInTheDocument();
    });

    it('renders chip with small size', () => {
        const { container } = render(<ProcessChip film={{ process: 'C-41' }} />);
        const chip = container.querySelector('.MuiChip-sizeSmall');
        expect(chip).toBeInTheDocument();
    });

    it('renders chip with outlined variant', () => {
        const { container } = render(<ProcessChip film={{ process: 'C-41' }} />);
        const chip = container.querySelector('.MuiChip-outlined');
        expect(chip).toBeInTheDocument();
    });
});
