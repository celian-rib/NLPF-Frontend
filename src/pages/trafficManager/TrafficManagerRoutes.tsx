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

const TrafficManagerRoutes: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [title] = useState<string>('Route management');
    const [subtitle] = useState<string>('Manage available routes and itineraries.');
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [tableData, setTableData] = useState<Route[]>([]);


    const fakeCheckpoints: Checkpoint[] = [
        { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
        { id: '2', checkpoint_name: 'Checkpoint 2', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
        { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
        { id: '4', checkpoint_name: 'Checkpoint 4', checkpoint_latitude: 48.5845, checkpoint_longitude: -35.1278 },
        { id: '5', checkpoint_name: 'Checkpoint 5', checkpoint_latitude: 44.9612, checkpoint_longitude: 18.1524 },
    ];

    useEffect(() => {
        setCheckpoints(fakeCheckpoints);
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
                    <div className="w-2/3 pr-8 border-r border-gray-300">
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

                    <div className="w-1/3 pl-8">
                        <RouteCreate
                            checkpoints={checkpoints}
                            tableData={tableData}
                            setTableData={setTableData}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default TrafficManagerRoutes;
