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

describe('AppLogo', () => {
    describe('Inline logo', () => {
        beforeEach(() => {
            vi.mocked(useMediaQueryMock).mockReturnValue(true);

            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'light',
                systemMode: 'light',
                setMode: vi.fn(),
            } as any);

            vi.mocked(mockUseTheme).mockReturnValue({
                breakpoints: {
                    up: vi.fn().mockReturnValue(true),
                },
            } as any);

            vi.mocked(mockUseTranslation).mockReturnValue({
                t: (key: string) => key,
                i18n: {},
            } as any);
        });

        it('renders light logo in light mode', () => {
            render(<AppLogo />);
            const lightLogo = screen.getByAltText('components.applogo.logoLight');
            expect(lightLogo).toBeInTheDocument();
        });

        it('renders dark logo in dark mode', () => {
            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'dark',
                systemMode: 'dark',
                setMode: vi.fn(),
            } as any);

            render(<AppLogo />);
            const darkLogo = screen.getByAltText('components.applogo.logoDark');
            expect(darkLogo).toBeInTheDocument();
        });

        it('uses systemMode when mode is system', () => {
            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'system',
                systemMode: 'dark',
                setMode: vi.fn(),
            } as any);

            render(<AppLogo />);
            const darkLogo = screen.getByAltText('components.applogo.logoDark');
            expect(darkLogo).toBeInTheDocument();
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
            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'dark',
                systemMode: 'dark',
                setMode: vi.fn(),
            } as any);

            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logodark-inline'))).toBe(true);
        });
    });

    describe('Small logo', () => {
        beforeEach(() => {
            vi.mocked(useMediaQueryMock).mockReturnValue(false);

            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'light',
                systemMode: 'light',
                setMode: vi.fn(),
            } as any);

            vi.mocked(mockUseTheme).mockReturnValue({
                breakpoints: {
                    up: vi.fn().mockReturnValue(true),
                },
            } as any);

            vi.mocked(mockUseTranslation).mockReturnValue({
                t: (key: string) => key,
                i18n: {},
            } as any);
        });

        it('renders light logo in light mode', () => {
            render(<AppLogo />);
            const lightLogo = screen.getByAltText('components.applogo.logoLight-small');
            expect(lightLogo).toBeInTheDocument();
        });

        it('renders dark logo in dark mode', () => {
            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'dark',
                systemMode: 'dark',
                setMode: vi.fn(),
            } as any);

            render(<AppLogo />);
            const darkLogo = screen.getByAltText('components.applogo.logoDark-small');
            expect(darkLogo).toBeInTheDocument();
        });

        it('uses systemMode when mode is system', () => {
            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'system',
                systemMode: 'dark',
                setMode: vi.fn(),
            } as any);

            render(<AppLogo />);
            const darkLogo = screen.getByAltText('components.applogo.logoDark-small');
            expect(darkLogo).toBeInTheDocument();
        });

        it('accepts custom width and height props', () => {
            render(
                <AppLogo
                    height="100px"
                    width="100px"
                />,
            );
            const lightLogo = screen.getByAltText('components.applogo.logoLight-small');
            expect(lightLogo).toHaveStyle({ height: '100px', width: '100px' });
        });

        it('uses correct image sources light mode', () => {
            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logolight.svg'))).toBe(true);
        });

        it('uses correct image sources dark mode', () => {
            vi.mocked(mockUseColorScheme).mockReturnValue({
                mode: 'dark',
                systemMode: 'dark',
                setMode: vi.fn(),
            } as any);

            render(<AppLogo />);
            const images = screen.getAllByRole('img');
            expect(images.some((img: any) => img.src.includes('logodark.svg'))).toBe(true);
        });
    });
});
