import type React from 'react';
import { Navigate } from 'react-router';

const CatchAllRedirect404: React.FunctionComponent = () => (
    <Navigate
        replace
        to="/error/404"
    />
);

export default CatchAllRedirect404;
