import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Chip, CircularProgress, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router';
import { useChemistryApi, useFilmApi, type ChemistryRead, type FilmRead } from '~/api/client';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { IsoChip } from '~/components/Widgets/IsoChip/IsoChip';
import { ProcessChip } from '~/components/Widgets/ProcessChip/ProcessChip';
import { getProcessStyle } from '~/domain/processColors';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'films.list.title', title: 'films.detail.title' },
};

const FilmDetail: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const { filmId } = useParams<{ filmId: string }>();
    const theme = useTheme();

    const { filmApi } = useFilmApi();
    const { chemistryApi } = useChemistryApi();

    const [error, setError] = React.useState<unknown>(null);
    const [loaded, setLoaded] = React.useState(false);
    const [film, setFilm] = React.useState<FilmRead | null>(null);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);

    React.useEffect(() => {
        if (!filmId) {
            return;
        }
        Promise.all([
            filmApi.apiFilmsIdGet({ id: filmId }),
            chemistryApi.apiChemistriesGetCollection(),
        ])
            .then(([filmRes, chemRes]) => {
                setFilm(filmRes.data);
                setChemistries(chemRes.data['hydra:member']);
                setLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching film:', err);
                setError(err);
            });
    }, [filmId, filmApi, chemistryApi]);

    if (error) {
        return <Typography color="error">{t('errors.api.loadingData')}</Typography>;
    }
    if (!loaded || !film) {
        return (
            <CircularProgress
                aria-label={t('app.loading')}
                enableTrackSlot
                size="3rem"
            />
        );
    }

    // The primaryStrong pattern from SideMenu.tsx: use a stronger primary shade
    // depending on the active color scheme so links stay legible on the paper background.
    const primaryStrong = theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light';

    const specs: { k: string; v: string }[] = [
        { k: t('films.detail.specs.process'), v: film.process },
        { k: t('films.detail.specs.emulsionType'), v: film.emulsionType ?? '—' },
        {
            k: t('films.detail.specs.sensibility'),
            v: t('components.filmCard.iso', { iso: film.sensibility }),
        },
        {
            k: t('films.detail.specs.inversible'),
            v: film.inversible ? t('films.detail.specs.yes') : t('films.detail.specs.no'),
        },
    ];

    const compatibleChemistries = chemistries
        .filter((chemistry) => chemistry.process === film.process)
        .slice(0, 4);

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
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        gap: '20px',
                        p: '26px 26px 22px',
                        backgroundColor: film.primaryColor ?? 'primary.main',
                        color: film.secondaryColor ?? 'primary.contrastText',
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 200 }}>
                        <Typography
                            component="div"
                            sx={{
                                fontSize: '12.5px',
                                fontWeight: 700,
                                letterSpacing: '1.6px',
                                textTransform: 'uppercase',
                                opacity: 0.85,
                            }}
                        >
                            {film.manufacturer.name}
                        </Typography>
                        <Typography
                            component="h1"
                            sx={{ m: '6px 0 0', fontSize: '38px', fontWeight: 600 }}
                        >
                            {film.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            p: '8px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.14)',
                            backdropFilter: 'blur(6px)',
                        }}
                    >
                        <ProcessChip film={film} />
                        <IsoChip film={film} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '14px',
                        p: '12px 22px',
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Typography sx={{ color: 'text.secondary' }}>
                        {film.emulsionType ?? '—'}
                    </Typography>
                    {film.officialDocumentationUrl ? (
                        <React.Fragment>
                            <Box
                                sx={{ width: '1px', height: '16px', backgroundColor: 'divider' }}
                            />
                            <Link
                                href={film.officialDocumentationUrl}
                                rel="noopener noreferrer"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    color: primaryStrong,
                                    fontWeight: 600,
                                }}
                                target="_blank"
                            >
                                {t('films.detail.officialDoc')}
                                <OpenInNewIcon
                                    aria-hidden
                                    fontSize="inherit"
                                />
                            </Link>
                        </React.Fragment>
                    ) : null}
                    <Box sx={{ flex: 1 }} />
                    <Button
                        component={RouterLink}
                        sx={{ borderRadius: '10px' }}
                        to="/sessions/new"
                        variant="contained"
                    >
                        {t('films.detail.startTracking')}
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1.15fr 1fr' },
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
                    <Typography
                        sx={{ mb: 1.5 }}
                        variant="subtitle2"
                    >
                        {t('films.detail.specsTitle')}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {specs.map((s) => (
                            <Box
                                key={s.k}
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Typography sx={{ color: 'text.secondary' }}>{s.k}</Typography>
                                <Typography sx={{ fontWeight: 600 }}>{s.v}</Typography>
                            </Box>
                        ))}
                    </Box>
                    {film.description ? (
                        <Typography
                            sx={{ mt: 2, color: 'text.secondary' }}
                            variant="body2"
                        >
                            {film.description}
                        </Typography>
                    ) : null}
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
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle2">
                            {t('films.detail.compatibleChemistries')}
                        </Typography>
                        <Typography
                            sx={{ color: 'text.secondary' }}
                            variant="caption"
                        >
                            {t('films.detail.compatibleChemistriesHint', { process: film.process })}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{ mt: 0.5, mb: 1.5, color: 'text.secondary' }}
                        variant="body2"
                    >
                        {t('films.detail.dilutionsHint')}
                    </Typography>
                    {compatibleChemistries.length === 0 ? (
                        <Typography color="text.secondary">
                            {t('films.detail.noCompatibleChemistries')}
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {compatibleChemistries.map((chemistry) => {
                                const style = getProcessStyle(chemistry.process);
                                return (
                                    <Box
                                        component={RouterLink}
                                        key={chemistry['@id']}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            p: '11px 12px',
                                            borderRadius: '11px',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            backgroundColor: 'background.default',
                                            color: 'inherit',
                                            textDecoration: 'none',
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
                                                {chemistry.manufacturer.name} ·{' '}
                                                {chemistry.chemistryType.typeLabel}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {(chemistry.dilutions ?? []).map((dilution) => (
                                                <Chip
                                                    color={
                                                        dilution.official ? 'primary' : 'default'
                                                    }
                                                    key={`${String(dilution.chemistryParts)}-${String(dilution.waterParts)}-${dilution.label ?? ''}`}
                                                    label={dilution.label}
                                                    size="small"
                                                    sx={{ fontFamily: 'monospace' }}
                                                    variant={
                                                        dilution.official ? 'filled' : 'outlined'
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                );
                            })}
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
                    <Typography
                        sx={{ mb: 1.5 }}
                        variant="subtitle2"
                    >
                        {t('films.detail.notebook.title')}
                    </Typography>
                    {/*
                        No API endpoint links print/negative history back to a given film
                        (PrintSession/Print/Exposure carry no film reference), so we show a
                        clean empty state instead of inventing figures.
                    */}
                    <Typography color="text.secondary">
                        {t('films.detail.notebook.empty')}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FilmDetail;
