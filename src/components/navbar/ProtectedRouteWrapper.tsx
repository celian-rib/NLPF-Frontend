import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasAccess, UserRole } from '../../configs/permissions';

interface ProtectedRouteWrapperProps {
    userRole: UserRole;
    requiredTab: string;
    children: React.ReactNode;
}

const ProtectedRouteWrapper: React.FC<ProtectedRouteWrapperProps> = ({ userRole, requiredTab, children }) => {
    if (!hasAccess(userRole, requiredTab))
        return <Navigate to="/" replace />;
    return <>{children}</>;
};

export default ProtectedRouteWrapper;
