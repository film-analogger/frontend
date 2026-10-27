import type { SxProps, Theme } from '@mui/material/styles';

export const pillSwitchContainerSx: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    padding: '3px',
    borderRadius: '11px',
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};

export const pillSwitchItemSx = (active: boolean): SxProps<Theme> => ({
    width: 30,
    height: 28,
    borderRadius: '8px',
    border: 'none',
    color: active ? 'primary.contrastText' : 'text.secondary',
    backgroundColor: active ? 'primary.main' : 'transparent',
    '&:hover': {
        border: 'none',
        backgroundColor: active ? 'primary.dark' : 'action.hover',
    },
});
