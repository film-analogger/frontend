import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link, type SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { darken } from '@mui/material';

const OpenSource: React.FunctionComponent = () => {
    const { t } = useTranslation();

    const subTextSx: NonNullable<SxProps<Theme>> = React.useCallback(
        (theme: Theme) => ({
            color: darken(theme.palette.text.secondary, 0.2),
            fontWeight: 500,
            fontSize: '0.825rem',
        }),
        [],
    );

    return (
        <Card
            sx={{ m: 1.5, flexShrink: 0 }}
            variant="outlined"
        >
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    {t('components.opensource.title')}
                    <Link
                        aria-label="GitHub Organisation Page"
                        href="https://github.com/film-analogger"
                        rel="noopener noreferrer"
                        sx={{ color: 'text.secondary' }}
                        target="_blank"
                    >
                        <GitHubIcon
                            fontSize="small"
                            sx={{ color: 'text.secondary' }}
                        />
                    </Link>
                </Typography>
                <Typography
                    sx={subTextSx}
                    variant="body2"
                >
                    {t('components.opensource.description')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default OpenSource;
