import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Footer from './Footer';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, options?: { year: number }) => {
            if (key === 'components.footer.copyright') {
                return `© ${options?.year} Film Analogger`;
            }
            const translations: Record<string, string> = {
                'components.footer.subtitle': 'Your analog film companion',
                'components.footer.privacy': 'Privacy',
                'components.footer.terms': 'Terms',
                'components.footer.cookies': 'Cookies',
                'components.footer.legals': 'Legals',
                'components.footer.contact': 'Contact',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Footer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render footer component', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    it('should display current year in copyright text', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('should display subtitle text', () => {
        render(<Footer />);
        expect(screen.getByText('Your analog film companion')).toBeInTheDocument();
    });

    it('should render all footer links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: /Privacy/i })).toHaveAttribute(
            'href',
            '/legal/privacy',
        );
        expect(screen.getByRole('link', { name: /Terms/i })).toHaveAttribute(
            'href',
            '/legal/terms',
        );
        expect(screen.getByRole('link', { name: /Cookies/i })).toHaveAttribute(
            'href',
            '/legal/cookies',
        );
        expect(screen.getByRole('link', { name: /Legals/i })).toHaveAttribute(
            'href',
            '/legal/legals',
        );
        expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute(
            'href',
            '/legal/contact',
        );
    });

    it('should have correct link styling', () => {
        render(<Footer />);
        const links = screen.getAllByRole('link');
        links.forEach((link) => {
            expect(link).toHaveClass('MuiLink-root');
        });
    });
});
