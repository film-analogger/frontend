import { Box, Link, Typography } from '@mui/material';
import type React from 'react';

export const ProfileInfoRow: React.FunctionComponent<{
    readonly label: string;
    readonly value: string;
    readonly href?: string;
}> = ({ label, value, href }) => (
    <Box>
        <Typography
            color="text.secondary"
            variant="caption"
        >
            {label}
        </Typography>
        <Typography variant="body1">
            {href ? (
                <Link
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {value}
                </Link>
            ) : (
                value
            )}
        </Typography>
    </Box>
);
