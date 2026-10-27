import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppLogo } from './AppLogo';

vi.mock('@mui/material/styles', () => ({
    useColorScheme: vi.fn(),
    useTheme: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(),
}));

vi.mock('@mui/material', async (importOriginal) => ({
    ...(await importOriginal()),
    useMediaQuery: vi.fn(),
}));

import {
    useColorScheme as mockUseColorScheme,
    useTheme as mockUseTheme,
} from '@mui/material/styles';

import { useTranslation as mockUseTranslation } from 'react-i18next';
import { useMediaQuery as useMediaQueryMock } from '@mui/material';

const mockColorScheme = (colorScheme: string | undefined) => {
    vi.mocked(mockUseColorScheme).mockReturnValue({
        colorScheme,
        setMode: vi.fn(),
        setColorScheme: vi.fn(),
    } as any);
};

describe('AppLogo', () => {
    describe('Inline logo', () => {
        beforeEach(() => {
            vi.mocked(useMediaQueryMock).mockReturnValue(true);
            mockColorScheme('light');

            vi.mocked(mockUseTheme).mockReturnValue({
                breakpoints: {
                    up: vi.fn().mockReturnValue(true),
                },
            });

            vi.mocked(mockUseTranslation).mockReturnValue({
                t: (key: string) => key,
                i18n: {},
            } as any);
        });

        it('renders light logo in light mode', () => {
            render(<AppLogo />);
            expect(screen.getByAltText('components.applogo.logoLight')).toBeInTheDocument();
        });

        it('renders dark logo in dark mode', () => {
            mockColorScheme('dark');
            render(<AppLogo />);
            expect(screen.getByAltText('components.applogo.logoDark')).toBeInTheDocument();
        });

        it('renders the darkroom logo in lab mode', () => {
            mockColorScheme('lab');
            render(<AppLogo />);
            expect(screen.getByAltText('components.applogo.logoLab')).toBeInTheDocument();
        });

        it('accepts custom width and height props', () => {
            render(<AppLogo height="100px" />);
            const lightLogo = screen.getByAltText('components.applogo.logoLight');
            expect(lightLogo).toHaveStyle({ height: '100px' });
        });

        it('uses correct image sources light mode', () => {
            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logolight-inline'))).toBe(true);
        });

        it('uses correct image sources dark mode', () => {
            mockColorScheme('dark');
            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logodark-inline'))).toBe(true);
        });

        it('uses correct image sources lab mode', () => {
            mockColorScheme('lab');
            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logolab-inline'))).toBe(true);
        });
    });

    describe('Small logo', () => {
        beforeEach(() => {
            vi.mocked(useMediaQueryMock).mockReturnValue(false);
            mockColorScheme('light');

            vi.mocked(mockUseTheme).mockReturnValue({
                breakpoints: {
                    up: vi.fn().mockReturnValue(true),
                },
            });

            vi.mocked(mockUseTranslation).mockReturnValue({
                t: (key: string) => key,
                i18n: {},
            } as any);
        });

        it('renders light logo in light mode', () => {
            render(<AppLogo />);
            expect(screen.getByAltText('components.applogo.logoLight')).toBeInTheDocument();
        });

        it('renders dark logo in dark mode', () => {
            mockColorScheme('dark');
            render(<AppLogo />);
            expect(screen.getByAltText('components.applogo.logoDark')).toBeInTheDocument();
        });

        it('renders the darkroom logo in lab mode', () => {
            mockColorScheme('lab');
            render(<AppLogo />);
            expect(screen.getByAltText('components.applogo.logoLab')).toBeInTheDocument();
        });

        it('accepts custom width and height props', () => {
            render(
                <AppLogo
                    height="100px"
                    width="100px"
                />,
            );
            const lightLogo = screen.getByAltText('components.applogo.logoLight');
            expect(lightLogo).toHaveStyle({ height: '100px', width: '100px' });
        });

        it('uses correct image sources light mode', () => {
            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logolight.svg'))).toBe(true);
        });

        it('uses correct image sources dark mode', () => {
            mockColorScheme('dark');
            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logodark.svg'))).toBe(true);
        });

        it('uses correct image sources lab mode', () => {
            mockColorScheme('lab');
            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logolab.svg'))).toBe(true);
        });
    });
});
