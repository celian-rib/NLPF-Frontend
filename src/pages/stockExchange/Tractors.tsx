import React, { useEffect, useState } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { stockExchangeTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import { formatDate } from '../../utils/utils';
import { sortAndFilterData } from '../../utils/sortingUtils';
import { TractorOffer } from '../../types/TractorOffer';
import { TractorType } from '../../types/TractorType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import FilterAndSort from '../../components/utils/FilterAndSort';
import BidModal from '../../components/stockExchange/modal/BidModal';

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

    const fakeTractorOffers: TractorOffer[] = [
        {
            offer_id: '3fa85f64-5717-4562-b3fc-2c963f66a',
            status: 'on_market',
            volume: 100,
            type: TractorType.Solid,
            current_price: 100.0,
            min_price: 30.0,
            current_checkpoint: {
                id: '1',
                checkpoint_name: 'Checkpoint 1',
                checkpoint_latitude: 48.8566,
                checkpoint_longitude: 2.3522
            },
            start_checkpoint: {
                id: '2',
                checkpoint_name: 'Checkpoint 2',
                checkpoint_latitude: 48.8577,
                checkpoint_longitude: 2.3532
            },
            end_checkpoint: {
                id: '3',
                checkpoint_name: 'Checkpoint 3',
                checkpoint_latitude: 48.8588,
                checkpoint_longitude: 2.3542
            },
            limit_date: '2021-03-01T00:00:00.000Z'
        },
        {
            offer_id: '4fa85f64-5717-4562-b3fc-2c963f66a',
            status: 'available',
            volume: 50,
            type: TractorType.Liquid,
            current_price: 80.0,
            min_price: 20.0,
            current_checkpoint: {
                id: '4',
                checkpoint_name: 'Checkpoint 4',
                checkpoint_latitude: 48.8600,
                checkpoint_longitude: 2.3600
            },
            start_checkpoint: {
                id: '5',
                checkpoint_name: 'Checkpoint 5',
                checkpoint_latitude: 48.8610,
                checkpoint_longitude: 2.3610
            },
            end_checkpoint: {
                id: '6',
                checkpoint_name: 'Checkpoint 6',
                checkpoint_latitude: 48.8620,
                checkpoint_longitude: 2.3620
            },
            limit_date: '2021-06-01T00:00:00.000Z'
        },
        {
            offer_id: '5fa85f64-5717-4562-b3fc-2c963f66',
            status: 'pending',
            volume: 200,
            type: TractorType.Bulk,
            current_price: 150.0,
            min_price: 50.0,
            current_checkpoint: {
                id: '7',
                checkpoint_name: 'Checkpoint 7',
                checkpoint_latitude: 48.8650,
                checkpoint_longitude: 2.3650
            },
            start_checkpoint: {
                id: '8',
                checkpoint_name: 'Checkpoint 8',
                checkpoint_latitude: 48.8660,
                checkpoint_longitude: 2.3660
            },
            end_checkpoint: {
                id: '9',
                checkpoint_name: 'Checkpoint 9',
                checkpoint_latitude: 48.8670,
                checkpoint_longitude: 2.3670
            },
            limit_date: '2021-09-01T00:00:00.000Z'
        }
    ];

    const openBidModal = (offer: TractorOffer) => {
        setSelectedOffer(offer);
        setIsBidModalOpen(true);
    }

    useEffect(() => {

        // Get client role
        const role: string = localStorage.getItem('user_role') || '';
        setUserRole(role);
    
        setTableData(fakeTractorOffers);
    }, []);

    // Sort and filter data
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={stockExchangeTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">
                <div className="mb-2">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </div>

                <section className="flex justify-between items-center mb-4">
                    <div className="flex justify-between items-center self-end">
                        <FilterAndSort
                            sortOption={sortOption} 
                            setSortOption={setSortOption}
                            sortByVolume={true}
                            sortByMaxPrice={true}
                            sortByCurrentPrice={true}
                        />
                    </div>
                </section>

                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-center">Expiration date</th>
                            <th className="border p-2 text-center">Type</th>
                            <th className="border p-2 text-center">Volume<br /><span className="font-normal">(in m³)</span></th>
                            <th className="border p-2 text-center">Maximum price<br /><span className="font-normal">(in €/km)</span></th>
                            <th className="border p-2 text-center">Minimum Bid<br /><span className="font-normal">(in €/km)</span></th>
                            {userRole === 'client' && (
                                <th className="border p-2 text-center">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((offer, index) => (
                            <tr key={offer.offer_id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>

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
            </main>
            {isBidModalOpen && selectedOffer && (
                <BidModal
                    offer={selectedOffer}
                    offerType="tractor"
                    closeModal={() => setIsBidModalOpen(false)}
                />
            )}
        </>
    );
};

export default StockExchangeTractors;
