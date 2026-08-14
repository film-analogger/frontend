import FactoryIcon from '@mui/icons-material/Factory';
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useManufacturerApi, type ManufacturerRead } from '~/api/client';
import type { ManufacturerWriteManufacturerCatalogStatusWrite } from '~/api/filmAnaloggerApi';
import { AddEntityDialog } from './AddEntityDialog';
import { CatalogScopeField, type CatalogScope } from './CatalogScopeField';
import { IdentityColorFields, type IdentityColors } from './IdentityColorFields';

export const AddManufacturerDialog: React.FunctionComponent<{
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreated: (manufacturer: ManufacturerRead) => void;
}> = ({ open, onClose, onCreated }) => {
    const { t } = useTranslation();
    const { manufacturerApi } = useManufacturerApi();

    const [name, setName] = React.useState('');
    const [website, setWebsite] = React.useState('');
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
            setName('');
            setWebsite('');
            setColors({ primaryColor: '', secondaryColor: '', tertiaryColor: '' });
            setScope('personal');
        }
    }

    const handleSubmit = async () => {
        const payload: ManufacturerWriteManufacturerCatalogStatusWrite = {
            name,
            website: website || undefined,
            primaryColor: colors.primaryColor || undefined,
            secondaryColor: colors.secondaryColor || undefined,
            tertiaryColor: colors.tertiaryColor || undefined,
            status: scope,
        };
        const res = await manufacturerApi.apiManufacturersPost({
            manufacturerWriteManufacturerCatalogStatusWrite: payload,
        });
        onCreated(res.data);
        onClose();
    };

    return (
        <AddEntityDialog
            icon={<FactoryIcon fontSize="small" />}
            intro={t('manufacturers.add.intro')}
            onClose={onClose}
            onSubmit={handleSubmit}
            open={open}
            submitDisabled={name.trim() === ''}
            submitLabel={t('manufacturers.add.submit')}
            title={t('manufacturers.add.title')}
        >
            <Grid
                container
                spacing={1.75}
            >
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('manufacturers.add.fields.name')}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label={t('manufacturers.add.fields.website')}
                        onChange={(e) => {
                            setWebsite(e.target.value);
                        }}
                        value={website}
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
