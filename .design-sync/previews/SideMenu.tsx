import { Box } from '@mui/material';
import { SideMenu } from '@film-analogger/frontend';

// The Drawer is `display: none` below MUI's `md` breakpoint (900px) — see
// the cardMode/viewport override in ../config.json that renders this card
// wide enough for the permanent drawer to actually show. It also renders via
// `position: fixed`, which escapes to the viewport instead of the card —
// `contain: layout` gives it a containing block so it's captured in place.
export const Default = () => (
    <Box sx={{ contain: 'layout', minHeight: 700, position: 'relative' }}>
        <SideMenu />
    </Box>
);
