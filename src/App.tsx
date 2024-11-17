import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import Home from './pages/Home';
import StockExchangeLots from './pages/stockExchange/StockExchangeLots';
import StockExchangeTractors from './pages/stockExchange/StockExchangeTractors';
import TraderLots from './pages/trader/TraderLots';
import TraderTractors from './pages/trader/TraderTractors';
import TrafficManagerLots from './pages/trafficManager/TrafficManagerLots';
import TrafficManagerRoutes from './pages/trafficManager/TrafficManagerRoutes';
import TrafficManagerTractors from './pages/trafficManager/TrafficMangerTractors';
import { normalizeUserRole, UserRole } from './configs/permissions';
import ProtectedRouteWrapper from './components/navbar/ProtectedRouteWrapper';
import Lots from './pages/Lots';
import Tractors from './pages/Tractors';
import Map from './pages/Map';
import './App.css';
import {WebSocketProvider} from "./socket/WebSocketContext";

library.add(fas);

function App() {
    return (
        <WebSocketProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomeWithAuth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/lots" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="Lots">
                        <Lots />
                    </ProtectedRouteWrapper>
                } />
                <Route path="/tractors" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="Tractors">
                        <Tractors />
                    </ProtectedRouteWrapper>
                } />

                <Route path="/stock-exchange" element={<Navigate to="/stock-exchange/lots" replace />} />
                <Route path="/trader" element={<Navigate to="/trader/lots" replace />} />
                <Route path="/traffic-manager" element={<Navigate to="/traffic-manager/routes" replace />} />

                <Route path="/stock-exchange/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="StockExchange">
                        <Routes>
                            <Route path="lots" element={<StockExchangeLots />} />
                            <Route path="tractors" element={<StockExchangeTractors />} />
                        </Routes>
                    </ProtectedRouteWrapper>
                } />

                <Route path="/traffic-manager/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="TrafficManager">
                        <Routes>
                            <Route path="routes" element={<TrafficManagerRoutes />} />
                            <Route path="lots" element={<TrafficManagerLots />} />
                            <Route path="tractors" element={<TrafficManagerTractors />} />
                        </Routes>
                    </ProtectedRouteWrapper>
                } />

                <Route path="/trader/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="Trader">
                        <Routes>
                            <Route path="lots" element={<TraderLots />} />
                            <Route path="tractors" element={<TraderTractors />} />
                        </Routes>
                    </ProtectedRouteWrapper>
                } />

                <Route path="/map" element={<Map />} />

            </Routes>
        </Router>
        </WebSocketProvider>
    );
}

// Home component with authentication
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

// Get the user role from local storage
const getUserRole = (): UserRole => {
    const role: string | null = localStorage.getItem('user_role');
    if (!role)
        return '' as UserRole;
    return normalizeUserRole(role);
}

export default App;
