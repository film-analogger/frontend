import { Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CameraRead, FilmRead } from '~/api/client';
import type { DevelopmentLogWriteDevelopmentLogProcessEnum } from '~/api/filmAnaloggerApi';
import type { WizardState } from './types';

const processes: DevelopmentLogWriteDevelopmentLogProcessEnum[] = [
    'C-41',
    'E-6',
    'B&W',
    'ECN-2',
    'RA4',
    'B&W Print',
];

export const NegativeContextStep: React.FunctionComponent<{
    readonly state: WizardState;
    readonly films: FilmRead[];
    readonly cameras: CameraRead[];
    readonly onChange: (patch: Partial<WizardState>) => void;
}> = ({ state, films, cameras, onChange }) => {
    const { t } = useTranslation();

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.film')}
                    onChange={(e) => {
                        const film = films.find((f) => f.id === e.target.value);
                        onChange({
                            filmId: e.target.value,
                            process: state.process === '' && film ? film.process : state.process,
                            isoShotAt:
                                state.isoShotAt === '' && film
                                    ? String(film.sensibility)
                                    : state.isoShotAt,
                        });
                    }}
                    select
                    value={state.filmId}
                >
                    {films.map((film) => (
                        <MenuItem
                            key={film.id}
                            value={film.id}
                        >
                            {film.name} · {film.manufacturer.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.camera')}
                    onChange={(e) => {
                        onChange({ cameraId: e.target.value });
                    }}
                    select
                    value={state.cameraId}
                >
                    <MenuItem value="">{t('negatifs.wizard.fields.noCamera')}</MenuItem>
                    {cameras.map((camera) => (
                        <MenuItem
                            key={camera.id}
                            value={camera.id}
                        >
                            {camera.name} · {camera.manufacturer.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.shotYear')}
                    onChange={(e) => {
                        onChange({ shotYear: e.target.value });
                    }}
                    type="number"
                    value={state.shotYear}
                />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.shotMonth')}
                    onChange={(e) => {
                        onChange({ shotMonth: e.target.value });
                    }}
                    type="number"
                    value={state.shotMonth}
                />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.shotDay')}
                    onChange={(e) => {
                        onChange({ shotDay: e.target.value });
                    }}
                    type="number"
                    value={state.shotDay}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    helperText={t('negatifs.wizard.fields.isoShotAtHint')}
                    label={t('negatifs.wizard.fields.isoShotAt')}
                    onChange={(e) => {
                        onChange({ isoShotAt: e.target.value });
                    }}
                    type="number"
                    value={state.isoShotAt}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.process')}
                    onChange={(e) => {
                        onChange({
                            process: e.target.value as DevelopmentLogWriteDevelopmentLogProcessEnum,
                        });
                    }}
                    select
                    value={state.process}
                >
                    {processes.map((process) => (
                        <MenuItem
                            key={process}
                            value={process}
                        >
                            {process}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.developedAt')}
                    onChange={(e) => {
                        onChange({ developedAt: e.target.value });
                    }}
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="date"
                    value={state.developedAt}
                />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
                <TextField
                    fullWidth
                    helperText={t('negatifs.wizard.fields.binderIdHint')}
                    label={t('negatifs.wizard.fields.binderId')}
                    onChange={(e) => {
                        onChange({ binderId: e.target.value });
                    }}
                    value={state.binderId}
                />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.contactSheetNumber')}
                    onChange={(e) => {
                        onChange({ contactSheetNumber: e.target.value });
                    }}
                    type="number"
                    value={state.contactSheetNumber}
                />
            </Grid>
            <Grid size={12}>
                <TextField
                    fullWidth
                    label={t('negatifs.wizard.fields.shootingNotes')}
                    minRows={3}
                    multiline
                    onChange={(e) => {
                        onChange({ shootingNotes: e.target.value });
                    }}
                    value={state.shootingNotes}
                />
            </Grid>
        </Grid>
    );
};
