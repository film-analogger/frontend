import TextureIcon from '@mui/icons-material/Texture';
import { Box, FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useManufacturerApi,
    usePhotoPaperApi,
    type ManufacturerRead,
    type PhotoPaperRead,
} from '~/api/client';
import {
    PhotoPaperWritePhotoPaperCatalogStatusWriteGradeEnum,
    PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum,
    PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum,
    PhotoPaperWritePhotoPaperCatalogStatusWriteProcessEnum,
    type PhotoPaperWritePhotoPaperCatalogStatusWrite,
} from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { DialogLinkField } from './DialogLinkField';
import { DialogTextField } from './DialogTextField';
import { FieldLabel } from './FieldLabel';
import { ManufacturerSelectField } from './ManufacturerSelectField';

const paperBases = Object.values(PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum);
const paperSurfaces = Object.values(PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum);
const processes = Object.values(PhotoPaperWritePhotoPaperCatalogStatusWriteProcessEnum);
const grades = Object.values(PhotoPaperWritePhotoPaperCatalogStatusWriteGradeEnum);

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
    const [process, setProcess] =
        React.useState<PhotoPaperWritePhotoPaperCatalogStatusWriteProcessEnum>(
            PhotoPaperWritePhotoPaperCatalogStatusWriteProcessEnum.BwPrint,
        );
    const [variableContrast, setVariableContrast] = React.useState(true);
    const [grade, setGrade] = React.useState<
        PhotoPaperWritePhotoPaperCatalogStatusWriteGradeEnum | ''
    >('');
    const [formats, setFormats] = React.useState('');
    // Not yet backed by the API — kept local until the paper catalog exposes a
    // toning field, per the parallel API work.
    const [toning, setToning] = React.useState(false);
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
            setPaperBase(PhotoPaperWritePhotoPaperCatalogStatusWritePaperBaseEnum.Rc);
            setPaperSurface(PhotoPaperWritePhotoPaperCatalogStatusWritePaperSurfaceEnum.Pearl);
            setPaperSurfaceOther('');
            setProcess(PhotoPaperWritePhotoPaperCatalogStatusWriteProcessEnum.BwPrint);
            setVariableContrast(true);
            setGrade('');
            setFormats('');
            setToning(false);
            setOfficialDocumentationUrl('');
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
        const formatsList = formats
            .split(',')
            .map((format) => format.trim())
            .filter((format) => format !== '');

        const payload: PhotoPaperWritePhotoPaperCatalogStatusWrite = {
            name,
            manufacturer: manufacturers.find((m) => m.id === manufacturerId)?.['@id'] ?? '',
            paperBase,
            paperSurface,
            paperSurfaceOther: isOtherSurface ? paperSurfaceOther || undefined : undefined,
            variableContrast,
            grade: variableContrast ? undefined : grade || undefined,
            process,
            availableFormats: formatsList.length > 0 ? formatsList : undefined,
            officialDocumentationUrl: officialDocumentationUrl || undefined,
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
                    <DialogTextField
                        label={t('photoPapers.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <DialogTextField
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
                    </DialogTextField>
                </Grid>
                <Grid size={{ xs: 12, sm: isOtherSurface ? 3 : 6 }}>
                    <DialogTextField
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
                    </DialogTextField>
                </Grid>
                {isOtherSurface ? (
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <DialogTextField
                            label={t('photoPapers.add.fields.paperSurfaceOther')}
                            onChange={(e) => {
                                setPaperSurfaceOther(e.target.value);
                            }}
                            value={paperSurfaceOther}
                        />
                    </Grid>
                ) : null}
                <Grid size={{ xs: 12, sm: variableContrast ? 12 : 6 }}>
                    <DialogTextField
                        label={t('photoPapers.add.fields.process')}
                        onChange={(e) => {
                            setProcess(
                                e.target
                                    .value as PhotoPaperWritePhotoPaperCatalogStatusWriteProcessEnum,
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
                    </DialogTextField>
                </Grid>
                {variableContrast ? null : (
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DialogTextField
                            label={t('photoPapers.add.fields.grade')}
                            onChange={(e) => {
                                setGrade(
                                    e.target
                                        .value as PhotoPaperWritePhotoPaperCatalogStatusWriteGradeEnum,
                                );
                            }}
                            select
                            value={grade}
                        >
                            <MenuItem value="">{t('photoPapers.add.fields.gradeNone')}</MenuItem>
                            {grades.map((g) => (
                                <MenuItem
                                    key={g}
                                    value={g}
                                >
                                    {g}
                                </MenuItem>
                            ))}
                        </DialogTextField>
                    </Grid>
                )}
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
                    <Box>
                        <FieldLabel>{t('photoPapers.add.fields.toning')}</FieldLabel>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={toning}
                                    onChange={(e) => {
                                        setToning(e.target.checked);
                                    }}
                                />
                            }
                            label={
                                toning
                                    ? t('photoPapers.add.fields.toningOn')
                                    : t('photoPapers.add.fields.toningOff')
                            }
                            sx={{ ml: 0 }}
                        />
                    </Box>
                </Grid>
                <Grid size={12}>
                    <DialogTextField
                        label={t('photoPapers.add.fields.formats')}
                        onChange={(e) => {
                            setFormats(e.target.value);
                        }}
                        placeholder="13x18, 18x24, 20x25…"
                        value={formats}
                    />
                </Grid>
                <Grid size={12}>
                    <DialogLinkField
                        label={t('photoPapers.add.fields.officialDocumentationUrl')}
                        onChange={(e) => {
                            setOfficialDocumentationUrl(e.target.value);
                        }}
                        value={officialDocumentationUrl}
                    />
                </Grid>
                <Grid size={12}>
                    <DialogTextField
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
