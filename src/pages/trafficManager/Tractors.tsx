import React, { useEffect, useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { trafficManagerTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { Tractor } from '../../types/Tractor';
import { getStatusInfo } from '../../utils/utils';
import { sortAndFilterData } from '../../utils/sortingUtils';
import { TractorType } from '../../types/TractorType';

const TrafficManagerTractors: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [title] = useState('Tractor Management');
    const [subtitle] = useState('Track the status of your tractors in real time.');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [tableData, setTableData] = useState<Tractor[]>([]);
    const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);

    const fakeTractors: Tractor[] = [
        {
            id: '1',
            tractor_name: 'Tractor A',
            status: 'available',
            volume: 100,
            occupied_volume: 50,
            type: TractorType.Bulk,
            route: {
                traffic_manager_id: '1',
                route_name: 'Route 1',
                checkpoint_routes: [
                    { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
                    { id: '2', checkpoint_name: 'Checkpoint 2', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 }
                ],
            },
            min_price: 200,
            current_checkpoint: { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
            start_checkpoint: { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
            end_checkpoint: { id: '2', checkpoint_name: 'Checkpoint 2', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
            traffic_managers: [],
        },
        {
            id: '2',
            tractor_name: 'Tractor B',
            status: 'pending',
            volume: 120,
            occupied_volume: 80,
            type: TractorType.Liquid,
            route: {
                traffic_manager_id: '2',
                route_name: 'Route 2',
                checkpoint_routes: [
                    { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
                    { id: '4', checkpoint_name: 'Checkpoint 4', checkpoint_latitude: 40.7128, checkpoint_longitude: -74.0060 }
                ],
            },
            min_price: 250,
            current_checkpoint: { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
            start_checkpoint: { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
            end_checkpoint: { id: '4', checkpoint_name: 'Checkpoint 4', checkpoint_latitude: 40.7128, checkpoint_longitude: -74.0060 },
            traffic_managers: [
                { id: '2', username: 'traffic_manager_2', role: 'traffic-manager' },
                { id: '3', username: 'traffic_manager_3', role: 'traffic-manager' }
            ],
        },
        {
            id: '3',
            tractor_name: 'Tractor C',
            status: 'in_transit',
            volume: 150,
            occupied_volume: 100,
            type: TractorType.Solid,
            route: {
                traffic_manager_id: '3',
                route_name: 'Route 3',
                checkpoint_routes: [
                    { id: '5', checkpoint_name: 'Checkpoint 5', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
                    { id: '6', checkpoint_name: 'Checkpoint 6', checkpoint_latitude: 35.6895, checkpoint_longitude: 139.6917 }
                ],
            },
            min_price: 300,
            current_checkpoint: { id: '5', checkpoint_name: 'Checkpoint 5', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
            start_checkpoint: { id: '5', checkpoint_name: 'Checkpoint 5', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
            end_checkpoint: { id: '6', checkpoint_name: 'Checkpoint 6', checkpoint_latitude: 35.6895, checkpoint_longitude: 139.6917 },
            traffic_managers: [
                { id: '3', username: 'traffic_manager_3', role: 'traffic-manager' }
            ],
        },
    ];    

    useEffect(() => {
        setTableData(fakeTractors);
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

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default TrafficManagerTractors;
