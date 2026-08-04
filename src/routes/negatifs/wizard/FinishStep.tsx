import { Chip, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TagRead } from '~/api/client';
import type { WizardState } from './types';

export const FinishStep: React.FunctionComponent<{
    readonly state: WizardState;
    readonly tags: TagRead[];
    readonly onChange: (patch: Partial<WizardState>) => void;
}> = ({ state, tags, onChange }) => {
    const { t } = useTranslation();

    const toggleTag = (tagId: string) => {
        onChange({
            tagIds: state.tagIds.includes(tagId)
                ? state.tagIds.filter((id) => id !== tagId)
                : [...state.tagIds, tagId],
        });
    };

    return (
        <Stack spacing={3}>
            <Stack spacing={1}>
                <Typography sx={{ fontWeight: 600 }}>
                    {t('negatifs.wizard.fields.rating')}
                </Typography>
                <Rating
                    onChange={(_e, value) => {
                        onChange({ rating: value ?? 0 });
                    }}
                    size="large"
                    value={state.rating}
                />
            </Stack>
            <Stack spacing={1}>
                <Typography sx={{ fontWeight: 600 }}>{t('negatifs.wizard.fields.tags')}</Typography>
                {tags.length === 0 ? (
                    <Typography color="text.secondary">{t('negatifs.wizard.noTags')}</Typography>
                ) : (
                    <Stack
                        direction="row"
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                        {tags.map((tag) => {
                            const selected = state.tagIds.includes(tag.id ?? '');
                            return (
                                <Chip
                                    color={selected ? 'primary' : 'default'}
                                    key={tag.id}
                                    label={tag.name}
                                    onClick={() => {
                                        toggleTag(tag.id ?? '');
                                    }}
                                    variant={selected ? 'filled' : 'outlined'}
                                />
                            );
                        })}
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};
