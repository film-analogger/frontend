import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useColorScheme, useTheme } from '@mui/material/styles';

const PERFORATIONS = [0, 1, 2, 3, 4, 5];

const FilmCanister: React.FunctionComponent<{
    readonly accentColor: string;
    readonly code: string;
    readonly icon?: React.ReactNode;
    readonly stripLabel?: string;
}> = ({ accentColor, code, icon, stripLabel }) => {
    const theme = useTheme();
    const { colorScheme } = useColorScheme();
    const isLab = colorScheme === 'lab';
    const isLight = colorScheme === 'light';

    const canisterBg = isLight ? theme.palette.text.primary : isLab ? '#0D0000' : '#0B0A08';
    const perfColor = isLab ? 'rgba(255,26,0,0.35)' : 'rgba(242,237,228,0.22)';
    const canisterLine = isLab ? 'rgba(255,26,0,0.45)' : 'rgba(242,237,228,0.14)';
    const stripTextColor = isLab ? theme.palette.text.secondary : 'rgba(242,237,228,0.6)';

    const perforationRow = (
        <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', px: 1, py: 1.1 }}
        >
            {PERFORATIONS.map((n) => (
                <Box
                    key={n}
                    sx={{ width: 11, height: 15, borderRadius: '3px', backgroundColor: perfColor }}
                />
            ))}
        </Stack>
    );

    return (
        <Box
            sx={{
                flex: '0 0 236px',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: canisterBg,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            {perforationRow}
            <Stack
                sx={{
                    alignItems: 'center',
                    gap: 1.5,
                    py: 3.25,
                    px: 2.25,
                    borderTop: '1px solid',
                    borderBottom: '1px solid',
                    borderColor: canisterLine,
                }}
            >
                {icon ? (
                    <Box
                        sx={{
                            display: 'flex',
                            fontSize: 38,
                            color: accentColor,
                            '& svg': { fontSize: 38 },
                        }}
                    >
                        {icon}
                    </Box>
                ) : null}
                <Typography
                    component="strong"
                    data-testid="error-status-code"
                    sx={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '54px',
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: '-2px',
                        color: accentColor,
                    }}
                >
                    {code}
                </Typography>
                {stripLabel ? (
                    <Typography
                        sx={{
                            fontFamily: 'ui-monospace, monospace',
                            fontSize: '10.5px',
                            letterSpacing: '1.4px',
                            textTransform: 'uppercase',
                            color: stripTextColor,
                            textAlign: 'center',
                        }}
                    >
                        {stripLabel}
                    </Typography>
                ) : null}
            </Stack>
            {perforationRow}
        </Box>
    );
};

export default FilmCanister;
