import { Stack } from '@mui/material';
import { IsoChip } from '@film-analogger/frontend';

export const Spectrum = () => (
    <Stack
        direction="row"
        spacing={1}
    >
        <IsoChip film={{ sensibility: 25 }} />
        <IsoChip film={{ sensibility: 100 }} />
        <IsoChip film={{ sensibility: 400 }} />
        <IsoChip film={{ sensibility: 800 }} />
        <IsoChip film={{ sensibility: 1600 }} />
        <IsoChip film={{ sensibility: 6400 }} />
    </Stack>
);

export const Standard400 = () => <IsoChip film={{ sensibility: 400 }} />;
