import { Card, CardContent, Chip, Stack, Tooltip, Typography } from '@mui/material';
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
        | 'manufacturer'
        | 'primaryColor'
        | 'secondaryColor'
        | 'tertiaryColor'
        | 'process'
        | 'sensibility'
    >;
}> = ({ film }) => {
    const { t } = useTranslation();

    return (
        <Card
            sx={{ height: '200px' }}
            variant="outlined"
        >
            <CardContent
                sx={{
                    height: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <FilmName film={film} />
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    mb={0.5}
                    sx={{ marginTop: '5px' }}
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
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                            }}
                            variant="body2"
                        >
                            {film.description}
                        </Typography>
                    </Tooltip>
                ) : null}
            </CardContent>
        </Card>
    );
};
