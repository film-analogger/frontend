import {
    effectiveSeconds,
    formatSeconds,
    formatStopOffset,
    printTotalSeconds,
} from './exposureMath';

describe('effectiveSeconds', () => {
    it('returns the base time when there is no offset', () => {
        expect(effectiveSeconds(12)).toBe(12);
    });

    it('doubles the base time for a full stop', () => {
        expect(effectiveSeconds(12, 1, 1)).toBeCloseTo(24, 5);
    });

    it('halves the base time for a negative full stop', () => {
        expect(effectiveSeconds(12, -1, 1)).toBeCloseTo(6, 5);
    });

    it('computes a third-stop offset', () => {
        expect(effectiveSeconds(32, 1, 3)).toBeCloseTo(40.3, 1);
    });
});

describe('formatStopOffset', () => {
    it('returns "0" for no offset', () => {
        expect(formatStopOffset(0, 1, 'fraction')).toBe('0');
    });

    it('formats a positive fraction', () => {
        expect(formatStopOffset(1, 3, 'fraction')).toBe('+1/3');
    });

    it('formats a negative whole stop without a denominator', () => {
        expect(formatStopOffset(-2, 1, 'fraction')).toBe('−2');
    });

    it('formats decimals when notation is decimal', () => {
        expect(formatStopOffset(1, 3, 'decimal')).toBe('+0.33');
    });
});

describe('formatSeconds', () => {
    it('formats with one decimal by default', () => {
        expect(formatSeconds(15.14)).toBe('15.1');
    });

    it('accepts a custom decimal count', () => {
        expect(formatSeconds(15.14159, 3)).toBe('15.142');
    });
});

describe('printTotalSeconds', () => {
    it('sums the base and burn exposures', () => {
        expect(
            printTotalSeconds([
                { kind: 'base', effectiveSeconds: 20 },
                { kind: 'burn', effectiveSeconds: 5 },
            ]),
        ).toBe(25);
    });

    it('excludes dodge exposures, which withhold light rather than add time', () => {
        expect(
            printTotalSeconds([
                { kind: 'base', effectiveSeconds: 20 },
                { kind: 'dodge', effectiveSeconds: 8 },
            ]),
        ).toBe(20);
    });

    it('treats missing effective seconds as zero', () => {
        expect(printTotalSeconds([{ kind: 'base' }])).toBe(0);
    });
});
