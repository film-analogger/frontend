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
    useChemistryApi,
    useEnlargerApi,
    usePhotoPaperApi,
    usePrintApi,
    usePrintSessionApi,
    type ChemistryRead,
    type EnlargerRead,
    type PhotoPaperRead,
} from '~/api/client';
import type { PrintSessionWritePrintSession, PrintWritePrint } from '~/api/filmAnaloggerApi';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import { SessionContextStep } from './SessionContextStep';
import { ChemicalChainStep } from './ChemicalChainStep';
import { PrintsStep } from './PrintsStep';
import { ReviewStep } from './ReviewStep';
import { createInitialState, type WizardState } from './types';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'sessions.list.title', title: 'sessions.wizard.title' },
};

const stepKeys = ['context', 'chemicals', 'prints', 'review'] as const;

const NewSessionWizard: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { chemistryApi } = useChemistryApi();
    const { printSessionApi } = usePrintSessionApi();
    const { printApi } = usePrintApi();
    const { photoPaperApi } = usePhotoPaperApi();
    const { enlargerApi } = useEnlargerApi();

    const [state, setState] = React.useState<WizardState>(createInitialState);
    const [chemistries, setChemistries] = React.useState<ChemistryRead[]>([]);
    const [chemistriesLoaded, setChemistriesLoaded] = React.useState(false);
    const [photoPapers, setPhotoPapers] = React.useState<PhotoPaperRead[]>([]);
    const [enlargers, setEnlargers] = React.useState<EnlargerRead[]>([]);
    const [catalogsLoaded, setCatalogsLoaded] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<unknown>(null);

    React.useEffect(() => {
        chemistryApi
            .apiChemistriesGetCollection()
            .then((res) => {
                setChemistries(res.data['hydra:member']);
                setChemistriesLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching chemistries:', err);
            });
    }, [chemistryApi]);

    React.useEffect(() => {
        Promise.all([
            photoPaperApi.apiPhotoPapersGetCollection(),
            enlargerApi.apiEnlargersGetCollection(),
        ])
            .then(([photoPapersRes, enlargersRes]) => {
                setPhotoPapers(photoPapersRes.data['hydra:member']);
                setEnlargers(enlargersRes.data['hydra:member']);
                setCatalogsLoaded(true);
            })
            .catch((err: unknown) => {
                console.error('Error fetching photo papers and enlargers:', err);
            });
    }, [photoPaperApi, enlargerApi]);

    const patch = (p: Partial<WizardState>) => {
        setState((s) => ({ ...s, ...p }));
    };

    const canGoNext = () => {
        if (state.step === 0) {
            return (
                state.date !== '' &&
                state.number !== '' &&
                state.lab !== '' &&
                state.enlargerId !== ''
            );
        }
        if (state.step === 2) {
            return state.prints.every((print) => print.photoPaperId !== '');
        }
        return true;
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            const enlarger = enlargers.find((e) => e.id === state.enlargerId);
            const sessionPayload: PrintSessionWritePrintSession = {
                date: state.date,
                lab: state.lab,
                number: Number(state.number),
                enlarger: enlarger?.['@id'] ?? '',
                temperatureCelsius: Number(state.temperatureCelsius) || 0,
                chemicalBaths: state.baths
                    .filter((bath) => bath.chemistryId)
                    .map((bath) => {
                        const chemistry = chemistries.find((c) => c.id === bath.chemistryId);
                        return {
                            chemistry: chemistry?.['@id'] ?? '',
                            dilutionOverride: bath.dilutionOverride || undefined,
                            durationSeconds: bath.durationSeconds
                                ? Number(bath.durationSeconds)
                                : undefined,
                        };
                    }),
                wash: state.wash || undefined,
                notes: state.notes || undefined,
            };
            const sessionRes = await printSessionApi.apiPrintSessionsPost({
                printSessionWritePrintSession: sessionPayload,
            });
            const sessionIri = sessionRes.data['@id'];

            for (let index = 0; index < state.prints.length; index += 1) {
                const print = state.prints[index];
                if (!print) {
                    continue;
                }
                const photoPaper = photoPapers.find((p) => p.id === print.photoPaperId);
                const printPayload: PrintWritePrint = {
                    session: sessionIri,
                    number: index + 1,
                    negativeNumber: print.negativeNumber || undefined,
                    negativeFormat: print.negativeFormat || undefined,
                    focalLength: print.focalLength || undefined,
                    photoPaper: photoPaper?.['@id'] ?? '',
                    columnHeightCm: print.columnHeightCm ? Number(print.columnHeightCm) : undefined,
                    borderCm: print.borderCm ? Number(print.borderCm) : undefined,
                    copies: print.copies ? Number(print.copies) : undefined,
                    notes: print.notes || undefined,
                    exposures: print.exposures.map((exposure) => ({
                        order: exposure.order,
                        kind: exposure.kind,
                        baseSeconds: Number(exposure.baseSeconds) || 0,
                        stopOffsetNumerator: Number(exposure.stopOffsetNumerator) || 0,
                        stopOffsetDenominator: Number(exposure.stopOffsetDenominator) || 1,
                        grade: exposure.grade,
                        aperture: exposure.aperture || undefined,
                        observation: exposure.observation || undefined,
                    })),
                };

                await printApi.apiPrintsPost({ printWritePrint: printPayload });
            }

            await navigate(`/sessions/${sessionRes.data.id ?? ''}`);
        } catch (err) {
            console.error('Error creating print session:', err);
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
                {t('sessions.wizard.title')}
            </Typography>
            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                {t('sessions.wizard.subtitle')}
            </Typography>

            <Stepper
                activeStep={state.step}
                sx={{ mb: 3 }}
            >
                {stepKeys.map((key) => (
                    <Step key={key}>
                        <StepLabel>{t(`sessions.wizard.steps.${key}`)}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Paper
                sx={{ p: 3 }}
                variant="outlined"
            >
                {state.step === 0 ? (
                    !catalogsLoaded ? (
                        <CircularProgress
                            aria-label={t('app.loading')}
                            enableTrackSlot
                            size="2.5rem"
                        />
                    ) : (
                        <SessionContextStep
                            enlargers={enlargers}
                            onChange={patch}
                            state={state}
                        />
                    )
                ) : null}
                {state.step === 1 ? (
                    !chemistriesLoaded ? (
                        <CircularProgress
                            aria-label={t('app.loading')}
                            enableTrackSlot
                            size="2.5rem"
                        />
                    ) : (
                        <ChemicalChainStep
                            baths={state.baths}
                            chemistries={chemistries}
                            onChange={(baths) => {
                                patch({ baths });
                            }}
                        />
                    )
                ) : null}
                {state.step === 2 ? (
                    !catalogsLoaded ? (
                        <CircularProgress
                            aria-label={t('app.loading')}
                            enableTrackSlot
                            size="2.5rem"
                        />
                    ) : (
                        <PrintsStep
                            onChange={(prints) => {
                                patch({ prints });
                            }}
                            photoPapers={photoPapers}
                            prints={state.prints}
                        />
                    )
                ) : null}
                {state.step === 3 ? (
                    <ReviewStep
                        enlargers={enlargers}
                        onChange={patch}
                        state={state}
                    />
                ) : null}

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
                        {t('sessions.wizard.back')}
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
                            {t('sessions.wizard.next')}
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
                                ? t('sessions.wizard.submitting')
                                : t('sessions.wizard.submit')}
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default NewSessionWizard;
