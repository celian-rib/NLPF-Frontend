import React, { useEffect, useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { stockExchangeTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import { formatDate } from '../../utils/utils';
import { sortAndFilterData } from '../../utils/sortingUtils';
import { TractorOffer } from '../../types/TractorOffer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import FilterAndSort from '../../components/utils/FilterAndSort';
import BidModal from '../../components/stockExchange/modal/BidModal';
import { getTractorOffers } from '../../services/stockExchange';
import EmptyTable from '../../components/utils/EmptyTable';
import { useWebSocket } from '../../socket/WebSocketContext';

const StockExchangeTractors: React.FC = () => {
    const [title] = useState('Tractor market');
    const [subtitle] = useState('Negotiate available freight space according to market needs.');
    const [userRole, setUserRole] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [tableData, setTableData] = useState<TractorOffer[]>([]);
    const [selectedStatus] = useState('all');
    const [sortOption, setSortOption] = useState('none');
    const [selectedOffer, setSelectedOffer] = useState<TractorOffer>();
    const [isBidModalOpen, setIsBidModalOpen] = useState<boolean>(false);

    const { simulationDate, messageBroadcasted } = useWebSocket();

    const openBidModal = (offer: TractorOffer) => {
        setSelectedOffer(offer);
        setIsBidModalOpen(true);
    }

    // Fetch tractor offers
    const fetchTractorOffers = async () => {
        const data = await getTractorOffers();
        if (!data)
            return;
        setTableData(data);
    };

    useEffect(() => {
        const role: string = localStorage.getItem('user_role') || '';
        setUserRole(role);
        fetchTractorOffers();
    }, [simulationDate, messageBroadcasted]);

    // Function to close modal
    const closeModal = async () => {
        await fetchTractorOffers();
        setIsBidModalOpen(false);
    };

    // Sort and filter data
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={stockExchangeTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </div>

                {Array.isArray(sortedData) && sortedData.length > 0 ? (
                <>
                <div className="flex justify-between items-center self-end mb-2">
                    <FilterAndSort
                        sortOption={sortOption} 
                        setSortOption={setSortOption}
                        sortByVolume={true}
                        sortByMaxPrice={true}
                        sortByCurrentPrice={true}
                    />
                </div>

                <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-center">Expiration date</th>
                                <th className="border p-2 text-center">Type</th>
                                <th className="border p-2 text-center">Volume<br /><span className="font-normal">(in m³)</span></th>
                                <th className="border p-2 text-center">Minimum price<br /><span className="font-normal">(in €/km)</span></th>
                                <th className="border p-2 text-center">Maximum Bid<br /><span className="font-normal">(in €/km)</span></th>
                                {userRole === 'client' && (
                                    <th className="border p-2 text-center">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((offer, index) => (
                                <tr key={offer.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>

                                    <td className="border p-2 text-center">{formatDate(offer.limit_date)}</td>

                                    <td className="border p-2 text-center">{offer.type}</td>

                                    <td className="border p-2 text-center">{offer.volume}</td>

                                    <td className="border p-2 text-center">{offer.min_price.toFixed(2)}</td>

                                    <td className="border p-2 text-center">{offer.current_price.toFixed(2)}</td>

                                    {userRole === 'client' && (
                                        <td className="border p-2 text-center">
                                            <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                                                <button
                                                    className="bg-blue-200 text-blue-800 px-4 py-2 flex items-center font-bold hover:bg-blue-300 transition-colors rounded-md"
                                                    onClick={() => openBidModal(offer)}
                                                >
                                                    <FontAwesomeIcon icon={faCoins} className="mr-2" />
                                                    Bid
                                                </button>
                                            </div>
                                        </td>
                                    )}

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
            {isBidModalOpen && selectedOffer && (
                <BidModal
                    offer={selectedOffer}
                    offerType="tractor"
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default StockExchangeTractors;
