import React, { useEffect, useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { trafficManagerTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { Tractor } from '../../types/Tractor';
import { getStatusInfo } from '../../utils/utils';
import { sortAndFilterData } from '../../utils/sortingUtils';
import RouteAssign from '../../components/trafficManager/RouteAssign';
import { Route } from '../../types/Route';
import ActionButtons from '../../components/trafficManager/ActionButtons';
import EmptyTable from '../../components/utils/EmptyTable';
import { getRoutesByTrafficManagerId, getTractorsByTrafficManagerId } from '../../services/trafficManager';
import { UserInfo } from '../../types/UserInfo';
import { getAllTraders } from '../../services/auth';
import { useWebSocket } from '../../socket/WebSocketContext';

const TrafficManagerTractors: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [title] = useState('Tractor Management');
    const [subtitle] = useState('Track the status of your tractors in real time.');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [tableData, setTableData] = useState<Tractor[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [traders, setTraders] = useState<UserInfo[]>([]);

    const { simulationDate } = useWebSocket();
    
    // Function to get compatible routes
    const getCompatibleRoutes = (tractor: Tractor): Route[] => {
        let compatibleRoutes: Route[] = [];
        for (let i = 0; i < routes.length; i++)
        {
            const nbCheckpoints: number = routes[i].checkpoint_routes.length;
            const startCheckpointId: string = routes[i].checkpoint_routes[0].id;
            const endCheckpointId: string = routes[i].checkpoint_routes[nbCheckpoints - 1].id;
            if (startCheckpointId === tractor.start_checkpoint.id && endCheckpointId === tractor.end_checkpoint.id)
                compatibleRoutes.push(routes[i]);
        }
        return compatibleRoutes;
    }

    // Fetch routes
    const fetchRoutes = async () => {
        const data = await getRoutesByTrafficManagerId();
        if (!data)
            return;
        setRoutes(data);
    };

    // Fetch tractors
    const fetchTractors = async () => {
        const data = await getTractorsByTrafficManagerId();
        if (!data)
            return;
        setTableData(data);
    };

    // Fetch traders
    const fetchTraders = async () => {
        const data = await getAllTraders();
        if (!data)
            return;
        setTraders(data);
        return data;
    };

    useEffect(() => {
        fetchTractors();
        fetchRoutes();
        fetchTraders();
    }, [simulationDate]);

    // Sort and filter data
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={trafficManagerTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </div>

                {Array.isArray(sortedData) && sortedData.length > 0 ? (
                <>
                <div className="flex justify-between items-center self-end mb-2">
                    <FilterAndSort 
                        selectedStatus={selectedStatus} 
                        setSelectedStatus={setSelectedStatus} 
                        sortOption={sortOption} 
                        setSortOption={setSortOption}
                        sortByName={true}
                        sortByVolume={true}
                        sortByLocation={true}
                    />
                </div>

                <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-center">Name</th>
                                <th className="border p-2 text-center">Status</th>
                                <th className="border p-2 text-center">Loading <span className="font-normal">(in m³)</span></th>
                                <th className="border p-2 text-center">Type</th>
                                <th className="border p-2 text-center">Location</th>
                                <th className="border p-2 text-center">Departure / Arrival</th>
                                <th className="border p-2 text-center">Route</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((tractor, index) => (
                                <tr key={tractor.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>

                                    <td className="border p-2 text-center">{tractor.tractor_name}</td>

                                    <td className="border p-2 text-center">
                                        <span className={`px-2 py-1 rounded ${getStatusInfo(tractor.status).color}`}>
                                            {getStatusInfo(tractor.status).text}
                                        </span>
                                    </td>

                                    <td className="border p-2 text-center">
                                        {tractor.occupied_volume} / {tractor.volume}
                                    </td>

                                    <td className="border p-2 text-center">{tractor.type}</td>

                                    <td className="border p-2 text-center">{tractor.current_checkpoint.checkpoint_name}</td>

                                    <td className="border p-2 text-center">
                                        {tractor.start_checkpoint.checkpoint_name} / {tractor.end_checkpoint.checkpoint_name}
                                    </td>

                                    <RouteAssign 
                                        tractor={tractor}
                                        compatibleRoutes={getCompatibleRoutes(tractor)}
                                        onTableUpdated={fetchTractors}
                                    />

                                    <ActionButtons
                                        item={tractor}
                                        itemType="tractor"
                                        traders={traders}
                                        onTableUpdated={fetchTractors}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
                ) : (
                    <EmptyTable />
                )}
            </main>
        </>
    );
};

export default TrafficManagerTractors;
