import React from 'react';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';
import { type ParseKeys } from 'i18next';
import FilmCanister from './FilmCanister';
import ErrorActionButton from './ErrorActionButton';
import ErrorLinksSection from './ErrorLinksSection';
import ErrorSafetyNotice from './ErrorSafetyNotice';
import { type ErrorAction, type ErrorLink, type ErrorSafety } from './errorTypes';

interface ErrorProps {
    readonly statusCode: number;
    readonly title: ParseKeys;
    readonly detail?: ParseKeys;
    readonly pageTitle: ParseKeys;
    readonly metaDescription?: ParseKeys;
    readonly code?: string;
    readonly kind?: ParseKeys;
    readonly icon?: React.ReactNode;
    readonly stripLabel?: ParseKeys;
    readonly accent?: 'primary' | 'secondary';
    readonly primaryAction?: ErrorAction;
    readonly secondaryAction?: ErrorAction;
    readonly linksLabel?: ParseKeys;
    readonly links?: readonly ErrorLink[];
    readonly safety?: ErrorSafety;
}

const Error: React.FunctionComponent<ErrorProps> = ({
    statusCode,
    title,
    detail,
    pageTitle,
    metaDescription,
    code,
    kind,
    icon,
    stripLabel,
    accent = 'primary',
    primaryAction,
    secondaryAction,
    linksLabel,
    links,
    safety,
}) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const accentColor = theme.palette[accent].main;
    const displayCode = code ?? String(statusCode);
    // Outlined chip text sits directly on the page background, so it needs its
    // own AA-contrast shade rather than the (button-oriented) `main` color:
    // in light mode `main` alone can fall short (e.g. secondary at 4.04:1).
    const kindChipColor =
        theme.palette.mode === 'dark' ? theme.palette[accent].main : theme.palette[accent].dark;

    return (
        <Box data-testid="error-container">
            <title>{t(pageTitle)}</title>
            {metaDescription ? (
                <meta
                    content={t(metaDescription)}
                    name="description"
                />
            ) : null}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{ gap: { xs: 4, md: 5.75 }, alignItems: { xs: 'stretch', md: 'center' } }}
            >
                <FilmCanister
                    accentColor={accentColor}
                    code={displayCode}
                    icon={icon}
                    stripLabel={stripLabel ? t(stripLabel) : undefined}
                />
                <Stack sx={{ flex: 1, minWidth: 0, gap: 2 }}>
                    <Stack sx={{ gap: 1.125 }}>
                        {kind ? (
                            <Chip
                                color={accent}
                                data-testid="error-kind"
                                label={t(kind)}
                                size="small"
                                sx={{
                                    alignSelf: 'flex-start',
                                    fontWeight: 700,
                                    letterSpacing: '0.03em',
                                    textTransform: 'uppercase',
                                    color: kindChipColor,
                                }}
                                variant="outlined"
                            />
                        ) : null}
                        <Typography
                            component="h1"
                            data-testid="error-title"
                            variant="h4"
                        >
                            {t(title)}
                        </Typography>
                        {detail ? (
                            <Typography
                                color="text.secondary"
                                component="p"
                                data-testid="error-detail"
                                variant="body1"
                            >
                                {t(detail)}
                            </Typography>
                        ) : null}
                    </Stack>
                    {primaryAction ? (
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}
                        >
                            <ErrorActionButton
                                action={primaryAction}
                                color={accent}
                                testId="error-primary-action"
                                variant="contained"
                            />
                            {secondaryAction ? (
                                <ErrorActionButton
                                    action={secondaryAction}
                                    color="inherit"
                                    testId="error-secondary-action"
                                    variant="outlined"
                                />
                            ) : null}
                        </Stack>
                    ) : null}
                    {links && links.length > 0 ? (
                        <React.Fragment>
                            <Divider />
                            <ErrorLinksSection
                                label={linksLabel}
                                links={links}
                            />
                        </React.Fragment>
                    ) : null}
                    {safety ? (
                        <ErrorSafetyNotice
                            accentColor={accentColor}
                            safety={safety}
                        />
                    ) : null}
                </Stack>
            </Stack>
        </Box>
    );
};

export default Error;
