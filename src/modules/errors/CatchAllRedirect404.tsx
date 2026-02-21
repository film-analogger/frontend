import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const CatchAllRedirect404 = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const result = navigate('/error/404', { replace: true });
        if (result instanceof Promise) {
            result.catch(() => {
                console.error('Failed to navigate to 404 page');
            });
        }
    }, [navigate]);
    return null;
};

export default CatchAllRedirect404;
