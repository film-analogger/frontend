import { type Theme, type SxProps, Box, Typography } from '@mui/material';
import React from 'react';

export const FilmName: React.FunctionComponent<{
    readonly film: {
        name: string;
        primaryColor?: string | null;
        secondaryColor?: string | null;
        tertiaryColor?: string | null;
        manufacturer: {
            name: string;
            primaryColor?: string | null;
            secondaryColor?: string | null;
            tertiaryColor?: string | null;
        };
    };
    readonly sx?: SxProps<Theme>;
}> = ({ film, sx = {} }) => {
    return (
        <Box sx={sx}>
            <Typography
                component="div"
                fontWeight="bold"
                sx={{
                    paddingLeft: '15px',
                    borderRadius: '10px 10px 0 0',
                    backgroundColor: film.manufacturer.primaryColor,
                    color: film.manufacturer.secondaryColor,
                    border: film.manufacturer.tertiaryColor
                        ? `2px solid ${film.manufacturer.tertiaryColor}`
                        : undefined,
                    borderBottom: 'none',
                }}
                variant="subtitle1"
            >
                {film.manufacturer.name}
            </Typography>
            <Typography
                component="div"
                fontWeight="bold"
                sx={{
                    paddingLeft: '15px',
                    borderRadius: '0 0 10px 10px',
                    backgroundColor: film.primaryColor,
                    color: film.secondaryColor,
                    border: film.tertiaryColor
                        ? `2px solid ${film.tertiaryColor}`
                        : film.manufacturer.tertiaryColor
                          ? `2px solid ${film.manufacturer.tertiaryColor}`
                          : undefined,
                    borderTop: 'none',
                }}
                variant="subtitle1"
            >
                {film.name}
            </Typography>
        </Box>
    );
};
