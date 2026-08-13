import { render, screen } from '@testing-library/react';
import { PageLoader } from './PageLoader';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('@mui/material/styles', () => ({
    useColorScheme: vi.fn(),
}));

vi.mock('@mui/material', async (importOriginal) => ({
    ...(await importOriginal()),
    useTheme: vi.fn(),
}));

import { useColorScheme as mockUseColorScheme } from '@mui/material/styles';
import { useTheme as mockUseTheme } from '@mui/material';

const STEPS = [
    { title: 'Ouverture du carnet', hint: 'Session vérifiée.' },
    { title: 'Catalogue des pellicules', hint: '184 références.' },
];

const setColorScheme = (colorScheme: string | undefined) => {
    vi.mocked(mockUseColorScheme).mockReturnValue({ colorScheme } as any);
};

describe('PageLoader', () => {
    beforeEach(() => {
        setColorScheme('light');
        vi.mocked(mockUseTheme).mockReturnValue({
            palette: { text: { primary: '#1B1917' } },
        });
    });

    it('exposes an accessible status region announcing loading', () => {
        render(
            <PageLoader
                activeStep={0}
                steps={STEPS}
            />,
        );
        expect(screen.getByRole('status')).toHaveAccessibleName('app.loading');
    });

    it('renders the active step title, hint and count', () => {
        render(
            <PageLoader
                activeStep={0}
                steps={STEPS}
            />,
        );
        expect(screen.getByText('Ouverture du carnet')).toBeInTheDocument();
        expect(screen.getByText('Session vérifiée.')).toBeInTheDocument();
        expect(screen.getByText('1 / 2')).toBeInTheDocument();
    });

    it('advances to the second step', () => {
        render(
            <PageLoader
                activeStep={1}
                steps={STEPS}
            />,
        );
        expect(screen.getByText('Catalogue des pellicules')).toBeInTheDocument();
        expect(screen.getByText('2 / 2')).toBeInTheDocument();
    });

    it('clamps an out-of-range activeStep to the last step', () => {
        render(
            <PageLoader
                activeStep={5}
                steps={STEPS}
            />,
        );
        expect(screen.getByText('Catalogue des pellicules')).toBeInTheDocument();
        expect(screen.getByText('2 / 2')).toBeInTheDocument();
    });

    it.each([
        ['light', 'logolight.svg'],
        ['dark', 'logodark.svg'],
        ['lab', 'logolab.svg'],
    ])('uses the %s logo variant', (colorScheme, expectedSrc) => {
        setColorScheme(colorScheme);
        const { container } = render(
            <PageLoader
                activeStep={0}
                steps={STEPS}
            />,
        );
        expect(container.querySelector('img')).toHaveAttribute('src', `/${expectedSrc}`);
    });
});
