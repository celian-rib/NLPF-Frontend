import React from 'react';
import AuthForm from '../../components/AuthForm';

const Signup: React.FC = () => (
    <main className="flex items-center justify-center h-screen bg-gray-200">
        <AuthForm isSignup={true} />
    </main>
);

export default Signup;
