import { Avatar, Box, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentAppUser } from '~/api/useCurrentAppUser';

const Profile: React.FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { error, loaded, user } = useCurrentAppUser();

    const fullName = [user?.givenName, user?.familyName].filter(Boolean).join(' ');
    const displayName = user ? (user.name ?? (fullName || user.username)) : '';

    return (
        <Box>
            <Typography
                sx={{ mb: 2 }}
                variant="h1"
            >
                {t('profile.title')}
            </Typography>
            {error ? (
                <Typography color="error">{t('errors.api.loadingData')}</Typography>
            ) : !loaded || !user ? (
                <CircularProgress
                    enableTrackSlot
                    size="3rem"
                />
            ) : (
                <Card
                    sx={{ maxWidth: 480 }}
                    variant="outlined"
                >
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: 'center', mb: 2 }}
                        >
                            <Avatar
                                src={user.avatarUrl ?? undefined}
                                sx={{ height: 64, width: 64 }}
                            >
                                {!user.avatarUrl ? displayName.charAt(0).toUpperCase() : null}
                            </Avatar>
                            <Box>
                                <Typography variant="h5">{displayName}</Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    @{user.username}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={1.5}>
                            <Box>
                                <Typography
                                    color="text.secondary"
                                    variant="caption"
                                >
                                    {t('profile.email')}
                                </Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Box>
                            {user.website ? (
                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="caption"
                                    >
                                        {t('profile.website')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <Link
                                            href={user.website}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            {user.website}
                                        </Link>
                                    </Typography>
                                </Box>
                            ) : null}
                            {user.description ? (
                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="caption"
                                    >
                                        {t('profile.description')}
                                    </Typography>
                                    <Typography variant="body1">{user.description}</Typography>
                                </Box>
                            ) : null}
                            {user.createdAt ? (
                                <Typography
                                    color="text.secondary"
                                    variant="caption"
                                >
                                    {t('profile.memberSince', {
                                        date: new Date(user.createdAt).toLocaleDateString(
                                            i18n.language,
                                        ),
                                    })}
                                </Typography>
                            ) : null}
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default Profile;
