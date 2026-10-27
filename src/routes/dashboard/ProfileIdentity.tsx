import { Avatar, Box, Stack, Typography } from '@mui/material';
import type React from 'react';

export const ProfileIdentity: React.FunctionComponent<{
    readonly avatarUrl?: string;
    readonly displayName: string;
    readonly username: string;
}> = ({ avatarUrl, displayName, username }) => (
    <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', mb: 2 }}
    >
        <Avatar
            src={avatarUrl}
            sx={{ height: 64, width: 64 }}
        >
            {!avatarUrl ? displayName.charAt(0).toUpperCase() : null}
        </Avatar>
        <Box>
            <Typography variant="h5">{displayName}</Typography>
            <Typography
                color="text.secondary"
                variant="body2"
            >
                @{username}
            </Typography>
        </Box>
    </Stack>
);
