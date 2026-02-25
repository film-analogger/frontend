import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';

const OpenSource: React.FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <Card
            sx={{ m: 1.5, flexShrink: 0 }}
            variant="outlined"
        >
            <CardContent>
                <AutoAwesomeRoundedIcon fontSize="small" />
                <Typography
                    gutterBottom
                    sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                >
                    {t('components.opensource.title')}
                </Typography>
                <Typography
                    sx={{ mb: 2, color: 'text.secondary', fontWeight: 600, fontSize: '0.875rem' }}
                    variant="body2"
                >
                    {t('components.opensource.description')}
                </Typography>
                <Link
                    aria-label="Github Organisation Page"
                    href="https://github.com/film-analogger"
                    target="_blank"
                >
                    <GitHubIcon
                        fontSize="small"
                        sx={{ mr: 1 }}
                    />
                </Link>
            </CardContent>
        </Card>
    );
};

export default OpenSource;
