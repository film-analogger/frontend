import React from 'react';
import BuildIcon from '@mui/icons-material/Build';
import RefreshIcon from '@mui/icons-material/Refresh';
import Error from '~/components/tools/Error/Error';

const Error503: React.FunctionComponent = () => {
    return (
        <Error
            detail="errors.503.detail"
            icon={<BuildIcon />}
            kind="errors.503.kind"
            metaDescription="errors.503.metaDescription"
            pageTitle="errors.503.pageTitle"
            primaryAction={{
                labelKey: 'errors.actions.reload',
                icon: <RefreshIcon />,
                onClick: () => {
                    window.location.reload();
                },
            }}
            statusCode={503}
            stripLabel="errors.503.stripLabel"
            title="errors.503.title"
        />
    );
};

export default Error503;
