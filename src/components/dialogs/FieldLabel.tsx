import { Typography } from '@mui/material';
import React from 'react';

// The small-caps caption used above every non-TextField field in the
// "Modales ajout" mockup (chips, choice cards, colors, ranges…).
export const FieldLabel: React.FunctionComponent<{ readonly children: React.ReactNode }> = ({
    children,
}) => (
    <Typography
        color="text.secondary"
        sx={{ mb: 0.75, fontSize: '11.5px', fontWeight: 600 }}
    >
        {children}
    </Typography>
);
