import AddIcon from '@mui/icons-material/Add';
import BiotechIcon from '@mui/icons-material/Biotech';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
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
    type ChemistryTypeWriteChemistryCatalogStatusWrite,
    type ChemistryWriteChemistryCatalogStatusWrite,
    type ManufacturerWriteChemistryCatalogStatusWrite,
} from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { asIri } from './asIri';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { ManufacturerSelectField } from './ManufacturerSelectField';

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
    // Not yet backed by the API — kept local until dilutions carry a working
    // temperature range, per the parallel API work.
    const [tempMin, setTempMin] = React.useState('');
    const [tempMax, setTempMax] = React.useState('');
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
            setTempMin('');
            setTempMax('');
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
            chemistryType: asIri(chemistryTypeId) as ChemistryTypeWriteChemistryCatalogStatusWrite,
            manufacturer: asIri(manufacturerId) as ManufacturerWriteChemistryCatalogStatusWrite,
            description: description || undefined,
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
                    <TextField
                        fullWidth
                        label={t('chemistries.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
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
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
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
                    </TextField>
                </Grid>

                <Grid size={12}>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 0.75, fontSize: '11.5px', fontWeight: 600 }}
                    >
                        {t('chemistries.add.fields.dilutions')}
                    </Typography>
                    <Stack spacing={1}>
                        {dilutions.map((row) => (
                            <Paper
                                key={row.key}
                                sx={{ p: 1.25 }}
                                variant="outlined"
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ alignItems: 'center' }}
                                >
                                    <TextField
                                        label={t('chemistries.add.fields.dilutionChemistryParts')}
                                        onChange={(e) => {
                                            updateDilution(row.key, {
                                                chemistryParts: e.target.value,
                                            });
                                        }}
                                        size="small"
                                        sx={{ width: 88 }}
                                        type="number"
                                        value={row.chemistryParts}
                                    />
                                    <Typography color="text.secondary">+</Typography>
                                    <TextField
                                        label={t('chemistries.add.fields.dilutionWaterParts')}
                                        onChange={(e) => {
                                            updateDilution(row.key, { waterParts: e.target.value });
                                        }}
                                        size="small"
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
                            </Paper>
                        ))}
                        <Button
                            onClick={() => {
                                setDilutions((rows) => [...rows, createDilutionRow()]);
                            }}
                            startIcon={<AddIcon />}
                            sx={{ alignSelf: 'flex-start' }}
                            variant="outlined"
                        >
                            {t('chemistries.add.fields.dilutionAdd')}
                        </Button>
                    </Stack>
                </Grid>

                <Grid size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label={t('chemistries.add.fields.tempMin')}
                        onChange={(e) => {
                            setTempMin(e.target.value);
                        }}
                        type="number"
                        value={tempMin}
                    />
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label={t('chemistries.add.fields.tempMax')}
                        onChange={(e) => {
                            setTempMax(e.target.value);
                        }}
                        type="number"
                        value={tempMax}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('chemistries.add.fields.officialDocumentationUrl')}
                        onChange={(e) => {
                            setOfficialDocumentationUrl(e.target.value);
                        }}
                        value={officialDocumentationUrl}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
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
