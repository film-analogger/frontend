import CameraRollIcon from '@mui/icons-material/CameraRoll';
import { FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFilmApi, useManufacturerApi, type ManufacturerRead, type FilmRead } from '~/api/client';
import {
    FilmWriteFilmCatalogStatusWriteProcessEnum,
    type FilmWriteFilmCatalogStatusWrite,
} from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { IdentityColorFields, type IdentityColors } from './IdentityColorFields';
import { ManufacturerSelectField } from './ManufacturerSelectField';

const processes = Object.values(FilmWriteFilmCatalogStatusWriteProcessEnum);

const emulsionTypes = ['Panchromatique', 'Orthochromatique', 'Chromogène', 'Inversible'];

export const AddFilmDialog: React.FunctionComponent<{
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreated: (film: FilmRead) => void;
}> = ({ open, onClose, onCreated }) => {
    const { t } = useTranslation();
    const { filmApi } = useFilmApi();
    const { manufacturerApi } = useManufacturerApi();

    const [manufacturers, setManufacturers] = React.useState<ManufacturerRead[]>([]);
    const [manufacturerId, setManufacturerId] = React.useState('');
    const [name, setName] = React.useState('');
    const [sensibility, setSensibility] = React.useState('');
    const [process, setProcess] = React.useState<FilmWriteFilmCatalogStatusWriteProcessEnum>(
        FilmWriteFilmCatalogStatusWriteProcessEnum.Bw,
    );
    const [emulsionType, setEmulsionType] = React.useState('');
    // Not yet backed by the API — kept local until the film catalog exposes a
    // supported-formats field, per the parallel API work.
    const [formats, setFormats] = React.useState('');
    const [inversible, setInversible] = React.useState(false);
    const [officialDocumentationUrl, setOfficialDocumentationUrl] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [colors, setColors] = React.useState<IdentityColors>({
        primaryColor: '',
        secondaryColor: '',
        tertiaryColor: '',
    });
    const [scope, setScope] = React.useState<CatalogScope>('personal');
    const [prevOpen, setPrevOpen] = React.useState(open);

    // Reset the form whenever the dialog opens again, without an effect —
    // see https://react.dev/learn/you-might-not-need-an-effect.
    if (open !== prevOpen) {
        setPrevOpen(open);
        if (open) {
            setManufacturerId('');
            setName('');
            setSensibility('');
            setProcess(FilmWriteFilmCatalogStatusWriteProcessEnum.Bw);
            setEmulsionType('');
            setFormats('');
            setInversible(false);
            setOfficialDocumentationUrl('');
            setDescription('');
            setColors({ primaryColor: '', secondaryColor: '', tertiaryColor: '' });
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
        const payload: FilmWriteFilmCatalogStatusWrite = {
            name,
            description,
            process,
            emulsionType: emulsionType || undefined,
            inversible,
            officialDocumentationUrl: officialDocumentationUrl || undefined,
            sensibility: Number(sensibility),
            primaryColor: colors.primaryColor || undefined,
            secondaryColor: colors.secondaryColor || undefined,
            tertiaryColor: colors.tertiaryColor || undefined,
            manufacturer: manufacturers.find((m) => m.id === manufacturerId)?.['@id'] ?? '',
            status: scope,
        };
        const res = await filmApi.apiFilmsPost({ filmWriteFilmCatalogStatusWrite: payload });
        onCreated(res.data);
        onClose();
    };

    return (
        <AddEntityDialog
            icon={<CameraRollIcon fontSize="small" />}
            intro={t('films.add.intro')}
            onClose={onClose}
            onSubmit={handleSubmit}
            open={open}
            submitDisabled={name.trim() === '' || manufacturerId === '' || sensibility === ''}
            submitLabel={t('films.add.submit')}
            title={t('films.add.title')}
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
                        label={t('films.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('films.add.fields.sensibility')}
                        onChange={(e) => {
                            setSensibility(e.target.value);
                        }}
                        type="number"
                        value={sensibility}
                    />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <TextField
                        fullWidth
                        label={t('films.add.fields.process')}
                        onChange={(e) => {
                            setProcess(
                                e.target.value as FilmWriteFilmCatalogStatusWriteProcessEnum,
                            );
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
                        label={t('films.add.fields.emulsionType')}
                        onChange={(e) => {
                            setEmulsionType(e.target.value);
                        }}
                        select
                        value={emulsionType}
                    >
                        <MenuItem value="">{t('films.add.fields.emulsionTypeNone')}</MenuItem>
                        {emulsionTypes.map((type) => (
                            <MenuItem
                                key={type}
                                value={type}
                            >
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        helperText={t('films.add.fields.formatsHint')}
                        label={t('films.add.fields.formats')}
                        onChange={(e) => {
                            setFormats(e.target.value);
                        }}
                        placeholder="135, 120…"
                        value={formats}
                    />
                </Grid>
                <Grid size={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={inversible}
                                onChange={(e) => {
                                    setInversible(e.target.checked);
                                }}
                            />
                        }
                        label={t('films.add.fields.inversible')}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('films.add.fields.officialDocumentationUrl')}
                        onChange={(e) => {
                            setOfficialDocumentationUrl(e.target.value);
                        }}
                        value={officialDocumentationUrl}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('films.add.fields.description')}
                        minRows={3}
                        multiline
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        value={description}
                    />
                </Grid>
                <Grid size={12}>
                    <IdentityColorFields
                        onChange={(patch) => {
                            setColors((c) => ({ ...c, ...patch }));
                        }}
                        value={colors}
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
