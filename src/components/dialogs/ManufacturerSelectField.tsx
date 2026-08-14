import { MenuItem, Stack } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ManufacturerRead } from '~/api/client';
import { AddManufacturerDialog } from './AddManufacturerDialog';
import { DialogTextField } from './DialogTextField';
import { InlineAddButton } from './InlineAddButton';

export const ManufacturerSelectField: React.FunctionComponent<{
    readonly manufacturers: ManufacturerRead[];
    readonly value: string;
    readonly onChange: (manufacturerId: string) => void;
    readonly onManufacturerCreated: (manufacturer: ManufacturerRead) => void;
}> = ({ manufacturers, value, onChange, onManufacturerCreated }) => {
    const { t } = useTranslation();
    const [addOpen, setAddOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'flex-end' }}
            >
                <DialogTextField
                    label={t('dialogs.manufacturer.label')}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    select
                    value={value}
                >
                    {manufacturers.map((manufacturer) => (
                        <MenuItem
                            key={manufacturer['@id']}
                            value={manufacturer.id}
                        >
                            {manufacturer.name}
                        </MenuItem>
                    ))}
                </DialogTextField>
                <InlineAddButton
                    ariaLabel={t('dialogs.manufacturer.add')}
                    onClick={() => {
                        setAddOpen(true);
                    }}
                />
            </Stack>
            <AddManufacturerDialog
                onClose={() => {
                    setAddOpen(false);
                }}
                onCreated={(manufacturer) => {
                    onManufacturerCreated(manufacturer);
                    onChange(manufacturer.id ?? '');
                }}
                open={addOpen}
            />
        </React.Fragment>
    );
};
