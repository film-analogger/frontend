import React from 'react';
import Error from '~/components/tools/Error/Error';

const Error404: React.FunctionComponent = () => {
    return (
        <Error
            detail="errors.404.detail"
            metaDescription="errors.404.metaDescription"
            pageTitle="errors.404.pageTitle"
            statusCode={404}
            title="errors.404.title"
        />
    );
};

export default Error404;
