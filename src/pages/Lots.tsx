import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { getStatusInfo } from '../utils/utils';
import FilterAndSort from '../components/utils/FilterAndSort';
import { Checkpoint } from '../types/Checkpoint';
import { Lot } from '../types/Lot';
import { LotType } from '../types/LotType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortAndFilterData } from '../utils/sortingUtils';
import TrafficManagerSelect from '../components/client/TrafficManagerSelect';
import ActionButtons from '../components/client/ActionButtons';
import AddToStockExchangeModal from '../components/stockExchange/modal/AddToStockExchangeModal';
import AddItemModal from '../components/client/modal/AddItemModal';
import { getAllCheckpoints, getTrafficManagerByLotId } from '../services/trafficManager';
import { getLotsByClientId } from '../services/assets';
import { getAllTrafficManagers } from '../services/auth';
import { UserInfo } from '../types/UserInfo';

const Lots: React.FC = () => {
    const [title] = useState<string>('Lot management');
    const [subtitle] = useState<string>('Track the status of your lots in real time.');
    const [tableData, setTableData] = useState<Lot[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
    const [isAddLotModalOpen, setIsAddLotModalOpen] = useState<boolean>(false);
    const [isStockExchangeModalOpen, setIsStockExchangeModalOpen] = useState<boolean>(false);
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [trafficManagers, setTrafficManagers] = useState<UserInfo[]>([]);

    // Fetch traffic managers of lots
    const fetchTrafficManagersOfLots = async (lots: Lot[]): Promise<Lot[]> => {
        for (let i = 0; i < lots.length; i++)
            lots[i].traffic_manager = await getTrafficManagerByLotId(lots[i].id);
        return lots;
    };

    // Fetch lots
    const fetchLots = async () => {
        const data = await getLotsByClientId();
        if (!data)
            return;
        const updatedData = await fetchTrafficManagersOfLots(data);
        setTableData(updatedData);
    };

    // Fetch checkpoints
    const fetchCheckpoints = async () => {
        const data = await getAllCheckpoints();
        if (!data)
            return;
        setCheckpoints(data);
    };

    // Fetch traffic managers
    const fetchTrafficManagers = async () => {
        const data = await getAllTrafficManagers();
        if (!data)
            return;
        setTrafficManagers(data);
        return data;
    };

    useEffect(() => {
        fetchLots();
        fetchCheckpoints();
        fetchTrafficManagers();
        // eslint-disable-next-line
    }, []);

    // Function to close modals
    const closeModal = async () => {
        await fetchLots();
        setIsAddLotModalOpen(false);
        setIsStockExchangeModalOpen(false);
    };

    // Sort and filter data
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />

            <main className="p-10 pt-40">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </div>

                <div className="flex justify-between items-center self-end mb-2">
                    {Array.isArray(sortedData) && sortedData.length > 0 && (
                        <FilterAndSort 
                            selectedStatus={selectedStatus} 
                            setSelectedStatus={setSelectedStatus} 
                            sortOption={sortOption} 
                            setSortOption={setSortOption}
                            sortByName={true}
                            sortByVolume={true}
                            sortByLocation={true}
                        />
                    )}
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

                {Array.isArray(sortedData) && sortedData.length > 0 && (
                <>
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

                                    <TrafficManagerSelect 
                                        item={lot}
                                        trafficManagers={trafficManagers}
                                    />

                                    <ActionButtons
                                        item={lot}
                                        itemType="lot"
                                        setSelectedLot={setSelectedLot}
                                        setIsStockExchangeModalOpen={setIsStockExchangeModalOpen}
                                        onTableUpdated={fetchLots}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
                )}
            </main>

            {isAddLotModalOpen && (
                <AddItemModal
                    closeModal={closeModal}
                    types={Object.values(LotType)}
                    checkpoints={checkpoints}
                    itemType="lot"
                />
            )}

            {isStockExchangeModalOpen && selectedLot && (
                <AddToStockExchangeModal
                    item={selectedLot}
                    itemType="lot"
                    minDate={new Date().toISOString().split("T")[0]}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default Lots;
