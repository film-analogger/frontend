import React from 'react';

import { Box, Container, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { drawerWidth, footerHeight } from '~/Theme/Constants/layout';

const Footer: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const footerEntries = [
        { title: 'components.footer.privacy', link: '/legal/privacy' },
        { title: 'components.footer.terms', link: '/legal/terms' },
        { title: 'components.footer.cookies', link: '/legal/cookies' },
        { title: 'components.footer.legals', link: '/legal/legals' },
        { title: 'components.footer.contact', link: '/legal/contact' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                height: footerHeight,
                position: 'absolute',
                bottom: 0,
                width: '100%',
                paddingY: 1.5,
                marginTop: 'auto',
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                paddingLeft: { xs: 2, md: drawerWidth },
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
                    <Box>
                        <Typography
                            color="text.secondary"
                            sx={{ fontWeight: 600 }}
                            variant="body1"
                        >
                            {t('components.footer.copyright', { year: currentYear })}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{ fontWeight: 600 }}
                            variant="caption"
                        >
                            {t('components.footer.subtitle')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {footerEntries.map(({ title, link }) => (
                            <Link
                                color="inherit"
                                href={link}
                                key={title}
                                sx={{ fontSize: '0.825rem', fontWeight: 600 }}
                                underline="none"
                                variant="caption"
                            >
                                {t(title)}
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
