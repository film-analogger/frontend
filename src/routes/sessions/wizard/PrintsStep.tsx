import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PhotoPaperRead } from '~/api/client';
import { PrintCard } from './PrintCard';
import { createPrint, type WizardPrint } from './types';

export const PrintsStep: React.FunctionComponent<{
    readonly prints: WizardPrint[];
    readonly photoPapers: PhotoPaperRead[];
    readonly onChange: (prints: WizardPrint[]) => void;
}> = ({ prints, photoPapers, onChange }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={2}>
            {prints.map((print, index) => (
                <PrintCard
                    index={index}
                    key={print.key}
                    onChange={(patch) => {
                        onChange(prints.map((p) => (p.key === print.key ? { ...p, ...patch } : p)));
                    }}
                    onRemove={() => {
                        onChange(prints.filter((p) => p.key !== print.key));
                    }}
                    photoPapers={photoPapers}
                    print={print}
                    removable={prints.length > 1}
                />
            ))}
            <Button
                onClick={() => {
                    onChange([...prints, createPrint()]);
                }}
                startIcon={<AddIcon />}
                sx={{ alignSelf: 'flex-start' }}
                variant="outlined"
            >
                {t('sessions.wizard.addPrint')}
            </Button>
        </Stack>
    );
};
