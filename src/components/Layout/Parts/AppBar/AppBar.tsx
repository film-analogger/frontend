import React from 'react';

import { AppBar as MuiAppBar, Box, Toolbar } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import ColorModeIconDropdown from '~/Theme/ColorModeIconDropdown';

const AppBar: React.FunctionComponent = () => {
    const { mode, systemMode } = useColorScheme();
    const resolvedMode = mode === 'system' ? systemMode : mode;
    const isDarkMode = resolvedMode === 'dark';

    return (
        <MuiAppBar
            color="transparent"
            elevation={0}
            position="static"
            sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        >
            <Toolbar sx={{ gap: 1.5 }}>
                <Box
                    component={RouterLink}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1.5,
                        textDecoration: 'none',
                        color: 'text.primary',
                        flexGrow: 1,
                    }}
                    to="/"
                >
                    {/* Small logo — xs/sm only */}
                    <Box
                        sx={{
                            position: 'relative',
                            width: 40,
                            height: 40,
                            display: { xs: 'inline-flex', md: 'none' },
                        }}
                    >
                        <Box
                            alt="Film Analogger logo light"
                            component="img"
                            src="/logolight.svg"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: 40,
                                height: 40,
                                opacity: isDarkMode ? 0 : 1,
                                transition: 'opacity 400ms ease',
                            }}
                        />
                        <Box
                            alt="Film Analogger logo dark"
                            component="img"
                            src="/logodark.svg"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: 40,
                                height: 40,
                                opacity: isDarkMode ? 1 : 0,
                                transition: 'opacity 400ms ease',
                            }}
                        />
                    </Box>

                    {/* Full logo — md+ only */}
                    <Box
                        sx={{
                            position: 'relative',
                            height: 40,
                            width: 'auto',
                            display: { xs: 'none', md: 'inline-flex' },
                        }}
                    >
                        <Box
                            alt="Film Analogger full logo light"
                            component="img"
                            src="/logolight-inline.svg"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                height: 40,
                                width: 'auto',
                                opacity: isDarkMode ? 0 : 1,
                                transition: 'opacity 400ms ease',
                            }}
                        />
                        <Box
                            alt="Film Analogger full logo dark"
                            component="img"
                            src="/logodark-inline.svg"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                height: 40,
                                width: 'auto',
                                opacity: isDarkMode ? 1 : 0,
                                transition: 'opacity 400ms ease',
                            }}
                        />
                    </Box>
                </Box>
                <Box>
                    <ColorModeIconDropdown />
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
