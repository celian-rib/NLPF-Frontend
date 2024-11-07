import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { getStatusInfo } from '../utils/utils';
import FilterAndSort from '../components/utils/FilterAndSort';
import { TractorType } from '../types/TractorType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tractor } from '../types/Tractor';
import { sortAndFilterData } from '../utils/sortingUtils';
import TrafficManagerSelect from '../components/client/TrafficManagerSelect';
import ActionButtons from '../components/client/ActionButtons';
import AddToStockExchangeModal from '../components/stockExchange/modal/AddToStockExchangeModal';
import { Checkpoint } from '../types/Checkpoint';
import AddItemModal from '../components/client/modal/AddItemModal';

const Tractors: React.FC = () => {
    const [title] = useState<string>('Tractor management');
    const [subtitle] = useState<string>('Track the status of your tractors in real time.');
    const [tableData, setTableData] = useState<Tractor[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);
    const [isAddTractorModalOpen, setIsAddTractorModalOpen] = useState<boolean>(false);
    const [isStockExchangeModalOpen, setIsStockExchangeModalOpen] = useState<boolean>(false);


    const fakeCheckpoints: Checkpoint[] = [
        { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
        { id: '2', checkpoint_name: 'Checkpoint 2', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
        { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
    ];

    const fakeTractors: Tractor[] = [
        {
            id: '1',
            tractor_name: 'Tractor A',
            status: 'available',
            volume: 100,
            occupied_volume: 50,
            type: TractorType.Bulk,
            route: {
                route_id: '3',
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
                route_id: '2',
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
                route_id: '1',
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

    // Use the sorting utility function
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />

            <main className="p-10 pt-40">
                <div className="mb-2">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
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
                    <div className="flex justify-between items-center self-end">
                        <button
                            onClick={() => setIsAddTractorModalOpen(true)}
                            className="bg-blue-500 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors self-end"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add a tractor
                        </button>
                    </div>
                </div>

                <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-center">Name</th>
                                <th className="border p-2 text-center">Status</th>
                                <th className="border p-2 text-center">Volume <span className="font-normal">(in m³)</span></th>
                                <th className="border p-2 text-center">Location</th>
                                <th className="border p-2 text-center">Departure / Arrival</th>
                                <th className="border p-2 text-center">Traffic manager</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map(tractor => (
                                <tr key={tractor.id} className="hover:bg-gray-100">

                                    <td className="border text-center p-2">{tractor.tractor_name}</td>

                                    <td className={`border text-center p-2`}>
                                        <span className={`px-2 py-1 rounded ${getStatusInfo(tractor.status).color}`}>
                                            {getStatusInfo(tractor.status).text}
                                        </span>
                                    </td>

                                    <td className="border text-center p-2">{tractor.volume}</td>

                                    <td className="border text-center p-2">{tractor.current_checkpoint.checkpoint_name}</td>

                                    <td className="border text-center p-2">{tractor.start_checkpoint.checkpoint_name} / {tractor.end_checkpoint.checkpoint_name}</td>

                                    <TrafficManagerSelect trafficManagers={tractor.traffic_managers} />

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
            </main>

            {isAddTractorModalOpen && (
                <AddItemModal
                    closeModal={() => setIsAddTractorModalOpen(false)}
                    types={Object.values(TractorType)}
                    checkpoints={fakeCheckpoints}
                    itemType="tractor"
                />
            )}

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

export default Tractors;
