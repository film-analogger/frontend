import type { DevelopmentLogRead } from '~/api/client';

export const developmentLogArchiveRef = (
    log: Pick<DevelopmentLogRead, 'binderId' | 'contactSheetNumber'>,
): string | null =>
    log.binderId && log.contactSheetNumber != null
        ? `#${log.binderId}-${String(log.contactSheetNumber).padStart(4, '0')}`
        : null;

export const formatStepsDuration = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes)}′${String(seconds).padStart(2, '0')}`;
};

export const totalStepsSeconds = (
    steps: readonly { durationSeconds: number }[] | undefined,
): number => (steps ?? []).reduce((sum, step) => sum + step.durationSeconds, 0);

export const formatPushPullStops = (stops?: number): string | null => {
    if (!stops) {
        return null;
    }
    const sign = stops > 0 ? '+' : '';
    return `N${sign}${String(stops).replace('.', ',')}`;
};

export const formatDilution = (
    chemistryParts?: number | null,
    waterParts?: number | null,
): string | null =>
    chemistryParts != null && waterParts != null
        ? `${String(chemistryParts)}+${String(waterParts)}`
        : null;
