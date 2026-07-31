import { getProcessStyle } from './processColors';

describe('getProcessStyle', () => {
    it('returns the rainbow gradient for C-41', () => {
        const style = getProcessStyle('C-41');
        expect(style.gradient).toContain('linear-gradient');
        expect(style.fg).toBe('#ffffff');
    });

    it('returns a dark-on-light style for ECN-2', () => {
        const style = getProcessStyle('ECN-2');
        expect(style.color).toBe('#F9A825');
        expect(style.fg).toBe('#1a1a1a');
    });

    it('returns a style for B&W Print', () => {
        const style = getProcessStyle('B&W Print');
        expect(style.color).toBeTruthy();
        expect(style.gradient).toBe('none');
    });

    it('returns a distinct style per process', () => {
        const processes: ('C-41' | 'E-6' | 'B&W' | 'ECN-2' | 'RA4' | 'B&W Print')[] = [
            'C-41',
            'E-6',
            'B&W',
            'ECN-2',
            'RA4',
            'B&W Print',
        ];
        const colors = new Set(processes.map((p) => getProcessStyle(p).color));
        expect(colors.size).toBe(processes.length);
    });
});
