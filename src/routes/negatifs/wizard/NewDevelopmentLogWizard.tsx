import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
    useCameraApi,
    useChemistryApi,
    useDevelopmentLogApi,
    useFilmApi,
    useTagApi,
    type CameraRead,
    type ChemistryRead,
    type FilmRead,
    type TagRead,
} from '~/api/client';
import type { DevelopmentLogWriteDevelopmentLog } from '~/api/filmAnaloggerApi';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { NegativeContextStep } from './NegativeContextStep';
import { DevelopmentStepsStep } from './DevelopmentStepsStep';
import { FinishStep } from './FinishStep';
import { ReviewStep } from './ReviewStep';
import { createInitialState, type WizardState } from './types';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'negatifs.list.title', title: 'negatifs.wizard.title' },
};

const stepKeys = ['context', 'steps', 'finish', 'review'] as const;

const NewDevelopmentLogWizard: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { developmentLogApi } = useDevelopmentLogApi();
    const { filmApi } = useFilmApi();
    const { cameraApi } = useCameraApi();
    const { chemistryApi } = useChemistryApi();
    const { tagApi } = useTagApi();

    const [state, setState] = React.useState<WizardState>(createInitialState);
    const [films, setFilms] = React.useState<FilmRead[]>([]);
    const [cameras, setCameras] = React.useState<CameraRead[]>([]);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);
    const [tags, setTags] = React.useState<TagRead[]>([]);
    const [catalogsLoaded, setCatalogsLoaded] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<unknown>(null);

    React.useEffect(() => {
        Promise.all([
            filmApi.apiFilmsGetCollection(),
            cameraApi.apiCamerasGetCollection(),
            chemistryApi.apiChemistriesGetCollection(),
            tagApi.apiTagsGetCollection(),
        ])
            .then(([filmsRes, camerasRes, chemistriesRes, tagsRes]) => {
                setFilms(filmsRes.data['hydra:member']);
                setCameras(camerasRes.data['hydra:member']);
                setChemistries(chemistriesRes.data['hydra:member']);
                setTags(tagsRes.data['hydra:member']);
                setCatalogsLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching negative catalogs:', err);
            });
    }, [filmApi, cameraApi, chemistryApi, tagApi]);

    const patch = (p: Partial<WizardState>) => {
        setState((s) => ({ ...s, ...p }));
    };

    const canGoNext = () => {
        if (state.step === 0) {
            return (
                state.filmId !== '' &&
                state.shotYear !== '' &&
                state.isoShotAt !== '' &&
                state.process !== '' &&
                state.developedAt !== ''
            );
        }
        if (state.step === 1) {
            return state.steps.every(
                (step) => step.temperature !== '' && step.durationSeconds !== '',
            );
        }
        return true;
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            const film = films.find((f) => f.id === state.filmId);
            const camera = cameras.find((c) => c.id === state.cameraId);
            const payload: DevelopmentLogWriteDevelopmentLog = {
                film: film?.['@id'] ?? '',
                camera: camera?.['@id'] || undefined,
                shotAt: {
                    year: Number(state.shotYear),
                    month: state.shotMonth ? Number(state.shotMonth) : undefined,
                    day: state.shotDay ? Number(state.shotDay) : undefined,
                },
                isoShotAt: Number(state.isoShotAt),
                shootingNotes: state.shootingNotes || undefined,
                process: state.process || 'B&W',
                developedAt: state.developedAt,
                steps: state.steps.map((step) => {
                    const chemistry = chemistries.find((c) => c.id === step.chemistryId);
                    return {
                        chemistry: chemistry?.['@id'] || undefined,
                        chemistryParts: step.chemistryParts
                            ? Number(step.chemistryParts)
                            : undefined,
                        waterParts: step.waterParts ? Number(step.waterParts) : undefined,
                        temperature: Number(step.temperature) || 0,
                        durationSeconds: Number(step.durationSeconds) || 0,
                        agitationNote: step.agitationNote || undefined,
                    };
                }),
                developmentNotes: state.developmentNotes || undefined,
                rating: state.rating || undefined,
                tags: state.tagIds
                    .map((id) => tags.find((tag) => tag.id === id)?.['@id'])
                    .filter((iri): iri is string => Boolean(iri)),
                binderId: state.binderId || undefined,
                contactSheetNumber: state.contactSheetNumber
                    ? Number(state.contactSheetNumber)
                    : undefined,
            };
            const res = await developmentLogApi.apiDevelopmentLogsPost({
                developmentLogWriteDevelopmentLog: payload,
            });
            await navigate(`/negatifs/${res.data.id ?? ''}`);
        } catch (err) {
            console.error('Error creating development log:', err);
            setSubmitError(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box>
            <Typography
                sx={{ mb: 0.5 }}
                variant="h1"
            >
                {t('negatifs.wizard.title')}
            </Typography>
            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                {t('negatifs.wizard.subtitle')}
            </Typography>

            <Stepper
                activeStep={state.step}
                sx={{ mb: 3 }}
            >
                {stepKeys.map((key) => (
                    <Step key={key}>
                        <StepLabel>{t(`negatifs.wizard.steps.${key}`)}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Paper
                sx={{ p: 3 }}
                variant="outlined"
            >
                {!catalogsLoaded ? (
                    <CircularProgress
                        aria-label={t('app.loading')}
                        enableTrackSlot
                        size="2.5rem"
                    />
                ) : (
                    <React.Fragment>
                        {state.step === 0 ? (
                            <NegativeContextStep
                                cameras={cameras}
                                films={films}
                                onChange={patch}
                                state={state}
                            />
                        ) : null}
                        {state.step === 1 ? (
                            <DevelopmentStepsStep
                                chemistries={chemistries}
                                onChange={(steps) => {
                                    patch({ steps });
                                }}
                                steps={state.steps}
                            />
                        ) : null}
                        {state.step === 2 ? (
                            <FinishStep
                                onChange={patch}
                                state={state}
                                tags={tags}
                            />
                        ) : null}
                        {state.step === 3 ? (
                            <ReviewStep
                                cameras={cameras}
                                films={films}
                                onChange={patch}
                                state={state}
                            />
                        ) : null}
                    </React.Fragment>
                )}

                {submitError ? (
                    <Typography
                        color="error"
                        sx={{ mt: 2 }}
                    >
                        {t('errors.api.loadingData')}
                    </Typography>
                ) : null}

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mt: 3,
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Button
                        disabled={state.step === 0 || submitting}
                        onClick={() => {
                            patch({ step: Math.max(0, state.step - 1) });
                        }}
                        variant="outlined"
                    >
                        {t('negatifs.wizard.back')}
                    </Button>
                    <Box sx={{ flex: 1 }} />
                    {state.step < stepKeys.length - 1 ? (
                        <Button
                            disabled={!canGoNext()}
                            onClick={() => {
                                patch({ step: Math.min(stepKeys.length - 1, state.step + 1) });
                            }}
                            variant="contained"
                        >
                            {t('negatifs.wizard.next')}
                        </Button>
                    ) : (
                        <Button
                            disabled={submitting}
                            onClick={() => {
                                void handleSubmit();
                            }}
                            variant="contained"
                        >
                            {submitting
                                ? t('negatifs.wizard.submitting')
                                : t('negatifs.wizard.submit')}
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default NewDevelopmentLogWizard;
