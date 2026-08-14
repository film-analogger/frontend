import LinkIcon from '@mui/icons-material/Link';
import { InputAdornment, type TextFieldProps } from '@mui/material';
import React from 'react';
import { DialogTextField } from './DialogTextField';

type Sx = NonNullable<TextFieldProps['sx']>;

const dialogLinkFieldSx: Sx = {
    '& .MuiOutlinedInput-input': {
        color: 'primary.light',
        textOverflow: 'ellipsis',
    },
};

// Same bordered box as DialogTextField, with a link icon and the mockup's
// tinted text used for URL-shaped fields (documentation links, websites…).
export const DialogLinkField: React.FunctionComponent<TextFieldProps> = ({
    slotProps,
    sx,
    ...props
}) => (
    <DialogTextField
        slotProps={{
            ...slotProps,
            input: {
                startAdornment: (
                    <InputAdornment position="start">
                        <LinkIcon fontSize="small" />
                    </InputAdornment>
                ),
                ...slotProps?.input,
            },
        }}
        sx={sx === undefined ? dialogLinkFieldSx : ([dialogLinkFieldSx, sx] as Sx)}
        {...props}
    />
);
