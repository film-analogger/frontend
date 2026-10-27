import { Box, MenuItem, Select } from '@mui/material';
import { IconComponent } from '@film-analogger/frontend';

// Its real job: the dropdown arrow MUI Select renders via the
// `IconComponent` prop (see the component's displayName, "SelectIcon").
export const InSelect = () => (
    <Select
        IconComponent={IconComponent}
        defaultValue="c41"
        size="small"
    >
        <MenuItem value="c41">C-41</MenuItem>
        <MenuItem value="e6">E-6</MenuItem>
        <MenuItem value="bw">B&amp;W</MenuItem>
    </Select>
);

export const Standalone = () => (
    <Box sx={{ color: 'text.primary', fontSize: '2rem', lineHeight: 0 }}>
        <IconComponent />
    </Box>
);
