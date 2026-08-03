import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import FlagIcon from '@mui/icons-material/Flag';
import Error from '~/components/tools/Error/Error';

const Error500: React.FunctionComponent = () => {
    return (
        <Error
            accent="secondary"
            detail="errors.500.detail"
            icon={<ErrorIcon />}
            kind="errors.500.kind"
            metaDescription="errors.500.metaDescription"
            pageTitle="errors.500.pageTitle"
            primaryAction={{
                labelKey: 'errors.actions.retry',
                icon: <RefreshIcon />,
                onClick: () => {
                    window.location.reload();
                },
            }}
            secondaryAction={{
                labelKey: 'errors.actions.report',
                icon: <FlagIcon />,
                to: '/legal/contact',
            }}
            statusCode={500}
            stripLabel="errors.500.stripLabel"
            title="errors.500.title"
        />
    );
};

export default Error500;
