import React from 'react';
import Error from '~/components/tools/Error/Error';

const Error403: React.FunctionComponent = () => {
    return (
        <Error
            detail="errors.403.detail"
            metaDescription="errors.403.metaDescription"
            pageTitle="errors.403.pageTitle"
            statusCode={403}
            title="errors.403.title"
        />
    );
};

export default Error403;
