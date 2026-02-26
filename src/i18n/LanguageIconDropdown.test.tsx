import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageIconDropdown from './LanguageIconDropdown';

const mockChangeLanguage = vi.fn().mockResolvedValue(undefined);
const mockT = vi.fn((key: string) => key);
let mockLanguage = 'en';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: mockT,
        i18n: {
            changeLanguage: mockChangeLanguage,
            get language() {
                return mockLanguage;
            },
        },
    }),
}));

describe('LanguageIconDropdown', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockLanguage = 'en';
    });

    it('renders the language icon button', () => {
        render(<LanguageIconDropdown />);
        const button = screen.getByLabelText('language-select-toggle');
        expect(button).toBeDefined();
    });

    it('does not show menu initially', () => {
        render(<LanguageIconDropdown />);
        expect(screen.queryByRole('menu')).toBeNull();
    });

    it('opens the menu when the icon button is clicked', () => {
        render(<LanguageIconDropdown />);

        const button = screen.getByLabelText('language-select-toggle');
        fireEvent.click(button);

        expect(screen.getByRole('menu')).toBeDefined();
    });

    it('displays English and French menu items', () => {
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));

        expect(screen.getByText('app.language.en')).toBeDefined();
        expect(screen.getByText('app.language.fr')).toBeDefined();
    });

    it('marks the current language (en) as selected', () => {
        mockLanguage = 'en';
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));

        const enMenuItem = screen.getByText('app.language.en').closest('li');
        const frMenuItem = screen.getByText('app.language.fr').closest('li');

        expect(enMenuItem?.classList.toString()).toContain('selected');
        expect(frMenuItem?.classList.toString()).not.toContain('selected');
    });

    it('marks the current language (fr) as selected', () => {
        mockLanguage = 'fr';
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));

        const enMenuItem = screen.getByText('app.language.en').closest('li');
        const frMenuItem = screen.getByText('app.language.fr').closest('li');

        expect(enMenuItem?.classList.toString()).not.toContain('selected');
        expect(frMenuItem?.classList.toString()).toContain('selected');
    });

    it('calls changeLanguage with "en" when English is clicked', async () => {
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));
        fireEvent.click(screen.getByText('app.language.en'));

        await waitFor(() => {
            expect(mockChangeLanguage).toHaveBeenCalledWith('en');
        });
    });

    it('calls changeLanguage with "fr" when French is clicked', async () => {
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));
        fireEvent.click(screen.getByText('app.language.fr'));

        await waitFor(() => {
            expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
        });
    });

    it('closes the menu after selecting a language', async () => {
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));
        expect(screen.getByRole('menu')).toBeDefined();

        fireEvent.click(screen.getByText('app.language.fr'));

        await waitFor(() => {
            expect(screen.queryByRole('menu')).toBeNull();
        });
    });

    it('closes the menu when clicking outside (onClose)', async () => {
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));
        expect(screen.getByRole('menu')).toBeDefined();

        // Press Escape to close the menu
        fireEvent.keyDown(screen.getByText('app.language.en').closest('li') as any, {
            key: 'Escape',
            code: 'Escape',
        });

        await waitFor(() => {
            expect(screen.queryByRole('menu')).toBeNull();
        });
    });

    it('logs error when changeLanguage fails', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const error = new Error('Language change failed');
        mockChangeLanguage.mockRejectedValueOnce(error);

        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));
        fireEvent.click(screen.getByText('app.language.fr'));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });

    it('passes additional IconButton props through', () => {
        render(<LanguageIconDropdown color="primary" />);
        const button = screen.getByLabelText('language-select-toggle');
        expect(button.classList.toString()).toContain('Primary');
    });

    it('sets correct aria attributes when menu is closed', () => {
        render(<LanguageIconDropdown />);
        const button = screen.getByLabelText('language-select-toggle');

        expect(button.getAttribute('aria-controls')).toBeNull();
        expect(button.getAttribute('aria-expanded')).toBeNull();
        expect(button.getAttribute('aria-haspopup')).toBe('true');
    });

    it('sets correct aria attributes when menu is open', () => {
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));

        const button = screen.getByLabelText('language-select-toggle');
        expect(button.getAttribute('aria-controls')).toBe('color-scheme-menu');
        expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('uses t function to translate language labels', () => {
        render(<LanguageIconDropdown />);

        fireEvent.click(screen.getByLabelText('language-select-toggle'));

        expect(mockT).toHaveBeenCalledWith('app.language.en');
        expect(mockT).toHaveBeenCalledWith('app.language.fr');
    });

    it('has data-screenshot attribute for toggle button', () => {
        render(<LanguageIconDropdown />);
        const button = screen.getByLabelText('language-select-toggle');
        expect(button.getAttribute('data-screenshot')).toBe('toggle-language');
    });

    it('can open and close the menu multiple times', () => {
        render(<LanguageIconDropdown />);

        // Open
        fireEvent.click(screen.getByLabelText('language-select-toggle'));
        expect(screen.getByRole('menu')).toBeDefined();

        // Press Escape to close the menu
        fireEvent.keyDown(screen.getByText('app.language.en').closest('li') as any, {
            key: 'Escape',
            code: 'Escape',
        });

        // Open again
        fireEvent.click(screen.getByLabelText('language-select-toggle'));
        expect(screen.getByRole('menu')).toBeDefined();
    });
});
