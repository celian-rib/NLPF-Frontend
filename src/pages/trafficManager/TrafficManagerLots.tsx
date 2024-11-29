import React, { useState, useEffect } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { trafficManagerTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import { getStatusInfo } from '../../utils/utils';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { Lot } from '../../types/Lot';
import { sortAndFilterData } from '../../utils/sortingUtils';
import TractorAssign from '../../components/trafficManager/TractorAssign';
import ActionButtons from '../../components/trafficManager/ActionButtons';
import AssignTractorModal from '../../components/trafficManager/modal/AssignTractorModal';
import { Tractor } from '../../types/Tractor';
import { getLotsByTrafficManagerId } from '../../services/trafficManager';
import EmptyTable from '../../components/utils/EmptyTable';
import { getAllTraders } from '../../services/auth';
import { UserInfo } from '../../types/UserInfo';
import { getTractorsThatCanFitLot } from '../../services/simulation';
import { useWebSocket } from '../../socket/WebSocketContext';

const TrafficManagerLots: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('');
    const [title] = useState('Lot Management');
    const [subtitle] = useState('Manage lots and assign tractors.');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [tableData, setTableData] = useState<Lot[]>([]);
    const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
    const [isAssignTractorModalOpen, setIsAssignTractorModalOpen] = useState<boolean>(false);
    const [traders, setTraders] = useState<UserInfo[]>([]);
    const [compatibleTractors, setCompatibleTractors] = useState<Tractor[]>([]);

    const { simulationDate, messageBroadcasted } = useWebSocket();

    // Fetch lots
    const fetchLots = async () => {
        const data = await getLotsByTrafficManagerId();
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
        fetchLots();
        fetchTraders();
    }, [simulationDate, messageBroadcasted]);

    // Load compatible tractors
    useEffect(() => {
        const fetchCompatibleTractors = async () => {
            if (selectedLot)
            {
                const data = await getTractorsThatCanFitLot(selectedLot.id);
                setCompatibleTractors(data || []);
            }
        };
        fetchCompatibleTractors();
    }, [selectedLot]);

    // Function to close modal
    const closeModal = async () => {
        await fetchLots();
        setIsAssignTractorModalOpen(false);
    };

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
                                        traders={traders}
                                        onTableUpdated={fetchLots}
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

            {isAssignTractorModalOpen && selectedLot && (
                <AssignTractorModal
                    lotId={selectedLot.id}
                    compatibleTractors={compatibleTractors}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default TrafficManagerLots;
