import { Button, Stack, Link as MuiLink } from '@mui/material';
import { LinkBehavior } from '@film-analogger/frontend';

// Bridges MUI's `component` prop to react-router's <Link>, so it's normally
// composed inside a MUI component rather than rendered bare.
export const AsMuiLink = () => (
    <MuiLink
        component={LinkBehavior}
        href="/data/films"
    >
        Browse films
    </MuiLink>
);

export const AsMuiButton = () => (
    <Stack
        direction="row"
        spacing={2}
    >
        <Button
            component={LinkBehavior}
            href="/settings"
            variant="contained"
        >
            Settings
        </Button>
        <Button
            component={LinkBehavior}
            href="/profile"
            variant="outlined"
        >
            Profile
        </Button>
    </Stack>
);
