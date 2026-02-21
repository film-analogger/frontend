import { sum } from './sum';

describe('sum', () => {
    it('should return the sum of all numbers', () => {
        expect(sum(1, 2, 3)).toBe(6);
        expect(sum(4, 5)).toBe(9);
        expect(sum()).toBe(0);
    });
});
