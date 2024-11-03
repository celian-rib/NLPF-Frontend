import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import Home from './pages/Home';

library.add(fas);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeWithAuth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

const HomeWithAuth: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            navigate('/login');
        }
    }, [navigate]);

    return <Home />;
};

export default App;
