export type StopNotation = 'fraction' | 'decimal';

/**
 * f-stop printing: base time adjusted by a fraction of a stop.
 * effectiveSeconds = baseSeconds * 2^(numerator/denominator)
 */
export const effectiveSeconds = (
    baseSeconds: number,
    stopOffsetNumerator = 0,
    stopOffsetDenominator = 1,
): number => baseSeconds * Math.pow(2, stopOffsetNumerator / stopOffsetDenominator);

export const formatStopOffset = (
    numerator: number,
    denominator: number,
    notation: StopNotation,
): string => {
    if (numerator === 0) {
        return '0';
    }
    const sign = numerator > 0 ? '+' : '−';
    const abs = Math.abs(numerator);
    if (notation === 'fraction') {
        return sign + (denominator === 1 ? String(abs) : `${String(abs)}/${String(denominator)}`);
    }
    return sign + (abs / denominator).toFixed(2);
};

export const formatSeconds = (seconds: number, decimals = 1): string => seconds.toFixed(decimals);
