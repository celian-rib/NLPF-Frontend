import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { formatDateTime, getBidStateInfo, getStatusInfo } from '../../utils/utils';
import SubNavbar from '../../components/navbar/SubNavbar';
import { historyTabs } from '../../configs/tabConfig';
import EmptyTable from '../../components/utils/EmptyTable';
import { getTractorBidsByUserId } from '../../services/stockExchange';
import { getTractorById } from '../../services/assets';
import { TractorBid } from '../../types/TractorBid';
import { useWebSocket } from '../../socket/WebSocketContext';

const HistoryTractors: React.FC = () => {
    const [title] = useState<string>('Tractors history');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [subtitle] = useState<string>('Find the history of your bids in real time.');
    const [tableData, setTableData] = useState<TractorBid[]>([]);

    const { simulationDate, messageBroadcasted } = useWebSocket();

    // Fetch tractor bids
    const fetchTractorBids = async () => {
        let data = await getTractorBidsByUserId();
        if (!data)
            return;
        for (let i = 0; i < data.length; i++)
        {
            const tractor = await getTractorById(data[i].tractor_id);
            if (!tractor)
                return;
            data[i].tractor = tractor;
        }
        setTableData(data);
    };

    useEffect(() => {
        fetchTractorBids();
    }, [simulationDate, messageBroadcasted]);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={historyTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </div>

                {Array.isArray(tableData) && tableData.length > 0 ? (
                <>
                <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-center">Name</th>
                                <th className="border p-2 text-center">Status</th>
                                <th className="border p-2 text-center">Date</th>
                                <th className="border p-2 text-center">Bid state</th>
                                <th className="border p-2 text-center">Bid amount<span className="font-normal">(in €/km)</span></th>
                                <th className="border p-2 text-center">Minimum price<span className="font-normal">(in €/km)</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(bid => (
                                <tr key={bid.id} className="hover:bg-gray-100">

                                    <td className="border text-center p-2">{bid.tractor?.tractor_name}</td>

                                    <td className={`border text-center p-2`}>
                                        <span className={`px-2 py-1 rounded ${getStatusInfo(bid.tractor?.status).color}`}>
                                            {getStatusInfo(bid.tractor?.status).text}
                                        </span>
                                    </td>

                                    <td className="border text-center p-2">{formatDateTime(bid.created_at)}</td>

                                    <td className="border text-center p-2">
                                        <span className={`px-2 py-1 rounded ${getBidStateInfo(bid.accepted).color}`}>
                                            {getBidStateInfo(bid.accepted).text}
                                        </span>
                                    </td>

                                    <td className="border text-center p-2">{bid.bid}</td>

                                    <td className="border text-center p-2">{bid.tractor?.min_price}</td>

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
        </>
    );
};

export default HistoryTractors;
