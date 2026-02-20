import React from 'react';

import { Welcome } from '../welcome/Welcome';

const Home: React.FunctionComponent = () => {
    return (
        <>
            <title>MyTitle</title>
            <meta
                content="toto"
                name="description"
            />
            <h1>Home</h1>
            <Welcome />
        </>
    );
};

export default Home;
