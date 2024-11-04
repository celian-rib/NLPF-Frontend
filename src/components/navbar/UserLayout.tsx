import React from 'react';

// Types
type UserRole = 'trafficManager' | 'trader' | 'client';

interface UserLayoutProps {
    userRole: UserRole;
    username: string;
}

const UserLayout: React.FC<UserLayoutProps> = ({ userRole, username }) => {
    return (
        <div className="text-center flex-1 bg-yellow-500 fixed top-0 left-0 w-full z-50 py-2">
            <p className="text-lg text-gray-800">
                <span className="font-bold">{username}</span>{' - '}
                {userRole === 'trafficManager' && 'Traffic Manager'}
                {userRole === 'client' && 'Client'}
                {userRole === 'trader' && 'Trader'}
            </p>
        </div>
    );
};

export default UserLayout;
