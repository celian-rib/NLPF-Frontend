import React, { useEffect, useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { trafficManagerTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { Tractor } from '../../types/Tractor';
import { getStatusInfo } from '../../utils/utils';
import { sortAndFilterData } from '../../utils/sortingUtils';
import { TractorType } from '../../types/TractorType';
import RouteAssign from '../../components/trafficManager/RouteAssign';
import { Route } from '../../types/Route';
import { Checkpoint } from '../../types/Checkpoint';
import ActionButtons from '../../components/trafficManager/ActionButtons';
import AddToStockExchangeModal from '../../components/stockExchange/modal/AddToStockExchangeModal';
import EmptyTable from '../../components/utils/EmptyTable';
import { getTractorsByTrafficManagerId } from '../../services/trafficManger';

const TrafficManagerTractors: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [title] = useState('Tractor Management');
    const [subtitle] = useState('Track the status of your tractors in real time.');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [tableData, setTableData] = useState<Tractor[]>([]);
    const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);
    const [isStockExchangeModalOpen, setIsStockExchangeModalOpen] = useState<boolean>(false);

    const fakeCheckpoints: Checkpoint[] = [
        { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
        { id: '2', checkpoint_name: 'Checkpoint 2', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
        { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
    ];
    
    // Function to get compatible routes
    const getCompatibleRoutes = (Tractor: Tractor): Route[] => {
        const fakeRoutes: Route[] = [
            {
                route_id: '1',
                route_name: 'Route 1',
                checkpoint_routes: [fakeCheckpoints[0], fakeCheckpoints[1], fakeCheckpoints[2]],
                traffic_manager_id: 'tm_01',
            },
            {
                route_id: '2',
                route_name: 'Route 2',
                checkpoint_routes: [fakeCheckpoints[2], fakeCheckpoints[1]],
                traffic_manager_id: 'tm_02',
            },
            {
                route_id: '3',
                route_name: 'Route 3',
                checkpoint_routes: [fakeCheckpoints[0], fakeCheckpoints[2], fakeCheckpoints[1], fakeCheckpoints[0]],
                traffic_manager_id: 'tm_03',
            },
        ];
        return fakeRoutes;
    }

    // Fetch tractors
    const fetchTractors = async () => {
        const data = await getTractorsByTrafficManagerId();
        if (!data)
            return;
        setTableData(data);
    };

    useEffect(() => {
        fetchTractors();
    }, []);

    // Sort and filter data
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={trafficManagerTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">

                <div className="mb-2">
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
                                    />

                                    <ActionButtons
                                        item={tractor}
                                        itemType="tractor"
                                        setSelectedTractor={setSelectedTractor}
                                        setIsStockExchangeModalOpen={setIsStockExchangeModalOpen}
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

            {isStockExchangeModalOpen && selectedTractor && (
                <AddToStockExchangeModal
                    item={selectedTractor}
                    itemType="tractor"
                    minDate={new Date().toISOString().split("T")[0]}
                    closeModal={() => setIsStockExchangeModalOpen(false)}
                />
            )}
        </>
    );
};

export default TrafficManagerTractors;
