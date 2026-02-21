import React from 'react';

import { Outlet } from 'react-router';

const BaseError: React.FunctionComponent = () => {
    return (
        <>
            <title>Error</title>
            <meta
                content="An error occurred"
                name="description"
            />
            <h1>Error</h1>
            <Outlet />
        </>
    );
};

export default BaseError;
