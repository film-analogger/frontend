import React from 'react';

import { Box, Container, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
                position: 'absolute',
                bottom: 0,
                width: '100%',
                py: 1.5,
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
                        {footerEntries.map(({ title, link }) => (
                            <Link
                                color="inherit"
                                fontSize="0.825rem"
                                fontWeight={600}
                                href={link}
                                key={title}
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
