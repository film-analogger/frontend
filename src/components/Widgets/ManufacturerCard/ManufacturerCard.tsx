import LinkIcon from '@mui/icons-material/Link';
import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { type ManufacturerRead } from '~/api/client';
import { getProcessStyle, type Process } from '~/domain/processColors';

export const ManufacturerCard: React.FunctionComponent<{
    readonly chemistriesCount: number;
    readonly filmsCount: number;
    readonly manufacturer: Pick<
        ManufacturerRead,
        'id' | 'name' | 'primaryColor' | 'secondaryColor' | 'tertiaryColor' | 'website'
    >;
    readonly processes: Process[];
}> = ({ chemistriesCount, filmsCount, manufacturer, processes }) => {
    const { t } = useTranslation();

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                    boxShadow: (theme) => theme.shadows[4],
                    transform: 'translateY(-3px)',
                },
            }}
            variant="outlined"
        >
            <Box sx={{ display: 'flex', height: '64px' }}>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: manufacturer.primaryColor ?? undefined,
                        color: manufacturer.secondaryColor ?? undefined,
                        display: 'flex',
                        flex: 1,
                        fontSize: '19px',
                        fontWeight: 700,
                        paddingLeft: '16px',
                    }}
                >
                    {manufacturer.name}
                </Box>
                {manufacturer.secondaryColor ? (
                    <Box
                        sx={{
                            backgroundColor: manufacturer.secondaryColor,
                            flex: '0 0 22px',
                        }}
                    />
                ) : null}
                {manufacturer.tertiaryColor ? (
                    <Box
                        sx={{
                            backgroundColor: manufacturer.tertiaryColor,
                            flex: '0 0 22px',
                        }}
                    />
                ) : null}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '14px 16px',
                }}
            >
                <Box sx={{ alignItems: 'center', display: 'flex', gap: '18px' }}>
                    <Box>
                        <Typography
                            sx={{ fontSize: '19px', fontWeight: 700 }}
                            variant="h6"
                        >
                            {filmsCount}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{ fontSize: '11px', textTransform: 'uppercase' }}
                            variant="caption"
                        >
                            {t('manufacturers.list.films')}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{ fontSize: '19px', fontWeight: 700 }}
                            variant="h6"
                        >
                            {chemistriesCount}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{ fontSize: '11px', textTransform: 'uppercase' }}
                            variant="caption"
                        >
                            {t('manufacturers.list.chemistries')}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }} />
                    {processes.length > 0 ? (
                        <Stack
                            direction="row"
                            sx={{
                                flexWrap: 'wrap',
                                gap: '4px',
                                justifyContent: 'flex-end',
                                maxWidth: '110px',
                            }}
                        >
                            {processes.map((process) => (
                                <Box
                                    key={process}
                                    sx={{
                                        backgroundColor: getProcessStyle(process).color,
                                        borderRadius: '6px',
                                        color: getProcessStyle(process).fg,
                                        fontSize: '10.5px',
                                        fontWeight: 700,
                                        padding: '2px 7px',
                                    }}
                                >
                                    {process}
                                </Box>
                            ))}
                        </Stack>
                    ) : null}
                </Box>
                {manufacturer.website ? (
                    <Box
                        sx={{
                            alignItems: 'center',
                            color: 'text.secondary',
                            display: 'flex',
                            fontSize: '12px',
                            gap: '6px',
                        }}
                    >
                        <LinkIcon sx={{ fontSize: '14px' }} />
                        {manufacturer.website}
                    </Box>
                ) : null}
            </Box>
        </Paper>
    );
};
