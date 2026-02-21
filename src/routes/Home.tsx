import React from 'react';

import { Typography } from '@mui/material';

const Home: React.FunctionComponent = () => {
    return (
        <>
            <title>MyTitle</title>
            <meta
                content="toto"
                name="description"
            />
            <Typography variant="h1">Home</Typography>
        </>
    );
};

export default Home;
