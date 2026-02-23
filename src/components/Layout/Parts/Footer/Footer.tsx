import React from 'react';

import { Box, Container, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                py: 3,
                mt: 'auto',
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {t('components.footer.copyright', { year: currentYear })}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Link
                            color="inherit"
                            href="#"
                            underline="none"
                            variant="caption"
                        >
                            {t('components.footer.privacy')}
                        </Link>
                        <Link
                            color="inherit"
                            href="#"
                            underline="none"
                            variant="caption"
                        >
                            {t('components.footer.terms')}
                        </Link>
                        <Link
                            color="inherit"
                            href="#"
                            underline="none"
                            variant="caption"
                        >
                            {t('components.footer.contact')}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
