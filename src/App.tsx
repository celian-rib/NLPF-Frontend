import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import Home from './pages/Home';
import StockExchangePackages from './pages/stockExchange/StockExchangePackages';
import StockExchangeTractors from './pages/stockExchange/StockExchangeTractors';
import TraderPackages from './pages/trader/TraderPackages';
import TraderTractors from './pages/trader/TraderTractors';
import TrafficManagerPackages from './pages/trafficManager/TrafficManagerPackages';
import TrafficManagerRoutes from './pages/trafficManager/TrafficManagerRoutes';
import TrafficManagerTractors from './pages/trafficManager/TrafficMangerTractors';
import { normalizeUserRole, UserRole } from './configs/permissions';
import ProtectedRouteWrapper from './components/navbar/ProtectedRouteWrapper';
import ClientPackages from './pages/client/ClientPackages';
import ClientTractors from './pages/client/ClientTractors';
import Map from './pages/Map';
import './App.css';
import {WebSocketProvider} from "./socket/WebSocketContext";
import HistoryPackages from './pages/history/HistoryPackages';
import HistorTractors from './pages/history/HistoryTractors';

library.add(fas);

function App() {
    return (
        <WebSocketProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomeWithAuth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/client" element={<Navigate to="/client/packages" replace />} />
                <Route path="/trader" element={<Navigate to="/trader/packages" replace />} />
                <Route path="/traffic-manager" element={<Navigate to="/traffic-manager/routes" replace />} />
                <Route path="/history" element={<Navigate to="/history/packages" replace />} />
                <Route path="/stock-exchange" element={<Navigate to="/stock-exchange/packages" replace />} />

                <Route path="/client/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="Client">
                        <Routes>
                            <Route path="packages" element={<ClientPackages />} />
                            <Route path="tractors" element={<ClientTractors />} />
                        </Routes>
                    </ProtectedRouteWrapper>
                } />

                <Route path="/traffic-manager/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="TrafficManager">
                        <Routes>
                            <Route path="routes" element={<TrafficManagerRoutes />} />
                            <Route path="packages" element={<TrafficManagerPackages />} />
                            <Route path="tractors" element={<TrafficManagerTractors />} />
                        </Routes>
                    </ProtectedRouteWrapper>
                } />

                <Route path="/trader/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="Trader">
                        <Routes>
                            <Route path="packages" element={<TraderPackages />} />
                            <Route path="tractors" element={<TraderTractors />} />
                        </Routes>
                    </ProtectedRouteWrapper>
                } />

                <Route path="/stock-exchange/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="StockExchange">
                        <Routes>
                            <Route path="packages" element={<StockExchangePackages />} />
                            <Route path="tractors" element={<StockExchangeTractors />} />
                        </Routes>
                    </ProtectedRouteWrapper>
                } />

                <Route path="/history/*" element={
                    <ProtectedRouteWrapper userRole={getUserRole()} requiredTab="History">
                        <Routes>
                            <Route path="packages" element={<HistoryPackages />} />
                            <Route path="tractors" element={<HistorTractors />} />
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
