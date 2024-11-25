export type UserRole = 'trafficManager' | 'trader' | 'client';

// Map roles to permissions
export const rolePermissions: Record<UserRole, string[]> = {
    trafficManager: ['TrafficManager', 'Map'],
    trader: ['Trader', 'StockExchange'],
    client: ['Client', 'StockExchange', 'History', 'Map'],
};

// Function to map roles
export const normalizeUserRole = (role: string): UserRole => {
    switch (role) {
        case 'traffic-manager':
            return 'trafficManager';
        case 'trader':
            return 'trader';
        case 'client':
            return 'client';
        default:
            throw new Error(`Role "${role}" is not recognized`);
    }
};

// Function to check access permissions
export const hasAccess = (userRole: UserRole, tab: string) => 
    rolePermissions[userRole]?.includes(tab);
