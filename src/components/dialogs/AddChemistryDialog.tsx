import AddIcon from '@mui/icons-material/Add';
import BiotechIcon from '@mui/icons-material/Biotech';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    Switch,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useChemistryApi,
    useChemistryTypeApi,
    useManufacturerApi,
    type ChemistryTypeRead,
    type ManufacturerRead,
    type ChemistryRead,
} from '~/api/client';
import {
    ChemistryWriteChemistryCatalogStatusWriteProcessEnum,
    type ChemistryWriteChemistryCatalogStatusWrite,
} from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { DialogLinkField } from './DialogLinkField';
import { DialogRangeField } from './DialogRangeField';
import { DialogTextField } from './DialogTextField';
import { FieldLabel } from './FieldLabel';
import { ManufacturerSelectField } from './ManufacturerSelectField';

const temperatureScaleMin = 12;
const temperatureScaleMax = 50;
const defaultTemperatureRange: [number, number] = [18, 24];

const processes = Object.values(ChemistryWriteChemistryCatalogStatusWriteProcessEnum);

interface DilutionRow {
    key: string;
    chemistryParts: string;
    waterParts: string;
    official: boolean;
}

let dilutionKeySeed = 0;
const createDilutionRow = (): DilutionRow => {
    dilutionKeySeed += 1;
    return {
        key: `d${String(dilutionKeySeed)}`,
        chemistryParts: '1',
        waterParts: '9',
        official: false,
    };
};

export const AddChemistryDialog: React.FunctionComponent<{
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreated: (chemistry: ChemistryRead) => void;
}> = ({ open, onClose, onCreated }) => {
    const { t } = useTranslation();
    const { chemistryApi } = useChemistryApi();
    const { chemistryTypeApi } = useChemistryTypeApi();
    const { manufacturerApi } = useManufacturerApi();

    const [manufacturers, setManufacturers] = React.useState<ManufacturerRead[]>([]);
    const [chemistryTypes, setChemistryTypes] = React.useState<ChemistryTypeRead[]>([]);
    const [manufacturerId, setManufacturerId] = React.useState('');
    const [name, setName] = React.useState('');
    const [process, setProcess] =
        React.useState<ChemistryWriteChemistryCatalogStatusWriteProcessEnum>(
            ChemistryWriteChemistryCatalogStatusWriteProcessEnum.Bw,
        );
    const [chemistryTypeId, setChemistryTypeId] = React.useState('');
    const [dilutions, setDilutions] = React.useState<DilutionRow[]>([createDilutionRow()]);
    const [tempRange, setTempRange] = React.useState<[number, number]>(defaultTemperatureRange);
    const [officialDocumentationUrl, setOfficialDocumentationUrl] = React.useState('');
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
            setProcess(ChemistryWriteChemistryCatalogStatusWriteProcessEnum.Bw);
            setChemistryTypeId('');
            setDilutions([createDilutionRow()]);
            setTempRange(defaultTemperatureRange);
            setOfficialDocumentationUrl('');
            setDescription('');
            setScope('personal');
        }
    }

    React.useEffect(() => {
        if (!open) {
            return;
        }
        Promise.all([
            manufacturerApi.apiManufacturersGetCollection(),
            chemistryTypeApi.apiChemistryTypesGetCollection(),
        ])
            .then(([manufRes, typesRes]) => {
                setManufacturers(manufRes.data['hydra:member']);
                setChemistryTypes(typesRes.data['hydra:member']);
            })
            .catch((err: unknown) => {
                console.error('Error fetching manufacturers and chemistry types:', err);
            });
    }, [open, manufacturerApi, chemistryTypeApi]);

    const visibleChemistryTypes = chemistryTypes.filter((type) => type.process === process);
    const chemistryTypeOptions =
        visibleChemistryTypes.length > 0 ? visibleChemistryTypes : chemistryTypes;

    const updateDilution = (key: string, patch: Partial<DilutionRow>) => {
        setDilutions((rows) => rows.map((row) => (row.key === key ? { ...row, ...patch } : row)));
    };

    const handleSubmit = async () => {
        const payload: ChemistryWriteChemistryCatalogStatusWrite = {
            name,
            process,
            chemistryType: chemistryTypes.find((t) => t.id === chemistryTypeId)?.['@id'] ?? '',
            manufacturer: manufacturers.find((m) => m.id === manufacturerId)?.['@id'] ?? '',
            description: description || undefined,
            referenceTemperatureMin: tempRange[0],
            referenceTemperatureMax: tempRange[1],
            officialDocumentationUrl: officialDocumentationUrl || undefined,
            dilutions: dilutions
                .filter((row) => row.chemistryParts !== '' && row.waterParts !== '')
                .map((row) => ({
                    chemistryParts: Number(row.chemistryParts),
                    waterParts: Number(row.waterParts),
                    official: row.official,
                })),
            status: scope,
        };
        const res = await chemistryApi.apiChemistriesPost({
            chemistryWriteChemistryCatalogStatusWrite: payload,
        });
        onCreated(res.data);
        onClose();
    };

    return (
        <AddEntityDialog
            icon={<BiotechIcon fontSize="small" />}
            intro={t('chemistries.add.intro')}
            onClose={onClose}
            onSubmit={handleSubmit}
            open={open}
            submitDisabled={name.trim() === '' || manufacturerId === '' || chemistryTypeId === ''}
            submitLabel={t('chemistries.add.submit')}
            title={t('chemistries.add.title')}
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
                        label={t('chemistries.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <DialogTextField
                        label={t('chemistries.add.fields.chemistryType')}
                        onChange={(e) => {
                            setChemistryTypeId(e.target.value);
                        }}
                        select
                        value={chemistryTypeId}
                    >
                        {chemistryTypeOptions.map((type) => (
                            <MenuItem
                                key={type['@id']}
                                value={type.id}
                            >
                                {type.typeLabel}
                            </MenuItem>
                        ))}
                    </DialogTextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <DialogTextField
                        label={t('chemistries.add.fields.process')}
                        onChange={(e) => {
                            setProcess(
                                e.target
                                    .value as ChemistryWriteChemistryCatalogStatusWriteProcessEnum,
                            );
                            setChemistryTypeId('');
                        }}
                        select
                        value={process}
                    >
                        {processes.map((p) => (
                            <MenuItem
                                key={p}
                                value={p}
                            >
                                {p}
                            </MenuItem>
                        ))}
                    </DialogTextField>
                </Grid>

                <Grid size={12}>
                    <FieldLabel>{t('chemistries.add.fields.dilutions')}</FieldLabel>
                    <Stack spacing={1}>
                        {dilutions.map((row) => (
                            <Box
                                key={row.key}
                                sx={{
                                    p: 1.25,
                                    borderRadius: '11px',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    backgroundColor: 'background.default',
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ alignItems: 'center' }}
                                >
                                    <DialogTextField
                                        label={t('chemistries.add.fields.dilutionChemistryParts')}
                                        onChange={(e) => {
                                            updateDilution(row.key, {
                                                chemistryParts: e.target.value,
                                            });
                                        }}
                                        sx={{ width: 88 }}
                                        type="number"
                                        value={row.chemistryParts}
                                    />
                                    <Box
                                        component="span"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        +
                                    </Box>
                                    <DialogTextField
                                        label={t('chemistries.add.fields.dilutionWaterParts')}
                                        onChange={(e) => {
                                            updateDilution(row.key, { waterParts: e.target.value });
                                        }}
                                        sx={{ width: 88 }}
                                        type="number"
                                        value={row.waterParts}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={row.official}
                                                onChange={(e) => {
                                                    updateDilution(row.key, {
                                                        official: e.target.checked,
                                                    });
                                                }}
                                                size="small"
                                            />
                                        }
                                        label={t('chemistries.add.fields.dilutionOfficial')}
                                        sx={{ flex: 1 }}
                                    />
                                    <IconButton
                                        aria-label={t('chemistries.add.fields.dilutionRemove')}
                                        disabled={dilutions.length <= 1}
                                        onClick={() => {
                                            setDilutions((rows) =>
                                                rows.filter((r) => r.key !== row.key),
                                            );
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Box>
                        ))}
                        <Button
                            onClick={() => {
                                setDilutions((rows) => [...rows, createDilutionRow()]);
                            }}
                            startIcon={<AddIcon />}
                            sx={{ alignSelf: 'flex-start', borderRadius: '11px' }}
                            variant="outlined"
                        >
                            {t('chemistries.add.fields.dilutionAdd')}
                        </Button>
                    </Stack>
                </Grid>

                <Grid size={12}>
                    <FieldLabel>{t('chemistries.add.fields.temperatureRange')}</FieldLabel>
                    <DialogRangeField
                        decreaseAriaLabel={t('chemistries.add.fields.temperatureDecrease')}
                        increaseAriaLabel={t('chemistries.add.fields.temperatureIncrease')}
                        maxLabel={t('chemistries.add.fields.temperatureMax')}
                        minLabel={t('chemistries.add.fields.temperatureMin')}
                        onChangeMax={(value) => {
                            setTempRange(([lo]) => [lo, value]);
                        }}
                        onChangeMin={(value) => {
                            setTempRange(([, hi]) => [value, hi]);
                        }}
                        scaleMax={temperatureScaleMax}
                        scaleMin={temperatureScaleMin}
                        unit="°C"
                        valueMax={tempRange[1]}
                        valueMin={tempRange[0]}
                    />
                </Grid>

                <Grid size={12}>
                    <DialogLinkField
                        label={t('chemistries.add.fields.officialDocumentationUrl')}
                        onChange={(e) => {
                            setOfficialDocumentationUrl(e.target.value);
                        }}
                        value={officialDocumentationUrl}
                    />
                </Grid>
                <Grid size={12}>
                    <DialogTextField
                        label={t('chemistries.add.fields.description')}
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
