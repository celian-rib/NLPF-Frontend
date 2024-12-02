import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { getStatusInfo } from '../../utils/utils';
import FilterAndSort from '../../components/utils/FilterAndSort';
import { Checkpoint } from '../../types/Checkpoint';
import { Package } from '../../types/Package';
import { PackageType } from '../../types/PackageType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortAndFilterData } from '../../utils/sortingUtils';
import TrafficManagerSelect from '../../components/client/TrafficManagerSelect';
import ActionButtons from '../../components/client/ActionButtons';
import AddToStockExchangeModal from '../../components/stockExchange/modal/AddToStockExchangeModal';
import AddItemModal from '../../components/client/modal/AddItemModal';
import { getAllCheckpoints, getTrafficManagerByPackageId } from '../../services/trafficManager';
import { getPackagesByClientId } from '../../services/assets';
import { getAllTrafficManagers } from '../../services/auth';
import { UserInfo } from '../../types/UserInfo';
import SubNavbar from '../../components/navbar/SubNavbar';
import { clientTabs } from '../../configs/tabConfig';
import { useWebSocket } from '../../socket/WebSocketContext';

const ClientPackages: React.FC = () => {
    const [title] = useState<string>('Package management');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [subtitle] = useState<string>('Track the status of your packages in real time.');
    const [tableData, setTableData] = useState<Package[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('none');
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState<boolean>(false);
    const [isStockExchangeModalOpen, setIsStockExchangeModalOpen] = useState<boolean>(false);
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [trafficManagers, setTrafficManagers] = useState<UserInfo[]>([]);

    const { simulationDate, messageBroadcasted } = useWebSocket();

    // Fetch traffic managers of packages
    const fetchTrafficManagersOfPackages = async (packages: Package[]): Promise<Package[]> => {
        for (let i = 0; i < packages.length; i++)
            packages[i].traffic_manager = await getTrafficManagerByPackageId(packages[i].id);
        return packages;
    };

    // Fetch packages
    const fetchPackages = async () => {
        const data = await getPackagesByClientId();
        if (!data)
            return;
        const updatedData = await fetchTrafficManagersOfPackages(data);
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
        fetchPackages();
        fetchCheckpoints();
        fetchTrafficManagers();
        // eslint-disable-next-line
    }, [simulationDate, messageBroadcasted]);

    // Function to close modals
    const closeModal = async () => {
        await fetchPackages();
        setIsAddPackageModalOpen(false);
        setIsStockExchangeModalOpen(false);
    };

    // Sort and filter data
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
                            onClick={() => setIsAddPackageModalOpen(true)}
                            className="bg-blue-500 text-white font-bold px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors self-end"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add a package
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
                            {sortedData.map(package => (
                                <tr key={package.id} className="hover:bg-gray-100">

                                    <td className="border text-center p-2">{package.package_name}</td>

                                    <td className={`border text-center p-2`}>
                                        <span className={`px-2 py-1 rounded ${getStatusInfo(package.status).color}`}>
                                            {getStatusInfo(package.status).text}
                                        </span>
                                    </td>

                                    <td className="border text-center p-2">{package.volume}</td>

                                    <td className="border text-center p-2">{package.current_checkpoint.checkpoint_name}</td>

                                    <td className="border text-center p-2">{package.start_checkpoint.checkpoint_name} / {package.end_checkpoint.checkpoint_name}</td>

                                    <TrafficManagerSelect 
                                        item={package}
                                        trafficManagers={trafficManagers}
                                    />

                                    <ActionButtons
                                        item={package}
                                        itemType="package"
                                        setSelectedPackage={setSelectedPackage}
                                        setIsStockExchangeModalOpen={setIsStockExchangeModalOpen}
                                        onTableUpdated={fetchPackages}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
                )}
            </main>

            {isAddPackageModalOpen && (
                <AddItemModal
                    closeModal={closeModal}
                    types={Object.values(PackageType)}
                    checkpoints={checkpoints}
                    itemType="package"
                />
            )}

            {isStockExchangeModalOpen && selectedPackage && (
                <AddToStockExchangeModal
                    item={selectedPackage}
                    itemType="package"
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default ClientPackages;
