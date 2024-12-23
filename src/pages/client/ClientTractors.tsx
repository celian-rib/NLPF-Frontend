import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { getStatusInfo } from '../../utils/utils';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { TractorType } from '../../types/TractorType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tractor } from '../../types/Tractor';
import { sortAndFilterData } from '../../utils/sortingUtils';
import TrafficManagerSelect from '../../components/client/TrafficManagerSelect';
import ActionButtons from '../../components/client/ActionButtons';
import AddToStockExchangeModal from '../../components/stockExchange/modal/AddToStockExchangeModal';
import { Checkpoint } from '../../types/Checkpoint';
import AddItemModal from '../../components/client/modal/AddItemModal';
import { getAllCheckpoints, getTrafficManagerByTractorId } from '../../services/trafficManager';
import { getTractorsByClientId } from '../../services/assets';
import { getAllTrafficManagers } from '../../services/auth';
import { UserInfo } from '../../types/UserInfo';
import { clientTabs } from '../../configs/tabConfig';
import SubNavbar from '../../components/navbar/SubNavbar';
import { useWebSocket } from '../../socket/WebSocketContext';

const ClientTractors: React.FC = () => {
    const [title] = useState<string>('Tractor management');
    const [subtitle] = useState<string>('Track the status of your tractors in real time.');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [tableData, setTableData] = useState<Tractor[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);
    const [isAddTractorModalOpen, setIsAddTractorModalOpen] = useState<boolean>(false);
    const [isStockExchangeModalOpen, setIsStockExchangeModalOpen] = useState<boolean>(false);
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [trafficManagers, setTrafficManagers] = useState<UserInfo[]>([]);

    const { simulationDate, messageBroadcasted } = useWebSocket();

    // Fetch traffic managers of tractors
    const fetchTrafficManagersOfTractors = async (tractors: Tractor[]): Promise<Tractor[]> => {
        for (let i = 0; i < tractors.length; i++)
            tractors[i].traffic_manager = await getTrafficManagerByTractorId(tractors[i].id);
        return tractors;
    };

    // Fetch tractors
    const fetchTractors = async () => {
        const data = await getTractorsByClientId();
        if (!data)
            return;
        const updatedData = await fetchTrafficManagersOfTractors(data);
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
        fetchTractors();
        fetchCheckpoints();
        fetchTrafficManagers();
        // eslint-disable-next-line
    }, [simulationDate, messageBroadcasted]);

    // Function to close modals
    const closeModal = async () => {
        await fetchTractors();
        setIsAddTractorModalOpen(false);
        setIsStockExchangeModalOpen(false);
    };

    // Use the sorting utility function
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={clientTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">
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
                            onClick={() => setIsAddTractorModalOpen(true)}
                            className="bg-blue-500 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors self-end"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add a tractor
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

                                    <TrafficManagerSelect
                                        item={tractor}
                                        trafficManagers={trafficManagers}
                                    />

                                    <ActionButtons
                                        item={tractor}
                                        itemType="tractor"
                                        setSelectedTractor={setSelectedTractor}
                                        setIsStockExchangeModalOpen={setIsStockExchangeModalOpen}
                                        onTableUpdated={fetchTractors}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
                )}
            </main>

            {isAddTractorModalOpen && (
                <AddItemModal
                    closeModal={closeModal}
                    types={Object.values(TractorType)}
                    checkpoints={checkpoints}
                    itemType="tractor"
                />
            )}

            {isStockExchangeModalOpen && selectedTractor && (
                <AddToStockExchangeModal
                    item={selectedTractor}
                    itemType="tractor"
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default ClientTractors;
