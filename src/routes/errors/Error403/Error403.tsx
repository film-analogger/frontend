import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import BiotechIcon from '@mui/icons-material/Biotech';
import ShieldIcon from '@mui/icons-material/Shield';
import Error from '~/components/tools/Error/Error';
import { useKeycloak } from '~/keycloak/useKeycloak';

const Error403: React.FunctionComponent = () => {
    const { keycloak } = useKeycloak();

    return (
        <Error
            accent="secondary"
            detail="errors.403.detail"
            icon={<LockIcon />}
            kind="errors.403.kind"
            links={[
                {
                    labelKey: 'errors.links.filmsRepository',
                    icon: <CameraRollIcon />,
                    to: '/data/films',
                },
                {
                    labelKey: 'errors.links.chemistriesRepository',
                    icon: <BiotechIcon />,
                    to: '/data/chemistries',
                },
            ]}
            linksLabel="errors.links.publicContent"
            metaDescription="errors.403.metaDescription"
            pageTitle="errors.403.pageTitle"
            primaryAction={{
                labelKey: 'errors.actions.login',
                icon: <LoginIcon />,
                onClick: () => void keycloak.login(),
            }}
            safety={{ icon: <ShieldIcon />, messageKey: 'errors.403.safety' }}
            secondaryAction={{
                labelKey: 'errors.actions.backToLog',
                icon: <ArrowBackIcon />,
                to: '/sessions',
            }}
            statusCode={403}
            stripLabel="errors.403.stripLabel"
            title="errors.403.title"
        />
    );
};

export default Error403;
