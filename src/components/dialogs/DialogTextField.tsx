import { TextField, type TextFieldProps } from '@mui/material';
import React from 'react';

type Sx = NonNullable<TextFieldProps['sx']>;

const dialogTextFieldSx: Sx = {
    '& .MuiInputLabel-root': {
        position: 'static',
        transform: 'none',
        maxWidth: 'none',
        marginBottom: '6px',
        fontSize: '11.5px',
        fontWeight: 600,
        color: 'text.secondary',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'text.secondary',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '11px',
        backgroundColor: 'background.default',
        padding: 0,
        height: 'auto',
    },
    '& .MuiOutlinedInput-input, & .MuiSelect-select': {
        padding: '11px 13px',
        fontSize: '13.5px',
    },
};

// Matches the "Modales ajout" mockup's field style: a small-caps caption
// sitting above a bordered, filled box, rather than MUI's default label
// that floats and shrinks into the outline notch.
export const DialogTextField: React.FunctionComponent<TextFieldProps> = ({
    slotProps,
    sx,
    ...props
}) => (
    <TextField
        fullWidth
        slotProps={{
            ...slotProps,
            inputLabel: { shrink: true, ...slotProps?.inputLabel },
        }}
        sx={sx === undefined ? dialogTextFieldSx : ([dialogTextFieldSx, sx] as Sx)}
        variant="outlined"
        {...props}
    />
);
