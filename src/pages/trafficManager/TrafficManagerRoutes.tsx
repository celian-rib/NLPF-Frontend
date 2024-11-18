import React, { useEffect, useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { trafficManagerTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import { Checkpoint } from '../../types/Checkpoint';
import { Route } from '../../types/Route';
import { formatRouteAsString } from '../../utils/utils';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RouteCreate from '../../components/trafficManager/RouteCreate';
import { getAllCheckpoints, getRoutesByTrafficManagerId } from '../../services/trafficManager';

const TrafficManagerRoutes: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [title] = useState<string>('Route management');
    const [subtitle] = useState<string>('Manage available routes and itineraries.');
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [tableData, setTableData] = useState<Route[]>([]);

    // Fetch routes
    const fetchRoutes = async () => {
        const data = await getRoutesByTrafficManagerId();
        if (!data)
            return;
        setTableData(data);
    };

    // Fetch checkpoints
    const fetchCheckpoints = async () => {
        const data = await getAllCheckpoints();
        if (!data)
            return;
        setCheckpoints(data);
    };

    useEffect(() => {
        fetchRoutes();
        fetchCheckpoints();
    }, []);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={trafficManagerTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        
            <main className="p-10 mt-40">
                <section className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </section>

                <div className="flex">

                    {Array.isArray(tableData) && tableData.length > 0 && (
                        <div className="w-2/3 border-r border-gray-300 pr-8 mr-8">
                            <h2 className="text-2xl text-gray-800 font-bold mb-4">
                                <FontAwesomeIcon icon={faList} className="mr-2" />
                                List of routes
                            </h2>
                            <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border p-2 text-center">Name</th>
                                <th className="border p-2 text-center">Steps</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((route, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="border p-2 text-center">{route.route_name}</td>
                                    <td className="border p-2 text-center">{formatRouteAsString(route, false)}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    )}

                    <div className="w-1/3">
                        <RouteCreate
                            checkpoints={checkpoints}
                            onRouteCreated={fetchRoutes}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default TrafficManagerRoutes;
