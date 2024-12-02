import React, { useState, useEffect } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { traderTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import { getStatusInfo } from '../../utils/utils';
import { Lot } from '../../types/Lot';
import { sortAndFilterData } from '../../utils/sortingUtils';
import FilterAndSort from '../../components/utils/FilterAndSort';
import EmptyTable from '../../components/utils/EmptyTable';
import { getLotsByTraderId } from '../../services/trader';
import ActionButtons from '../../components/trader/ActionButtons';
import AddToStockExchangeModal from '../../components/stockExchange/modal/AddToStockExchangeModal';
import { useWebSocket } from '../../socket/WebSocketContext';

const TraderLots: React.FC = () => {
    const [title] = useState('Lot offers');
    const [subtitle] = useState('Create lot offers in real time.');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [tableData, setTableData] = useState<Lot[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
    const [isStockExchangeModalOpen, setIsStockExchangeModalOpen] = useState<boolean>(false);

    const { simulationDate, messageBroadcasted } = useWebSocket();

    // Fetch lots
    const fetchLots = async () => {
        const data = await getLotsByTraderId();
        if (!data)
            return;
        setTableData(data);
    };

    useEffect(() => {
        fetchLots();
    }, [simulationDate, messageBroadcasted]);

    // Function to close modal
    const closeModal = async () => {
        await fetchLots();
        setIsStockExchangeModalOpen(false);
    };

    // Sort and filter data
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={traderTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">

                <section className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </section>

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
                    />
                </div>

                <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-center">Name</th>
                                <th className="border p-2 text-center">Status</th>
                                <th className="border p-2 text-center">Type</th>
                                <th className="border p-2 text-center">Volume<br /><span className="font-normal">(in m³)</span></th>
                                <th className="border p-2 text-center">Departure / Arrival</th>
                                <th className="border p-2 text-center">Maximum price<br /><span className="font-normal">(in €/km)</span></th>
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

                                    <td className="border p-2 text-center">{lot.type}</td>

                                    <td className="border p-2 text-center">{lot.volume}</td>

                                    <td className="border p-2 text-center">{lot.start_checkpoint.checkpoint_name} / {lot.end_checkpoint.checkpoint_name}</td>

                                    <td className="border p-2 text-center">{lot.max_price.toFixed(2)}</td>

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
                ) : (
                    <EmptyTable />
                )}
            </main>

            {isStockExchangeModalOpen && selectedLot && (
                <AddToStockExchangeModal
                    item={selectedLot}
                    itemType="lot"
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default TraderLots;
