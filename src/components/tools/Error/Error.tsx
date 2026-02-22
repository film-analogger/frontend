import React from 'react';
import { Box, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { type ParseKeys } from 'i18next';

interface ErrorProps {
    readonly statusCode: number;
    readonly title: ParseKeys;
    readonly detail?: ParseKeys;
    readonly pageTitle: ParseKeys;
    readonly metaDescription?: ParseKeys;
}

const Error: React.FunctionComponent<ErrorProps> = ({
    statusCode,
    title,
    detail,
    pageTitle,
    metaDescription,
}) => {
    const { t } = useTranslation();

    return (
        <Box data-testid="error-container">
            <title>{t(pageTitle)}</title>
            {metaDescription ? (
                <meta
                    content={t(metaDescription)}
                    name="description"
                />
            ) : null}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    gap: 3,
                }}
            >
                <Typography
                    data-testid="error-status-code"
                    variant="h1"
                >
                    {statusCode}
                </Typography>
                <Typography
                    data-testid="error-title"
                    variant="h2"
                >
                    {t(title)}
                </Typography>
            </Box>
            {detail ? (
                <Typography
                    data-testid="error-detail"
                    variant="body1"
                >
                    {t(detail)}
                </Typography>
            ) : null}
        </Box>
    );
};

export default Error;
