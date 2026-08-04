import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LayersIcon from '@mui/icons-material/Layers';
import { Box, Card, CardContent, Chip, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { type FilmRead } from '~/api/client';
import { FilmName } from '../FilmName/FilmName';
import { IsoChip } from '../IsoChip/IsoChip';
import { ProcessChip } from '../ProcessChip/ProcessChip';

export const FilmCard: React.FunctionComponent<{
    readonly film: Pick<
        FilmRead,
        | 'id'
        | 'name'
        | 'inversible'
        | 'description'
        | 'emulsionType'
        | 'manufacturer'
        | 'primaryColor'
        | 'secondaryColor'
        | 'tertiaryColor'
        | 'process'
        | 'sensibility'
    >;
}> = ({ film }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const detailsLinkColor = theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light';

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '14px',
                borderRadius: '15px',
                transition:
                    'transform 180ms cubic-bezier(.2,.7,.3,1), box-shadow 180ms ease, border-color 180ms ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: (t2) => t2.shadows[4],
                    transform: 'translateY(-3px)',
                },
            }}
            variant="outlined"
        >
            <CardContent
                sx={{
                    height: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '11px',
                    padding: 0,
                }}
            >
                <FilmName film={film} />
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '6px',
                        justifyContent: 'flex-end',
                    }}
                >
                    <ProcessChip film={film} />
                    <IsoChip film={film} />
                    {film.inversible ? (
                        <Chip
                            color="secondary"
                            label={t('components.filmCard.slide')}
                            size="small"
                            variant="outlined"
                        />
                    ) : null}
                </Stack>
                {film.description ? (
                    <Tooltip
                        slotProps={{ tooltip: { sx: { fontSize: '0.85rem' } } }}
                        title={film.description}
                    >
                        <Typography
                            color="text.secondary"
                            sx={{
                                display: '-webkit-box',
                                fontSize: '12.8px',
                                lineHeight: 1.45,
                                opacity: 0.92,
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                            }}
                            variant="body2"
                        >
                            {film.description}
                        </Typography>
                    </Tooltip>
                ) : null}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        color: 'text.secondary',
                        fontSize: '11.5px',
                        gap: '10px',
                        marginTop: 'auto',
                        paddingTop: '10px',
                    }}
                >
                    <LayersIcon sx={{ fontSize: '15px' }} />
                    <Typography
                        component="span"
                        sx={{ fontSize: 'inherit' }}
                    >
                        {film.emulsionType}
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <Typography
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: detailsLinkColor,
                            display: 'flex',
                            fontSize: 'inherit',
                            fontWeight: 600,
                        }}
                    >
                        {t('components.filmCard.details')}
                        <ChevronRightIcon sx={{ fontSize: '16px' }} />
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};
