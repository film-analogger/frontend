import type { StopNotation } from './exposureMath';

const stopNotationKey = 'film-analogger:stop-notation';
const defaultLabKey = 'film-analogger:default-lab';
const defaultEnlargerKey = 'film-analogger:default-enlarger';

export const getStopNotation = (): StopNotation => {
    if (typeof window === 'undefined') {
        return 'fraction';
    }
    const stored = window.localStorage.getItem(stopNotationKey);
    return stored === 'decimal' ? 'decimal' : 'fraction';
};

export const setStopNotation = (notation: StopNotation): void => {
    window.localStorage.setItem(stopNotationKey, notation);
};

export const getDefaultLab = (): string =>
    typeof window === 'undefined' ? '' : (window.localStorage.getItem(defaultLabKey) ?? '');

export const setDefaultLab = (value: string): void => {
    window.localStorage.setItem(defaultLabKey, value);
};

export const getDefaultEnlarger = (): string =>
    typeof window === 'undefined' ? '' : (window.localStorage.getItem(defaultEnlargerKey) ?? '');

export const setDefaultEnlarger = (value: string): void => {
    window.localStorage.setItem(defaultEnlargerKey, value);
};
