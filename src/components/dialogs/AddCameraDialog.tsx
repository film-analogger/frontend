import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useCameraApi,
    useManufacturerApi,
    type CameraRead,
    type ManufacturerRead,
} from '~/api/client';
import {
    CameraWriteCameraCatalogStatusWriteFilmFormatEnum,
    type CameraWriteCameraCatalogStatusWrite,
} from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { ManufacturerSelectField } from './ManufacturerSelectField';

const filmFormats = Object.values(CameraWriteCameraCatalogStatusWriteFilmFormatEnum);

export const AddCameraDialog: React.FunctionComponent<{
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreated: (camera: CameraRead) => void;
}> = ({ open, onClose, onCreated }) => {
    const { t } = useTranslation();
    const { cameraApi } = useCameraApi();
    const { manufacturerApi } = useManufacturerApi();

    const [manufacturers, setManufacturers] = React.useState<ManufacturerRead[]>([]);
    const [manufacturerId, setManufacturerId] = React.useState('');
    const [name, setName] = React.useState('');
    const [filmFormat, setFilmFormat] = React.useState<
        CameraWriteCameraCatalogStatusWriteFilmFormatEnum | ''
    >('');
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
            setFilmFormat('');
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
        const payload: CameraWriteCameraCatalogStatusWrite = {
            name,
            manufacturer: manufacturers.find((m) => m.id === manufacturerId)?.['@id'] ?? '',
            filmFormat: filmFormat || undefined,
            description: description || undefined,
            status: scope,
        };
        const res = await cameraApi.apiCamerasPost({
            cameraWriteCameraCatalogStatusWrite: payload,
        });
        onCreated(res.data);
        onClose();
    };

    return (
        <AddEntityDialog
            icon={<PhotoCameraIcon fontSize="small" />}
            intro={t('cameras.add.intro')}
            onClose={onClose}
            onSubmit={handleSubmit}
            open={open}
            submitDisabled={name.trim() === '' || manufacturerId === ''}
            submitLabel={t('cameras.add.submit')}
            title={t('cameras.add.title')}
        >
            <Grid
                container
                spacing={1.75}
            >
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label={t('cameras.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
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
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('cameras.add.fields.filmFormat')}
                        onChange={(e) => {
                            setFilmFormat(
                                e.target.value as CameraWriteCameraCatalogStatusWriteFilmFormatEnum,
                            );
                        }}
                        select
                        value={filmFormat}
                    >
                        <MenuItem value="">{t('cameras.add.fields.filmFormatNone')}</MenuItem>
                        {filmFormats.map((format) => (
                            <MenuItem
                                key={format}
                                value={format}
                            >
                                {format}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('cameras.add.fields.description')}
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
