import React, { useState, useEffect } from 'react';
import SubNavbar from '../../components/navbar/SubNavbar';
import { traderTabs } from '../../configs/tabConfig';
import Navbar from '../../components/navbar/Navbar';
import { getStatusInfo } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Lot } from '../../types/Lot';
import { LotType } from '../../types/LotType';
import { Checkpoint } from '../../types/Checkpoint';
import { sortAndFilterData } from '../../utils/sortingUtils';
import FilterAndSort from '../../components/utils/FilterAndSort';
import EmptyTable from '../../components/utils/EmptyTable';

const TraderLots: React.FC = () => {
    const [title] = useState('Lot offers');
    const [subtitle] = useState('Create lot offers in real time.');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [tableData, setTableData] = useState<Lot[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');

    const fakeCheckpoints: Checkpoint[] = [
        { id: '1', checkpoint_name: 'Checkpoint 1', checkpoint_latitude: 48.8566, checkpoint_longitude: 2.3522 },
        { id: '2', checkpoint_name: 'Checkpoint 2', checkpoint_latitude: 34.0522, checkpoint_longitude: -118.2437 },
        { id: '3', checkpoint_name: 'Checkpoint 3', checkpoint_latitude: 51.5074, checkpoint_longitude: -0.1278 },
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
        },
        {
            id: '2',
            lot_name: 'Lot 2',
            status: 'at_trader',
            volume: 500,
            type: LotType.Liquid,
            max_price: 1200,
            current_checkpoint: fakeCheckpoints[1],
            start_checkpoint: fakeCheckpoints[0],
            end_checkpoint: fakeCheckpoints[2],
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
        },
        {
            id: '4',
            lot_name: 'Lot 4',
            status: 'at_trader',
            volume: 2000,
            type: LotType.Bulk,
            max_price: 3000,
            current_checkpoint: fakeCheckpoints[0],
            start_checkpoint: fakeCheckpoints[1],
            end_checkpoint: fakeCheckpoints[2],
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
            <SubNavbar tabs={traderTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">

                <section className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    <h2 className="text-2xl text-gray-600">{subtitle}</h2>
                </section>

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

                {Array.isArray(sortedData) && sortedData.length > 0 ? (
                <>
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

                                    <td className="border p-2 text-center">
                                        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                                            {lot.status === "at_trader" ? (
                                                <button 
                                                    onClick={() => {}}
                                                    className="bg-blue-200 text-blue-800 px-4 py-2 flex items-center font-bold hover:bg-blue-300 transition-colors rounded-md"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                                    Publish
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </div>
                                    </td>

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

export default TraderLots;
