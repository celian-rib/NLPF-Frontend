import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { getStatusInfo } from '../utils/utils';
import FilterAndSort from '../components/utils/FilterAndSort';
import { Checkpoint } from '../types/Checkpoint';
import { Lot } from '../types/Lot';
import { LotType } from '../types/LotType';
import { UserInfo } from '../types/UserInfo';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortAndFilterData } from '../utils/sortingUtils';
import TrafficManagerSelect from '../components/client/TrafficManagerSelect';
import ActionButtons from '../components/client/ActionButtons';
import AddToStockExchangeModal from '../components/client/modal/AddToStockExchangeModal';
import AddItemModal from '../components/client/modal/AddItemModal';

const Lots: React.FC = () => {
    const [title] = useState<string>('Lot management');
    const [subtitle] = useState<string>('Track the status of your lots in real time.');
    const [tableData, setTableData] = useState<Lot[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
    const [isAddLotModalOpen, setIsAddLotModalOpen] = useState<boolean>(false);
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

    // Sort and filter data
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
                            onClick={() => setIsAddLotModalOpen(true)}
                            className="bg-blue-500 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors self-end"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add a lot
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
                            {sortedData.map(lot => (
                                <tr key={lot.id} className="hover:bg-gray-100">

                                    <td className="border text-center p-2">{lot.lot_name}</td>

                                    <td className={`border text-center p-2`}>
                                        <span className={`px-2 py-1 rounded ${getStatusInfo(lot.status).color}`}>
                                            {getStatusInfo(lot.status).text}
                                        </span>
                                    </td>

                                    <td className="border text-center p-2">{lot.volume}</td>

                                    <td className="border text-center p-2">{lot.current_checkpoint.checkpoint_name}</td>

                                    <td className="border text-center p-2">{lot.start_checkpoint.checkpoint_name} / {lot.end_checkpoint.checkpoint_name}</td>

                                    <TrafficManagerSelect trafficManagers={lot.traffic_managers} />

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

            {isAddLotModalOpen && (
                <AddItemModal
                    closeModal={() => setIsAddLotModalOpen(false)}
                    types={Object.values(LotType)}
                    checkpoints={fakeCheckpoints}
                    itemType="lot"
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

export default Lots;
