import { Stack } from '@mui/material';
import { ProcessChip } from '@film-analogger/frontend';

export const AllProcesses = () => (
    <Stack
        direction="row"
        spacing={1}
    >
        <ProcessChip film={{ process: 'C-41' }} />
        <ProcessChip film={{ process: 'E-6' }} />
        <ProcessChip film={{ process: 'B&W' }} />
        <ProcessChip film={{ process: 'ECN-2' }} />
        <ProcessChip film={{ process: 'RA4' }} />
    </Stack>
);
