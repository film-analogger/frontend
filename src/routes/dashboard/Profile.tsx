import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentAppUser } from '~/api/useCurrentAppUser';
import type { RouteCrumbHandle } from '~/components/Layout/Parts/AppBar/AppBar';
import ColorModeSelect from '~/Theme/ColorModeSelect';
import { ProfileIdentity } from './ProfileIdentity';
import { ProfileInfoRow } from './ProfileInfoRow';

export const handle: RouteCrumbHandle = {
    crumb: { section: 'app.account', title: 'profile.title' },
};

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
                    aria-label={t('app.loading')}
                    enableTrackSlot
                    size="3rem"
                />
            ) : (
                <Grid
                    container
                    spacing={2}
                >
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <ProfileIdentity
                                    avatarUrl={user.avatarUrl ?? undefined}
                                    displayName={displayName}
                                    username={user.username}
                                />
                                <Stack spacing={1.5}>
                                    <ProfileInfoRow
                                        label={t('profile.email')}
                                        value={user.email}
                                    />
                                    {user.website ? (
                                        <ProfileInfoRow
                                            href={user.website}
                                            label={t('profile.website')}
                                            value={user.website}
                                        />
                                    ) : null}
                                    {user.description ? (
                                        <ProfileInfoRow
                                            label={t('profile.description')}
                                            value={user.description}
                                        />
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
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography
                                    sx={{ mb: 2, fontWeight: 600 }}
                                    variant="subtitle1"
                                >
                                    {t('profile.appearance')}
                                </Typography>
                                <ColorModeSelect fullWidth />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Profile;
