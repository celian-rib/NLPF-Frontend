import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';
import { getUserInfo } from '../../services/auth';
import { normalizeUserRole, rolePermissions, UserRole } from '../../configs/permissions';
import { useWebSocket } from '../../socket/WebSocketContext';
import { formatDate } from '../../utils/utils';

const Navbar: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [userRole, setUserRole] = useState<UserRole>('client');
    const [username, setUsername] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();
    const { simulationDate, requestNextDate } = useWebSocket();

    // Set the current tab based on the URL path
    useEffect(() => {
        const pathMap: Record<string, string> = {
            '/traffic-manager': 'TrafficManager',
            '/lots': 'Lots',
            '/tractors': 'Tractors',
            '/trader': 'Trader',
            '/stock-exchange': 'StockExchange',
            '/map': 'Map'
        };
        const currentPath = Object.keys(pathMap).find(path => location.pathname.startsWith(path));
        setCurrentTab(currentPath ? pathMap[currentPath] : '');
    }, [location.pathname]);

    // Load user information
    const fetchUserInfo = async () => {
        try {
            const userInfo = await getUserInfo();
            if (!userInfo)
                return logout();
            setUsername(userInfo.username ? userInfo.username : 'Unknown');
            setUserRole(normalizeUserRole(userInfo.role ? userInfo.role : 'Unknown'));
        } catch (error) {
            console.error("Failed to fetch user info", error);
            logout();
        }
    };

    useEffect(() => {
        fetchUserInfo();
    });

    // Check access permissions
    const hasAccess = (tab: string) => rolePermissions[userRole]?.includes(tab);

    // Function to log out
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <UserLayout userRole={userRole} username={username} />

            <nav className="bg-gray-800 p-4 text-white shadow-md fixed top-0 left-0 w-full z-50 mt-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">

                        <Link to="/" className="flex-shrink-0">
                            <img
                                src="/assets/logo.png"
                                alt="Logo"
                                className="h-12 w-auto transition-transform duration-300 hover:scale-105"
                            />
                        </Link>
                        <Link to="/">
                            <span className="ml-3 text-xl font-bold tracking-widest hover:text-blue-400 transition-colors duration-300">
                                LIGNE<span className="text-blue-400">8</span>
                            </span>
                        </Link>

                        <ul className="flex space-x-8 ml-16 text-base">
                            {hasAccess('Lots') && (
                                <li>
                                    <Link
                                        to="/lots"
                                        onClick={() => setCurrentTab('Lots')}
                                        className={currentTab === 'Lots' ? 'font-bold text-blue-400' : 'hover:text-blue-400 transition-colors duration-300'}
                                    >
                                        Lots
                                    </Link>
                                </li>
                            )}
                            {hasAccess('Tractors') && (
                                <li>
                                    <Link
                                        to="/tractors"
                                        onClick={() => setCurrentTab('Tractors')}
                                        className={currentTab === 'Tractors' ? 'font-bold text-blue-400' : 'hover:text-blue-400 transition-colors duration-300'}
                                    >
                                        Tractors
                                    </Link>
                                </li>
                            )}
                            {hasAccess('TrafficManager') && (
                                <li>
                                    <Link
                                        to="/traffic-manager"
                                        onClick={() => setCurrentTab('TrafficManager')}
                                        className={currentTab === 'TrafficManager' ? 'font-bold text-blue-400' : 'hover:text-blue-400 transition-colors duration-300'}
                                    >
                                        Traffic Manager
                                    </Link>
                                </li>
                            )}
                            {hasAccess('Trader') && (
                                <li>
                                    <Link
                                        to="/trader"
                                        onClick={() => setCurrentTab('Trader')}
                                        className={currentTab === 'Trader' ? 'font-bold text-blue-400' : 'hover:text-blue-400 transition-colors duration-300'}
                                    >
                                        Trader
                                    </Link>
                                </li>
                            )}
                            {hasAccess('StockExchange') && (
                                <li>
                                    <Link
                                        to="/stock-exchange"
                                        onClick={() => setCurrentTab('StockExchange')}
                                        className={currentTab === 'StockExchange' ? 'font-bold text-blue-400' : 'hover:text-blue-400 transition-colors duration-300'}
                                    >
                                        Stock Exchange
                                    </Link>
                                </li>
                            )}
                            {hasAccess('Map') && (
                                <li>
                                    <Link
                                        to="/map"
                                        onClick={() => setCurrentTab('Map')}
                                        className={currentTab === 'Map' ? 'font-bold text-blue-400' : 'hover:text-blue-400 transition-colors duration-300'}
                                    >
                                        Map
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                        {simulationDate ? (
                            <div className="text-lg text-white">
                                Simulation date : <span className="font-bold text-blue-400">{formatDate(simulationDate)}</span>
                            </div>
                        ) : (
                            <div className="text-lg font-normal text-red-600">
                                No date found
                            </div>
                        )}

                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 w-10 h-10 flex items-center justify-center"
                            onClick={requestNextDate}
                        >
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>

                        <button
                            onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
