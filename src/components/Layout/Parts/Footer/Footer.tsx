import React from 'react';

import { Box, Container, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { drawerWidth } from '~/Theme/Constants/layout';

const Footer: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const footerEntires = [
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
                position: 'absolute',
                bottom: 0,
                width: '100%',
                py: 1.5,
                mt: 'auto',
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                paddingLeft: drawerWidth,
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
                            fontWeight={600}
                            variant="body1"
                        >
                            {t('components.footer.copyright', { year: currentYear })}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            fontWeight={600}
                            variant="caption"
                        >
                            {t('components.footer.subtitle')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {footerEntires.map(({ title, link }) => (
                            <React.Fragment key={title}>
                                <Link
                                    color="inherit"
                                    fontSize="0.825rem"
                                    fontWeight={600}
                                    href={link}
                                    underline="none"
                                    variant="caption"
                                >
                                    {t(title)}
                                </Link>
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
