import React from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorProps {
    readonly statusCode: number;
    readonly title: string;
    readonly detail?: string;
    readonly pageTitle: string;
    readonly metaDescription?: string;
}

const Error: React.FunctionComponent<ErrorProps> = ({
    statusCode,
    title,
    detail,
    pageTitle,
    metaDescription,
}) => {
    return (
        <Box data-testid="error-container">
            <title>{pageTitle}</title>
            {metaDescription ? (
                <meta
                    content={metaDescription}
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
                    {title}
                </Typography>
            </Box>
            {detail ? (
                <Typography
                    data-testid="error-detail"
                    variant="body1"
                >
                    {detail}
                </Typography>
            ) : null}
        </Box>
    );
};

export default Error;
