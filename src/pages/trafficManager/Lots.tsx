import React, { useState, useEffect } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { trafficManagerTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import { getStatusInfo } from '../../utils/utils';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { Lot } from '../../types/Lot';
import { sortAndFilterData } from '../../utils/sortingUtils';
import { Checkpoint } from '../../types/Checkpoint';
import { UserInfo } from '../../types/UserInfo';
import { LotType } from '../../types/LotType';
import TractorAssign from '../../components/trafficManager/TractorAssign';
import ActionButtons from '../../components/trafficManager/ActionButtons';
import AddToStockExchangeModal from '../../components/stockExchange/modal/AddToStockExchangeModal';
import AssignTractorModal from '../../components/trafficManager/modal/AssignTractorModal';
import { TractorType } from '../../types/TractorType';
import { Tractor } from '../../types/Tractor';

const TrafficManagerLots: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [title] = useState('Lot Management');
    const [subtitle] = useState('Manage lots and assign tractors.');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [tableData, setTableData] = useState<Lot[]>([]);
    const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
    const [isAssignTractorModalOpen, setIsAssignTractorModalOpen] = useState<boolean>(false);
    const [isStockExchangeModalOpen, setIsStockExchangeModalOpen] = useState<boolean>(false);

    const fakeCheckpoints: Checkpoint[] = [
        { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
        { id: '2', checkpoint_name: 'Checkpoint 2', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
        { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
    ];

    const fakeTrafficManagers: UserInfo[] = [
        {
            id: '1',
            username: 'traffic_manager_1',
            role: 'traffic-manager',
        },
        {
            id: '2',
            username: 'traffic_manager_2',
            role: 'traffic-manager',
        },
        {
            id: '3',
            username: 'traffic_manager_3',
            role: 'traffic-manager',
        },
        {
            id: '4',
            username: 'traffic_manager_4',
            role: 'traffic-manager',
        },
        {
            id: '5',
            username: 'traffic_manager_5',
            role: 'traffic-manager',
        },
    ];

    const fakeLots: Lot[] = [
        {
            id: '1',
            lot_name: 'Lot 1',
            status: 'available',
            volume: 1500,
            type: LotType.Bulk,
            max_price: 2500,
            current_checkpoint: fakeCheckpoints[0],
            start_checkpoint: fakeCheckpoints[0],
            end_checkpoint: fakeCheckpoints[1],
            traffic_managers: [fakeTrafficManagers[0], fakeTrafficManagers[2]],
        },
        {
            id: '2',
            lot_name: 'Lot 2',
            status: 'pending',
            volume: 500,
            type: LotType.Liquid,
            max_price: 1200,
            current_checkpoint: fakeCheckpoints[1],
            start_checkpoint: fakeCheckpoints[0],
            end_checkpoint: fakeCheckpoints[2],
            traffic_managers: [],
        },
        {
            id: '3',
            lot_name: 'Lot 3',
            status: 'in_transit',
            volume: 1000,
            type: LotType.Solid,
            max_price: 1800,
            current_checkpoint: fakeCheckpoints[2],
            start_checkpoint: fakeCheckpoints[1],
            end_checkpoint: fakeCheckpoints[0],
            traffic_managers: [fakeTrafficManagers[1], fakeTrafficManagers[2], fakeTrafficManagers[3]],
        },
        {
            id: '4',
            lot_name: 'Lot 4',
            status: 'on_market',
            volume: 2000,
            type: LotType.Bulk,
            max_price: 3000,
            current_checkpoint: fakeCheckpoints[0],
            start_checkpoint: fakeCheckpoints[1],
            end_checkpoint: fakeCheckpoints[2],
            traffic_managers: [fakeTrafficManagers[3]],
        },
        {
            id: '5',
            lot_name: 'Lot 5',
            status: 'archived',
            volume: 750,
            type: LotType.Liquid,
            max_price: 1500,
            current_checkpoint: fakeCheckpoints[1],
            start_checkpoint: fakeCheckpoints[2],
            end_checkpoint: fakeCheckpoints[0],
            traffic_managers: [],
        },
    ];

    useEffect(() => {
        setTableData(fakeLots);
    }, []);

    // Function to get compatible tractors
    const getCompatibleTractors = (lot: Lot): Tractor[] => {    
        const fakeTractors: Tractor[] = [
            {
                id: '1',
                tractor_name: 'Tractor A',
                status: 'available',
                volume: 100,
                occupied_volume: 50,
                type: TractorType.Bulk,
                route: {
                    route_id: '1',
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
                    route_id: '3',
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
                    route_id: '2',
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
        return fakeTractors;   
    }

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
                                <th className="border p-2 text-center">Volume <span className="font-normal">(in m³)</span></th>
                                <th className="border p-2 text-center">Type</th>
                                <th className="border p-2 text-center">Location</th>
                                <th className="border p-2 text-center">Departure / Arrival</th>
                                <th className="border p-2 text-center">Tractor</th>
                                <th className="border p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((lot, index) => (
                                <tr key={lot.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>

                                    <td className="border p-2 text-center">{lot.lot_name}</td>

                                    <td className="border p-2 text-center">
                                        <span className={`px-2 py-1 rounded ${getStatusInfo(lot.status).color}`}>
                                            {getStatusInfo(lot.status).text}
                                        </span>
                                    </td>

                                    <td className="border p-2 text-center">{lot.volume}</td>

                                    <td className="border p-2 text-center">{lot.type}</td>

                                    <td className="border p-2 text-center">{lot.current_checkpoint.checkpoint_name}</td>

                                    <td className="border p-2 text-center">
                                        {lot.start_checkpoint.checkpoint_name} / {lot.end_checkpoint.checkpoint_name}
                                    </td>

                                    <TractorAssign
                                        lot={lot}
                                        setSelectedLot={setSelectedLot}
                                        setIsAssignTractorModalOpen={setIsAssignTractorModalOpen}
                                    />

                                    <ActionButtons
                                        item={lot}
                                        itemType="lot"
                                        setSelectedLot={setSelectedLot}
                                        setIsStockExchangeModalOpen={setIsStockExchangeModalOpen}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {isAssignTractorModalOpen && selectedLot && (
                <AssignTractorModal
                    lotId={selectedLot.id}
                    compatibleTractors={getCompatibleTractors(selectedLot)}
                    closeModal={() => setIsAssignTractorModalOpen(false)}
                />
            )}

            {isStockExchangeModalOpen && selectedLot && (
                <AddToStockExchangeModal
                    item={selectedLot}
                    itemType="lot"
                    minDate={new Date().toISOString().split("T")[0]}
                    closeModal={() => setIsStockExchangeModalOpen(false)}
                />
            )}
        </>
    );
};

export default TrafficManagerLots;
