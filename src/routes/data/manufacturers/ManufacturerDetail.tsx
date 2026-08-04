import CameraRollIcon from '@mui/icons-material/CameraRoll';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ScienceIcon from '@mui/icons-material/Science';
import { Box, CircularProgress, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router';
import {
    useChemistryApi,
    useFilmApi,
    useManufacturerApi,
    type ChemistryRead,
    type FilmRead,
    type ManufacturerRead,
} from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { FilmName } from '~/components/Widgets/FilmName/FilmName';
import { IsoChip } from '~/components/Widgets/IsoChip/IsoChip';
import { ProcessChip } from '~/components/Widgets/ProcessChip/ProcessChip';
import { getProcessStyle } from '~/domain/processColors';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'manufacturers.list.title', title: 'manufacturers.detail.title' },
};

const swatchSx = { width: 34, height: 34, borderRadius: '8px' };

const ManufacturerDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { manufacturerId } = useParams<{ manufacturerId: string }>();

    const { manufacturerApi } = useManufacturerApi();
    const { filmApi } = useFilmApi();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [manufacturer, setManufacturer] = React.useState<ManufacturerRead | null>(null);
    const [films, setFilms] = React.useState<FilmRead[]>([]);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);

    React.useEffect(() => {
        if (!manufacturerId) {
            return;
        }
        Promise.all([
            manufacturerApi.apiManufacturersIdGet({ id: manufacturerId }),
            filmApi.apiFilmsGetCollection(),
            chemistryApi.apiChemistriesGetCollection(),
        ])
            .then(([manufRes, filmRes, chemRes]) => {
                setManufacturer(manufRes.data);
                setFilms(filmRes.data['hydra:member']);
                setChemistries(chemRes.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching manufacturer:', err);
                setError(err);
            });
    }, [manufacturerId, manufacturerApi, filmApi, chemistryApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !manufacturer) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    const manufFilms = films.filter((film) => film.manufacturer.id === manufacturer.id);
    // Chemistries don't expose the manufacturer id in this API response shape, only its name.
    const manufChemistries = chemistries.filter(
        (chemistry) => chemistry.manufacturer.name === manufacturer.name,
    );
    const hasSwatches = Boolean(
        manufacturer.primaryColor ?? manufacturer.secondaryColor ?? manufacturer.tertiaryColor,
    );

    return (
        <Box>
            <Box
                sx={{
                    mb: '18px',
                    overflow: 'hidden',
                    borderRadius: '18px',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '18px',
                        p: '24px 26px',
                        backgroundColor: manufacturer.primaryColor ?? 'primary.main',
                        color: manufacturer.secondaryColor ?? 'primary.contrastText',
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{ flex: 1, fontSize: '34px', fontWeight: 700 }}
                    >
                        {manufacturer.name}
                    </Typography>
                    {hasSwatches ? (
                        <Box sx={{ display: 'flex', gap: '6px' }}>
                            {manufacturer.primaryColor ? (
                                <Box
                                    sx={{ ...swatchSx, backgroundColor: manufacturer.primaryColor }}
                                />
                            ) : null}
                            {manufacturer.secondaryColor ? (
                                <Box
                                    sx={{
                                        ...swatchSx,
                                        backgroundColor: manufacturer.secondaryColor,
                                    }}
                                />
                            ) : null}
                            {manufacturer.tertiaryColor ? (
                                <Box
                                    sx={{
                                        ...swatchSx,
                                        backgroundColor: manufacturer.tertiaryColor,
                                    }}
                                />
                            ) : null}
                        </Box>
                    ) : null}
                    {manufacturer.website ? (
                        <Link
                            color="inherit"
                            href={
                                manufacturer.website.startsWith('http')
                                    ? manufacturer.website
                                    : `https://${manufacturer.website}`
                            }
                            rel="noopener noreferrer"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontWeight: 700,
                            }}
                            target="_blank"
                        >
                            {manufacturer.website}
                            <OpenInNewIcon
                                aria-hidden
                                fontSize="inherit"
                            />
                        </Link>
                    ) : null}
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
                }}
            >
                <Box
                    sx={{
                        p: '18px',
                        borderRadius: '15px',
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: 'center', mb: 1.5 }}
                    >
                        <CameraRollIcon color="primary" />
                        <Typography variant="subtitle2">
                            {t('manufacturers.detail.films', { count: manufFilms.length })}
                        </Typography>
                    </Stack>
                    {manufFilms.length === 0 ? (
                        <Typography color="text.secondary">
                            {t('manufacturers.detail.noFilms')}
                        </Typography>
                    ) : (
                        <Box
                            sx={{
                                display: 'grid',
                                gap: '12px',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                            }}
                        >
                            {manufFilms.map((film) => (
                                <Box
                                    component={RouterLink}
                                    key={film['@id']}
                                    sx={{
                                        p: '11px',
                                        borderRadius: '12px',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        backgroundColor: 'background.default',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        display: 'block',
                                        '&:hover': { borderColor: 'primary.main' },
                                    }}
                                    to={`/data/films/${film.id ?? ''}`}
                                >
                                    <FilmName
                                        film={film}
                                        sx={{ mb: 1 }}
                                    />
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                    >
                                        <ProcessChip film={film} />
                                        <IsoChip film={film} />
                                    </Stack>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        p: '18px',
                        borderRadius: '15px',
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: 'center', mb: 1.5 }}
                    >
                        <ScienceIcon color="secondary" />
                        <Typography variant="subtitle2">
                            {t('manufacturers.detail.chemistries', {
                                count: manufChemistries.length,
                            })}
                        </Typography>
                    </Stack>
                    {manufChemistries.length === 0 ? (
                        <Typography color="text.secondary">
                            {t('manufacturers.detail.noChemistries')}
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {manufChemistries.map((chemistry) => {
                                const style = getProcessStyle(chemistry.process);
                                // The API doesn't expose a single "official label" for a chemistry
                                // as a whole, only per-dilution `official` flags. We surface the
                                // official dilution's label as a badge when one exists, and fall
                                // back to the existing ProcessChip otherwise.
                                const officialDilution = (chemistry.dilutions ?? []).find(
                                    (dilution) => dilution.official,
                                );
                                return (
                                    <Box
                                        component={RouterLink}
                                        key={chemistry['@id']}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '11px',
                                            p: '10px 11px',
                                            borderRadius: '11px',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'background.default',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            '&:hover': { borderColor: 'primary.main' },
                                        }}
                                        to={`/data/chemistries/${chemistry.id ?? ''}`}
                                    >
                                        <Box
                                            sx={{
                                                width: '4px',
                                                alignSelf: 'stretch',
                                                borderRadius: '3px',
                                                backgroundColor: style.color,
                                            }}
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {chemistry.name}
                                            </Typography>
                                            <Typography
                                                sx={{ color: 'text.secondary' }}
                                                variant="caption"
                                            >
                                                {chemistry.chemistryType.typeLabel}
                                            </Typography>
                                        </Box>
                                        {officialDilution ? (
                                            <Box
                                                sx={{
                                                    borderRadius: '7px',
                                                    p: '3px 8px',
                                                    fontFamily: 'monospace',
                                                    backgroundColor: 'primary.main',
                                                    color: 'primary.contrastText',
                                                }}
                                            >
                                                {officialDilution.label}
                                            </Box>
                                        ) : (
                                            <ProcessChip film={chemistry} />
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ManufacturerDetail;
