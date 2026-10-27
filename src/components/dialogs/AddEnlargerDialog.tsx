import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import { Box, ButtonBase, Grid, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useEnlargerApi,
    useManufacturerApi,
    type EnlargerRead,
    type ManufacturerRead,
} from '~/api/client';
import {
    EnlargerWriteEnlargerCatalogStatusWriteLightSourceEnum,
    type EnlargerWriteEnlargerCatalogStatusWrite,
} from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { DialogTextField } from './DialogTextField';
import { FieldLabel } from './FieldLabel';
import { ManufacturerSelectField } from './ManufacturerSelectField';

const lightSources = Object.values(EnlargerWriteEnlargerCatalogStatusWriteLightSourceEnum);

// Negative format codes and the film-stock family they belong to, mirrored
// from the "Modales ajout" mockup's enlarger chip list.
const negativeFormats: { format: string; family: string }[] = [
    { format: '24x36', family: '135' },
    { format: '6x4.5', family: '120' },
    { format: '6x6', family: '120' },
    { format: '6x7', family: '120' },
    { format: '6x9', family: '120' },
    { format: '4x5', family: 'plan-film' },
    { format: '8x10', family: 'plan-film' },
];

export const AddEnlargerDialog: React.FunctionComponent<{
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreated: (enlarger: EnlargerRead) => void;
}> = ({ open, onClose, onCreated }) => {
    const { t } = useTranslation();
    const { enlargerApi } = useEnlargerApi();
    const { manufacturerApi } = useManufacturerApi();

    const [manufacturers, setManufacturers] = React.useState<ManufacturerRead[]>([]);
    const [manufacturerId, setManufacturerId] = React.useState('');
    const [name, setName] = React.useState('');
    const [lightSource, setLightSource] = React.useState<
        EnlargerWriteEnlargerCatalogStatusWriteLightSourceEnum | ''
    >('');
    const [formats, setFormats] = React.useState<string[]>([]);
    const [description, setDescription] = React.useState('');
    const [scope, setScope] = React.useState<CatalogScope>('personal');
    const [prevOpen, setPrevOpen] = React.useState(open);

    // Reset the form whenever the dialog opens again, without an effect —
    // see https://react.dev/learn/you-might-not-need-an-effect.
    if (open !== prevOpen) {
        setPrevOpen(open);
        if (open) {
            setManufacturerId('');
            setName('');
            setLightSource('');
            setFormats([]);
            setDescription('');
            setScope('personal');
        }
    }

    React.useEffect(() => {
        if (!open) {
            return;
        }
        manufacturerApi
            .apiManufacturersGetCollection()
            .then((res) => {
                setManufacturers(res.data['hydra:member']);
            })
            .catch((err: unknown) => {
                console.error('Error fetching manufacturers:', err);
            });
    }, [open, manufacturerApi]);

    const handleSubmit = async () => {
        const payload: EnlargerWriteEnlargerCatalogStatusWrite = {
            name,
            manufacturer: manufacturers.find((m) => m.id === manufacturerId)?.['@id'] ?? '',
            lightSource: lightSource || undefined,
            negativeFormats: formats.length > 0 ? formats : undefined,
            description: description || undefined,
            status: scope,
        };
        const res = await enlargerApi.apiEnlargersPost({
            enlargerWriteEnlargerCatalogStatusWrite: payload,
        });
        onCreated(res.data);
        onClose();
    };

    return (
        <AddEntityDialog
            icon={<SettingsInputCompositeIcon fontSize="small" />}
            intro={t('enlargers.add.intro')}
            onClose={onClose}
            onSubmit={handleSubmit}
            open={open}
            submitDisabled={name.trim() === '' || manufacturerId === ''}
            submitLabel={t('enlargers.add.submit')}
            title={t('enlargers.add.title')}
        >
            <Grid
                container
                spacing={1.75}
            >
                <Grid size={{ xs: 12, sm: 6 }}>
                    <ManufacturerSelectField
                        manufacturers={manufacturers}
                        onChange={setManufacturerId}
                        onManufacturerCreated={(manufacturer) => {
                            setManufacturers((list) => [...list, manufacturer]);
                        }}
                        value={manufacturerId}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <DialogTextField
                        label={t('enlargers.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
                <Grid size={12}>
                    <DialogTextField
                        label={t('enlargers.add.fields.lightSource')}
                        onChange={(e) => {
                            setLightSource(
                                e.target
                                    .value as EnlargerWriteEnlargerCatalogStatusWriteLightSourceEnum,
                            );
                        }}
                        select
                        value={lightSource}
                    >
                        <MenuItem value="">{t('enlargers.add.fields.lightSourceNone')}</MenuItem>
                        {lightSources.map((source) => (
                            <MenuItem
                                key={source}
                                value={source}
                            >
                                {t(`enlargers.add.fields.lightSourceOptions.${source}`)}
                            </MenuItem>
                        ))}
                    </DialogTextField>
                </Grid>
                <Grid size={12}>
                    <FieldLabel>{t('enlargers.add.fields.formats')}</FieldLabel>
                    <Stack
                        direction="row"
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        {negativeFormats.map(({ format, family }) => {
                            const selected = formats.includes(format);
                            return (
                                <ButtonBase
                                    key={format}
                                    onClick={() => {
                                        setFormats((current) =>
                                            selected
                                                ? current.filter((f) => f !== format)
                                                : [...current, format],
                                        );
                                    }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '7px',
                                        p: '8px 12px',
                                        borderRadius: '9px',
                                        border: '1px solid',
                                        borderColor: selected ? 'primary.main' : 'divider',
                                        backgroundColor: selected
                                            ? 'action.hover'
                                            : 'background.default',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            color: selected ? 'primary.main' : 'text.secondary',
                                        }}
                                    >
                                        {selected ? (
                                            <CheckCircleIcon sx={{ fontSize: 15 }} />
                                        ) : (
                                            <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} />
                                        )}
                                    </Box>
                                    <Typography sx={{ fontSize: '12.5px', fontWeight: 600 }}>
                                        {format}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ fontSize: '11px', fontWeight: 500 }}
                                    >
                                        {family}
                                    </Typography>
                                </ButtonBase>
                            );
                        })}
                    </Stack>
                </Grid>
                <Grid size={12}>
                    <DialogTextField
                        label={t('enlargers.add.fields.description')}
                        minRows={3}
                        multiline
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        value={description}
                    />
                </Grid>
                <Grid size={12}>
                    <CatalogScopeField
                        onChange={setScope}
                        value={scope}
                    />
                </Grid>
            </Grid>
        </AddEntityDialog>
    );
};
