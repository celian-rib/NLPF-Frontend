import React, { useState } from 'react';
import InputField from './InputField';
import RoleSelector from './RoleSelector';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { loginUser, signupUser } from '../../services/auth';

interface AuthFormProps {
    isSignup?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup = false }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const roles = [
        { role: 'client', title: 'Client' },
        { role: 'traffic-manager', title: 'Traffic Manager' },
        { role: 'trader', title: 'Trader' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            if (isSignup)
            {
                await signupUser(username, password, role);
                window.location.href = '/login';
            }
            else
            {
                const response = await loginUser(username, password);
                if (response.status === 200)
                {
                    window.location.href = '/';
                }
            }
        } catch (error) {
            setErrorMessage('Incorrect username or password.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">{isSignup ? 'Sign up' : 'Log in'}</h1>
            <form onSubmit={handleSubmit}>
            <InputField type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} icon={faUser} />
            <InputField type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={faLock} />
                {isSignup && <RoleSelector roles={roles} selectedRole={role} onChange={(e) => setRole(e.target.value)} />}
                {errorMessage && <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>}
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
                    {isSignup ? 'Sign up' : 'Login'}
                </button>
                <button type="button" onClick={() => window.location.href = isSignup ? '/login' : '/signup'} className="w-full bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 rounded mt-2">
                    {isSignup ? 'Log in' : 'Sign up'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
