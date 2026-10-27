import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import React from 'react';

export const InlineAddButton: React.FunctionComponent<{
    readonly ariaLabel: string;
    readonly onClick: () => void;
}> = ({ ariaLabel, onClick }) => (
    <IconButton
        aria-label={ariaLabel}
        onClick={onClick}
        sx={{
            flex: '0 0 auto',
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: '11px',
        }}
    >
        <AddIcon fontSize="small" />
    </IconButton>
);
