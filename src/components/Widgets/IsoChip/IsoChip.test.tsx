import { render, screen } from '@testing-library/react';
import { IsoChip } from './IsoChip';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, options?: Record<string, unknown>) =>
            options ? `${key}:${JSON.stringify(options)}` : key,
    }),
}));

describe('IsoChip', () => {
    it('renders the chip with the correct label', () => {
        render(<IsoChip film={{ sensibility: 400 }} />);
        expect(screen.getByText('components.filmCard.iso:{"iso":400}')).toBeInTheDocument();
    });

    describe('getIsoBackgroundColor', () => {
        const cases: { iso: number; expectedBg: string; label: string }[] = [
            { iso: 25, expectedBg: '#1565C0', label: 'ultra-slow (ISO 25)' },
            { iso: 32, expectedBg: '#1565C0', label: 'ultra-slow boundary (ISO 32)' },
            { iso: 50, expectedBg: '#00796B', label: 'slow (ISO 50)' },
            { iso: 100, expectedBg: '#00796B', label: 'slow (ISO 100)' },
            { iso: 160, expectedBg: '#00796B', label: 'slow boundary (ISO 160)' },
            { iso: 200, expectedBg: '#388E3C', label: 'medium-slow (ISO 200)' },
            { iso: 320, expectedBg: '#388E3C', label: 'medium-slow boundary (ISO 320)' },
            { iso: 400, expectedBg: '#F9A825', label: 'standard (ISO 400)' },
            { iso: 800, expectedBg: '#E65100', label: 'fast boundary (ISO 800)' },
            { iso: 800, expectedBg: '#E65100', label: 'fast (ISO 800)' },
            { iso: 1600, expectedBg: '#C62828', label: 'pretty fast (ISO 1600)' },
            { iso: 3200, expectedBg: '#6A1B9A', label: 'very fast (ISO 3200)' },
            { iso: 6400, expectedBg: '#4A148C', label: 'ultra-fast (ISO 6400)' },
            { iso: 12800, expectedBg: '#4A148C', label: 'ultra-fast (ISO 12800)' },
        ];

        it.each(cases)('applies correct background color for $label', ({ iso, expectedBg }) => {
            const { container } = render(<IsoChip film={{ sensibility: iso }} />);
            const chip = container.querySelector('.MuiChip-root');
            expect(chip).toHaveStyle({ backgroundColor: expectedBg });
        });
    });

    it('renders as a small outlined chip', () => {
        const { container } = render(<IsoChip film={{ sensibility: 400 }} />);
        const chip = container.querySelector('.MuiChip-root');
        expect(chip).toHaveClass('MuiChip-sizeSmall');
        expect(chip).toHaveClass('MuiChip-outlined');
    });

    it('passes sensibility value to the translation function', () => {
        render(<IsoChip film={{ sensibility: 1600 }} />);
        expect(screen.getByText('components.filmCard.iso:{"iso":1600}')).toBeInTheDocument();
    });
});
