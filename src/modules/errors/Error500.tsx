import React from 'react';
import Error from '~/components/tools/Error/Error';

const Error500: React.FunctionComponent = () => {
    return (
        <Error
            detail="errors.500.detail"
            metaDescription="errors.500.metaDescription"
            pageTitle="errors.500.pageTitle"
            statusCode={500}
            title="errors.500.title"
        />
    );
};

export default Error500;
