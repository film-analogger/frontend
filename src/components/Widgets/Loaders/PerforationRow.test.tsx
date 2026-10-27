import { alpha } from '@mui/material';
import { render } from '@testing-library/react';
import { PerforationRow } from './PerforationRow';

vi.mock('@mui/material/styles', () => ({
    useColorScheme: vi.fn(),
}));

vi.mock('@mui/material', async (importOriginal) => ({
    ...(await importOriginal()),
    useTheme: vi.fn(),
}));

import { useColorScheme as mockUseColorScheme } from '@mui/material/styles';
import { useTheme as mockUseTheme } from '@mui/material';

const textPrimary = '#1B1917';

const setColorScheme = (colorScheme: string | undefined) => {
    vi.mocked(mockUseColorScheme).mockReturnValue({ colorScheme } as any);
};

describe('PerforationRow', () => {
    beforeEach(() => {
        setColorScheme('light');
        vi.mocked(mockUseTheme).mockReturnValue({
            palette: { text: { primary: textPrimary } },
        });
    });

    it('renders one perforation per frame of the strip', () => {
        const { container } = render(<PerforationRow />);
        const stack = container.firstChild?.firstChild as HTMLElement;
        expect(stack.children).toHaveLength(26);
    });

    it.each([
        ['light', 0.3],
        ['dark', 0.3],
        ['lab', 0.7],
    ])('uses %s alpha on the text color for the %s scheme', (colorScheme, factor) => {
        setColorScheme(colorScheme);
        const { container } = render(<PerforationRow />);
        const stack = container.firstChild?.firstChild as HTMLElement;
        const perforation = stack.children[0] as HTMLElement;
        expect(perforation).toHaveStyle({
            backgroundColor: alpha(textPrimary, factor),
        });
    });
});
