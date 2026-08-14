import TextureIcon from '@mui/icons-material/Texture';
import { FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useManufacturerApi,
    usePhotoPaperApi,
    type ManufacturerRead,
    type PhotoPaperRead,
} from '~/api/client';
import {
    PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum,
    PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum,
    type ManufacturerWritePhotoPaperCatalogStatusWrite,
    type PhotoPaperWritePhotoPaperCatalogStatusWrite,
} from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { asIri } from './asIri';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { ManufacturerSelectField } from './ManufacturerSelectField';

const paperBases = Object.values(PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum);
const paperSurfaces = Object.values(PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum);

export const AddPhotoPaperDialog: React.FunctionComponent<{
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreated: (photoPaper: PhotoPaperRead) => void;
}> = ({ open, onClose, onCreated }) => {
    const { t } = useTranslation();
    const { photoPaperApi } = usePhotoPaperApi();
    const { manufacturerApi } = useManufacturerApi();

    const [manufacturers, setManufacturers] = React.useState<ManufacturerRead[]>([]);
    const [manufacturerId, setManufacturerId] = React.useState('');
    const [name, setName] = React.useState('');
    const [paperBase, setPaperBase] =
        React.useState<PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum>(
            PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum.Rc,
        );
    const [paperSurface, setPaperSurface] =
        React.useState<PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum>(
            PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum.Pearl,
        );
    const [paperSurfaceOther, setPaperSurfaceOther] = React.useState('');
    const [variableContrast, setVariableContrast] = React.useState(true);
    // Not yet backed by the API — kept local until the paper catalog exposes
    // supported-formats and toning fields, per the parallel API work.
    const [formats, setFormats] = React.useState('');
    const [toning, setToning] = React.useState(false);
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
            setPaperBase(PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum.Rc);
            setPaperSurface(PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum.Pearl);
            setPaperSurfaceOther('');
            setVariableContrast(true);
            setFormats('');
            setToning(false);
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

    const isOtherSurface =
        paperSurface === PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum.Other;

    const handleSubmit = async () => {
        const payload: PhotoPaperWritePhotoPaperCatalogStatusWrite = {
            name,
            manufacturer: asIri(manufacturerId) as ManufacturerWritePhotoPaperCatalogStatusWrite,
            paperBase,
            paperSurface,
            paperSurfaceOther: isOtherSurface ? paperSurfaceOther || undefined : undefined,
            variableContrast,
            description: description || undefined,
            status: scope,
        };
        const res = await photoPaperApi.apiPhotoPapersPost({
            photoPaperWritePhotoPaperCatalogStatusWrite: payload,
        });
        onCreated(res.data);
        onClose();
    };

    return (
        <AddEntityDialog
            icon={<TextureIcon fontSize="small" />}
            intro={t('photoPapers.add.intro')}
            onClose={onClose}
            onSubmit={handleSubmit}
            open={open}
            submitDisabled={name.trim() === '' || manufacturerId === ''}
            submitLabel={t('photoPapers.add.submit')}
            title={t('photoPapers.add.title')}
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
                        label={t('photoPapers.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label={t('photoPapers.add.fields.paperBase')}
                        onChange={(e) => {
                            setPaperBase(
                                e.target
                                    .value as PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum,
                            );
                        }}
                        select
                        value={paperBase}
                    >
                        {paperBases.map((base) => (
                            <MenuItem
                                key={base}
                                value={base}
                            >
                                {t(`photoPapers.add.fields.paperBaseOptions.${base}`)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: isOtherSurface ? 3 : 6 }}>
                    <TextField
                        fullWidth
                        label={t('photoPapers.add.fields.paperSurface')}
                        onChange={(e) => {
                            setPaperSurface(
                                e.target
                                    .value as PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum,
                            );
                        }}
                        select
                        value={paperSurface}
                    >
                        {paperSurfaces.map((surface) => (
                            <MenuItem
                                key={surface}
                                value={surface}
                            >
                                {t(`photoPapers.add.fields.paperSurfaceOptions.${surface}`)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {isOtherSurface ? (
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                            fullWidth
                            label={t('photoPapers.add.fields.paperSurfaceOther')}
                            onChange={(e) => {
                                setPaperSurfaceOther(e.target.value);
                            }}
                            value={paperSurfaceOther}
                        />
                    </Grid>
                ) : null}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={variableContrast}
                                onChange={(e) => {
                                    setVariableContrast(e.target.checked);
                                }}
                            />
                        }
                        label={t('photoPapers.add.fields.variableContrast')}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={toning}
                                onChange={(e) => {
                                    setToning(e.target.checked);
                                }}
                            />
                        }
                        label={t('photoPapers.add.fields.toning')}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        helperText={t('photoPapers.add.fields.formatsHint')}
                        label={t('photoPapers.add.fields.formats')}
                        onChange={(e) => {
                            setFormats(e.target.value);
                        }}
                        placeholder="13x18, 18x24, 20x25…"
                        value={formats}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('photoPapers.add.fields.description')}
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
