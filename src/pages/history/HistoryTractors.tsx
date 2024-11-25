import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { getStatusInfo } from '../../utils/utils';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { Tractor } from '../../types/Tractor';
import { sortAndFilterData } from '../../utils/sortingUtils';
import SubNavbar from '../../components/navbar/SubNavbar';
import { historyTabs } from '../../configs/tabConfig';
import EmptyTable from '../../components/utils/EmptyTable';

const HistorTractors: React.FC = () => {
    const [title] = useState<string>('Tractors history');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [subtitle] = useState<string>('Find the history of your bids in real time.');
    const [tableData, setTableData] = useState<Tractor[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');

    useEffect(() => {
        setTableData([]);
        // eslint-disable-next-line
    }, []);

    // Sort and filter data
    const sortedData = sortAndFilterData(tableData, selectedStatus, sortOption);

    return (
        <>
            <Navbar />
            <SubNavbar tabs={historyTabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

            <main className="p-10 mt-40">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
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

export default HistorTractors;
