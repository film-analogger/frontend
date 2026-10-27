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
    const tertiaryColor = film.tertiaryColor ?? film.manufacturer.tertiaryColor;

    return (
        <Box sx={sx}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        paddingX: '13px',
                        paddingY: '9px',
                        backgroundColor: film.manufacturer.primaryColor,
                        color: film.manufacturer.secondaryColor,
                    }}
                    variant="subtitle1"
                >
                    {film.manufacturer.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                    <Typography
                        component="div"
                        sx={{
                            flex: 1,
                            fontWeight: 'bold',
                            paddingX: '13px',
                            paddingY: '9px',
                            backgroundColor: film.primaryColor,
                            color: film.secondaryColor,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        variant="subtitle1"
                    >
                        {film.name}
                    </Typography>
                    {tertiaryColor ? (
                        <Box
                            data-testid="film-name-tertiary-strip"
                            sx={{
                                flex: '0 0 12px',
                                backgroundColor: tertiaryColor,
                            }}
                        />
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};
