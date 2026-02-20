import React from 'react';

import { Outlet } from 'react-router';

const Dashboard: React.FunctionComponent = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            {/* will either be home.tsx or settings.tsx */}
            <Outlet />
        </div>
    );
};

export default Dashboard;
