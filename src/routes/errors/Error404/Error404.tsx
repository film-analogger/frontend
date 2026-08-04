import React from 'react';
import { useNavigate } from 'react-router';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import BiotechIcon from '@mui/icons-material/Biotech';
import FactoryIcon from '@mui/icons-material/Factory';
import Error from '~/components/tools/Error/Error';

const Error404: React.FunctionComponent = () => {
    const navigate = useNavigate();

    return (
        <Error
            detail="errors.404.detail"
            icon={<SearchOffIcon />}
            kind="errors.404.kind"
            links={[
                { labelKey: 'errors.links.home', icon: <HomeRoundedIcon />, to: '/' },
                { labelKey: 'errors.links.films', icon: <CameraRollIcon />, to: '/data/films' },
                {
                    labelKey: 'errors.links.chemistries',
                    icon: <BiotechIcon />,
                    to: '/data/chemistries',
                },
                {
                    labelKey: 'errors.links.manufacturers',
                    icon: <FactoryIcon />,
                    to: '/data/manufacturers',
                },
            ]}
            linksLabel="errors.links.tryInstead"
            metaDescription="errors.404.metaDescription"
            pageTitle="errors.404.pageTitle"
            primaryAction={{
                labelKey: 'errors.actions.backToLog',
                icon: <LocalPrintshopIcon />,
                to: '/sessions',
            }}
            secondaryAction={{
                labelKey: 'errors.actions.previousPage',
                icon: <ArrowBackIcon />,
                onClick: () => {
                    void navigate(-1);
                },
            }}
            statusCode={404}
            stripLabel="errors.404.stripLabel"
            title="errors.404.title"
        />
    );
};

export default Error404;
