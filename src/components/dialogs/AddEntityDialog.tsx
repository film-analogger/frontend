import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AddEntityDialog: React.FunctionComponent<{
    readonly open: boolean;
    readonly onClose: () => void;
    readonly icon: React.ReactNode;
    readonly title: string;
    readonly intro?: string;
    readonly submitLabel: string;
    readonly submitDisabled?: boolean;
    readonly onSubmit: () => Promise<void>;
    readonly children: React.ReactNode;
}> = ({ open, onClose, icon, title, intro, submitLabel, submitDisabled, onSubmit, children }) => {
    const { t } = useTranslation();
    const [submitting, setSubmitting] = React.useState(false);
    const [error, setError] = React.useState<unknown>(null);
    const [prevOpen, setPrevOpen] = React.useState(open);

    // Reset the transient submit/error state whenever the dialog opens again,
    // without an effect — see https://react.dev/learn/you-might-not-need-an-effect.
    if (open !== prevOpen) {
        setPrevOpen(open);
        if (open) {
            setError(null);
            setSubmitting(false);
        }
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit();
        } catch (err) {
            console.error('Error submitting entity form:', err);
            setError(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={() => {
                if (!submitting) {
                    onClose();
                }
            }}
            open={open}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(20, 18, 16, 0.55)',
                        backdropFilter: 'blur(2px)',
                    },
                },
                paper: { sx: { borderRadius: '18px' } },
            }}
        >
            <Stack
                direction="row"
                spacing={1.5}
                sx={{
                    alignItems: 'center',
                    p: '18px 22px',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    sx={{
                        flex: '0 0 auto',
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'action.hover',
                        color: 'primary.main',
                    }}
                >
                    {icon}
                </Box>
                <Typography sx={{ flex: 1, fontSize: '17px', fontWeight: 600 }}>{title}</Typography>
                <IconButton
                    aria-label={t('dialogs.close')}
                    onClick={onClose}
                    size="small"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Stack>

            <Box sx={{ p: '20px 22px', overflowY: 'auto' }}>
                {intro ? (
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 2.25, fontSize: '12.5px', lineHeight: 1.55 }}
                    >
                        {intro}
                    </Typography>
                ) : null}
                {error ? (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {t('dialogs.submitError')}
                    </Alert>
                ) : null}
                {children}
            </Box>

            <Stack
                direction="row"
                spacing={1.25}
                sx={{
                    alignItems: 'center',
                    p: '16px 22px',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default',
                }}
            >
                <Typography
                    color="text.secondary"
                    sx={{ flex: 1, fontSize: '11.5px' }}
                >
                    {t('dialogs.footerHint')}
                </Typography>
                <Button
                    disabled={submitting}
                    onClick={onClose}
                    sx={{ borderRadius: '11px' }}
                >
                    {t('dialogs.cancel')}
                </Button>
                <Button
                    disabled={submitDisabled ?? submitting}
                    onClick={() => {
                        handleSubmit().catch(console.error);
                    }}
                    sx={{ borderRadius: '11px' }}
                    variant="contained"
                >
                    {submitLabel}
                </Button>
            </Stack>
        </Dialog>
    );
};
