import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
    children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
    const isAuth = sessionStorage.getItem('alpha_admin_auth') === 'true';

    if (!isAuth) {
        return <Navigate to="/admin-login" replace />;
    }

    return <>{children}</>;
}
