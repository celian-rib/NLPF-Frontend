import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { getStatusInfo } from '../utils/utils';
import FilterAndSort from '../components/utils/FilterAndSort';
import { Checkpoint } from '../types/Checkpoint';
import { Lot } from '../types/Lot';
import { LotType } from '../types/LotType';
import { UserInfo } from '../types/UserInfo';
import { faPlus, faRightFromBracket, faRotateRight, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Lots: React.FC = () => {
    const [title] = useState<string>('Lot management');
    const [subtitle] = useState<string>('Track the status of your lots in real time.');
    const [tableData, setTableData] = useState<Lot[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');

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
            status: 'available',
            volume: 1500,
            created_at: '2024-11-01T10:00:00Z',
            type: LotType.Bulk,
            max_price: 2500,
            current_checkpoint: fakeCheckpoints[0],
            start_checkpoint: fakeCheckpoints[0],
            end_checkpoint: fakeCheckpoints[1],
            traffic_managers: [fakeTrafficManagers[0], fakeTrafficManagers[2]],
        },
        {
            id: '2',
            status: 'pending',
            volume: 500,
            created_at: '2024-11-02T12:30:00Z',
            type: LotType.Liquid,
            max_price: 1200,
            current_checkpoint: fakeCheckpoints[1],
            start_checkpoint: fakeCheckpoints[0],
            end_checkpoint: fakeCheckpoints[2],
            traffic_managers: [],
        },
        {
            id: '3',
            status: 'in_transit',
            volume: 1000,
            created_at: '2024-11-03T09:15:00Z',
            type: LotType.Solid,
            max_price: 1800,
            current_checkpoint: fakeCheckpoints[2],
            start_checkpoint: fakeCheckpoints[1],
            end_checkpoint: fakeCheckpoints[0],
            traffic_managers: [fakeTrafficManagers[1], fakeTrafficManagers[2], fakeTrafficManagers[3]],
        },
        {
            id: '4',
            status: 'on_market',
            volume: 2000,
            created_at: '2024-11-04T14:45:00Z',
            type: LotType.Bulk,
            max_price: 3000,
            current_checkpoint: fakeCheckpoints[0],
            start_checkpoint: fakeCheckpoints[1],
            end_checkpoint: fakeCheckpoints[2],
            traffic_managers: [fakeTrafficManagers[3]],
        },
        {
            id: '5',
            status: 'archived',
            volume: 750,
            created_at: '2024-10-28T16:20:00Z',
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

    const sortedData = (() => {
        let data = selectedStatus === 'all' ? tableData : tableData.filter(lot => lot.status === selectedStatus);
        switch (sortOption) {
            case 'volume_asc':
                return data.sort((a, b) => a.volume - b.volume);
            case 'volume_desc':
                return data.sort((a, b) => b.volume - a.volume);
            case 'location_asc':
                return data.sort((a, b) => a.current_checkpoint.checkpoint_name.localeCompare(b.current_checkpoint.checkpoint_name));
            case 'location_desc':
                return data.sort((a, b) => b.current_checkpoint.checkpoint_name.localeCompare(a.current_checkpoint.checkpoint_name));
            default:
                return data;
        }
    })();

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
                    />
                    <div className="flex justify-between items-center self-end">
                        <button className="bg-blue-500 text-white mr-2 font-bold px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors self-end">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add a lot
                        </button>
                        <button className="bg-gray-800 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-gray-900 transition-colors self-end">
                            <FontAwesomeIcon icon={faRotateRight} className="mr-2" />
                            Reload
                        </button>
                    </div>
                </div>

                <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
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

                                    <td className={`border text-center p-2`}>
                                        <span className={`px-2 py-1 rounded ${getStatusInfo(lot.status).color}`}>
                                            {getStatusInfo(lot.status).text}
                                        </span>
                                    </td>

                                    <td className="border text-center p-2">{lot.volume}</td>

                                    <td className="border text-center p-2">{lot.current_checkpoint.checkpoint_name}</td>

                                    <td className="border text-center p-2">{lot.start_checkpoint.checkpoint_name} / {lot.end_checkpoint.checkpoint_name}</td>

                                    <td className="border text-center p-2">
                                        {lot.traffic_managers.length === 0 ? (
                                            <span className="text-gray-400">None</span>
                                        ) : lot.traffic_managers.length === 1 ? (
                                            <span className="text-black">{lot.traffic_managers[0].username}</span>
                                        ) : (
                                            <select className="border border-gray-300 rounded px-2 py-1 mx-auto w-4/5">
                                                {lot.traffic_managers.map(traffic_manager => (
                                                    <option key={traffic_manager.id} value={traffic_manager.id}>
                                                        {traffic_manager.username}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>

                                    <td className="border p-2 text-center">
                                        {lot.status === 'available' ? (
                                            <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                                                <button className="self-center bg-green-200 text-green-800 px-4 py-2 flex items-center font-bold hover:bg-green-300 transition-colors rounded-md">
                                                    <FontAwesomeIcon icon={faTruck} className="mr-2" />
                                                    Assign
                                                </button>
                                                <button className="self-center bg-blue-200 text-blue-800 px-4 py-2 flex items-center font-bold hover:bg-blue-300 transition-colors rounded-md">
                                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                                    Stock exchange
                                                </button>
                                                <button className="self-center bg-gray-800 text-white px-4 py-2 flex items-center font-bold hover:bg-black transition-colors rounded-md">
                                                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                                                    Retirer
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default Lots;
