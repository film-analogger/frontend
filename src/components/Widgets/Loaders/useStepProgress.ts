import React from 'react';

/**
 * Drives a PageLoader's activeStep from a set of promises resolved in
 * parallel: each call to trackStep advances the step count by one as soon
 * as its promise settles, regardless of which one finishes first.
 */
export const useStepProgress = (): {
    readonly activeStep: number;
    readonly trackStep: <T>(promise: Promise<T>) => Promise<T>;
    readonly setActiveStep: (step: number) => void;
    readonly reset: () => void;
} => {
    const [activeStep, setActiveStep] = React.useState(0);
    const mountedRef = React.useRef(true);

    React.useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const trackStep = React.useCallback(
        <T>(promise: Promise<T>): Promise<T> =>
            promise.then((result) => {
                if (mountedRef.current) {
                    setActiveStep((step) => step + 1);
                }
                return result;
            }),
        [],
    );

    const reset = React.useCallback(() => {
        setActiveStep(0);
    }, []);

    return { activeStep, trackStep, setActiveStep, reset };
};
