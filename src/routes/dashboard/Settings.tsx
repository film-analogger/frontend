import { Box, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import {
    getDefaultEnlarger,
    getDefaultLab,
    getStopNotation,
    setDefaultEnlarger as persistDefaultEnlarger,
    setDefaultLab as persistDefaultLab,
    setStopNotation as persistStopNotation,
} from '~/domain/preferences';
import type { StopNotation } from '~/domain/exposureMath';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'app.account', title: 'settings.title' },
};

const Settings: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const [stopNotation, setStopNotation] = React.useState<StopNotation>(getStopNotation);
    const [defaultLab, setDefaultLab] = React.useState(getDefaultLab);
    const [defaultEnlarger, setDefaultEnlarger] = React.useState(getDefaultEnlarger);

    return (
        <Box>
            <Typography
                sx={{ mb: 3 }}
                variant="h1"
            >
                {t('settings.title')}
            </Typography>

            <Paper
                sx={{ p: 3, maxWidth: 480 }}
                variant="outlined"
            >
                <Typography
                    sx={{ mb: 2, fontWeight: 600 }}
                    variant="subtitle1"
                >
                    {t('settings.labDefaults.title')}
                </Typography>
                <Stack spacing={2.5}>
                    <TextField
                        fullWidth
                        helperText={t('settings.labDefaults.stopNotationHelp')}
                        label={t('settings.labDefaults.stopNotation')}
                        onChange={(e) => {
                            const value = e.target.value as StopNotation;
                            persistStopNotation(value);
                            setStopNotation(value);
                        }}
                        select
                        value={stopNotation}
                    >
                        <MenuItem value="fraction">
                            {t('settings.labDefaults.stopNotationFraction')}
                        </MenuItem>
                        <MenuItem value="decimal">
                            {t('settings.labDefaults.stopNotationDecimal')}
                        </MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        helperText={t('settings.labDefaults.defaultLabHelp')}
                        label={t('settings.labDefaults.defaultLab')}
                        onChange={(e) => {
                            persistDefaultLab(e.target.value);
                            setDefaultLab(e.target.value);
                        }}
                        value={defaultLab}
                    />
                    <TextField
                        fullWidth
                        helperText={t('settings.labDefaults.defaultEnlargerHelp')}
                        label={t('settings.labDefaults.defaultEnlarger')}
                        onChange={(e) => {
                            persistDefaultEnlarger(e.target.value);
                            setDefaultEnlarger(e.target.value);
                        }}
                        value={defaultEnlarger}
                    />
                </Stack>
            </Paper>
        </Box>
    );
};

export default Settings;
