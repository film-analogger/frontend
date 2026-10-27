import { useColorScheme } from '@mui/material/styles';

export type AppearanceMode = 'system' | 'light' | 'dark' | 'lab';

/**
 * "lab" is not a MUI `mode` (MUI only knows light/dark/system) but a named
 * `colorScheme` forced onto the dark slot: engaging it switches mode to
 * `dark` and overrides the dark colorScheme to `lab`; disengaging resets the
 * colorScheme override and leaves mode on `dark`.
 */
export const useAppearanceMode = () => {
    const { mode, colorScheme, setMode, setColorScheme } = useColorScheme();

    const current: AppearanceMode | undefined = !mode
        ? undefined
        : colorScheme === 'lab'
          ? 'lab'
          : mode;

    const setAppearance = (next: AppearanceMode) => {
        if (next === 'lab') {
            setMode('dark');
            setColorScheme('lab');
            return;
        }
        setColorScheme(null);
        setMode(next);
    };

    return { current, setAppearance };
};
