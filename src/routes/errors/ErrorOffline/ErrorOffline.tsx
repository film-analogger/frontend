import React from 'react';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SyncIcon from '@mui/icons-material/Sync';
import SaveIcon from '@mui/icons-material/Save';
import Error from '~/components/tools/Error/Error';

const ErrorOffline: React.FunctionComponent = () => {
    React.useEffect(() => {
        const reloadOnceOnline = () => {
            window.location.reload();
        };
        window.addEventListener('online', reloadOnceOnline);
        return () => {
            window.removeEventListener('online', reloadOnceOnline);
        };
    }, []);

    return (
        <Error
            code="OFF"
            detail="errors.offline.detail"
            icon={<WifiOffIcon />}
            kind="errors.offline.kind"
            metaDescription="errors.offline.metaDescription"
            pageTitle="errors.offline.pageTitle"
            primaryAction={{
                labelKey: 'errors.actions.retryConnection',
                icon: <SyncIcon />,
                onClick: () => {
                    window.location.reload();
                },
            }}
            safety={{ icon: <SaveIcon />, messageKey: 'errors.offline.safety' }}
            statusCode={0}
            stripLabel="errors.offline.stripLabel"
            title="errors.offline.title"
        />
    );
};

export default ErrorOffline;
