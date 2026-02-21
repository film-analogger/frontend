import React from 'react';
import Error from '~/components/tools/Error/Error';

const Error403: React.FunctionComponent = () => {
    return (
        <Error
            detail="You don't have permission to access this page."
            metaDescription="You don't have permission to access this page."
            pageTitle="Forbidden"
            statusCode={403}
            title="Forbidden"
        />
    );
};

export default Error403;
