import React from 'react';
import Error from '~/components/tools/Error/Error';

const Error404: React.FunctionComponent = () => {
    return (
        <Error
            detail="The page you are looking for does not exist."
            metaDescription="The page you are looking for does not exist."
            pageTitle="Not Found"
            statusCode={404}
            title="Not Found"
        />
    );
};

export default Error404;
