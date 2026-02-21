import React from 'react';
import Error from '~/components/tools/Error/Error';

const Error500: React.FunctionComponent = () => {
    return (
        <Error
            detail="Something went wrong on our end. Please try again later."
            metaDescription="Something went wrong on our end. Please try again later."
            pageTitle="Internal Server Error"
            statusCode={500}
            title="Internal Server Error"
        />
    );
};

export default Error500;
