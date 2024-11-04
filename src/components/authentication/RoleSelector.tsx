import React from 'react';

interface Role {
    role: string;
    title: string;
}

interface RoleSelectorProps {
    roles: Role[];
    selectedRole: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, selectedRole, onChange }) => (
    <div className="mb-6">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <select
            id="role"
            value={selectedRole}
            onChange={onChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
        >
            <option value="" disabled>Select a role</option>
            {roles.map(({ role, title }) => (
                <option key={role} value={role}>{title}</option>
            ))}
        </select>
    </div>
);

export default RoleSelector;
