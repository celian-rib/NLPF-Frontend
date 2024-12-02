import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHand, faEraser, faUser } from '@fortawesome/free-solid-svg-icons';
import { Package } from '../../types/Package';
import { Tractor } from '../../types/Tractor';
import { startTractor, stopTractor, unassignRouteFromTractor } from '../../services/trafficManager';
import { assignPackageToTrader, assignTractorToTrader } from '../../services/trader';
import { UserInfo } from '../../types/UserInfo';

interface ActionButtonsProps<T> {
    item: T;
    itemType: 'tractor' | 'package';
    traders: UserInfo[];
    onTableUpdated: () => void;
}

const ActionButtons = <T extends Package | Tractor>({
    item,
    itemType,
    traders,
    onTableUpdated,
}: ActionButtonsProps<T>) => {

    // Function to start item
    const handleStartClick = async () => {
        // Start tractor using Traffic Manager API
        await startTractor(item.id);
        onTableUpdated();
    };

    // Function to stop item
    const handleStopClick = async () => {
        // Stop tractor using Traffic Manager API
        await stopTractor(item.id);
        onTableUpdated();
    };

    // Function to send item to trader
    const handleAssignToTraderClick = async () => {
        if (itemType === 'package')
        {
            // Assign package to trader using Trader API
            await assignPackageToTrader(item.id);
        }
        else if (itemType === 'tractor')
        {
            // Assign tractor to trader using Trader API
            await assignTractorToTrader(item.id);
        }
        onTableUpdated();
    };

    // Function to unassign route from item
    const handleUnassignRouteClick = async () => {
        // Unassign route from tractor using Traffic Manager API
        await unassignRouteFromTractor(item.id);
        onTableUpdated();
    };

    return (
        <td className="border p-2 text-center">
            {itemType === 'tractor' && item.status === 'in_transit'? (
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                    <button
                        onClick={() => handleStopClick()}
                        className="bg-red-200 text-red-600 px-4 py-2 flex items-center font-bold hover:bg-red-300 transition-colors rounded-md"
                    >
                        <FontAwesomeIcon icon={faHand} className="mr-2" />
                        Stop
                    </button>
                </div>
            ) : item.status === 'pending' ? (
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">

                    {traders && traders.length > 0 && (
                        <button
                            onClick={() => handleAssignToTraderClick()}
                            className="bg-purple-200 text-purple-800 px-4 py-2 flex items-center font-bold hover:bg-purple-300 transition-colors rounded-md"
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Assign to trader
                        </button>
                    )}

                    {itemType === 'tractor' && (item as Tractor).route !== null && (item as Tractor).route?.route_name && (
                    <>
                        <button
                            onClick={() => handleStartClick()}
                            className="bg-green-200 text-green-800 px-4 py-2 flex items-center font-bold hover:bg-green-300 transition-colors rounded-md"
                        >
                            <FontAwesomeIcon icon={faTruck} className="mr-2" />
                            Start
                        </button>
                        
                        <button
                            onClick={() => handleUnassignRouteClick()}
                            className="bg-red-200 text-red-600 px-4 py-2 flex items-center font-bold hover:bg-red-300 transition-colors rounded-md"
                        >
                            <FontAwesomeIcon icon={faEraser} className="mr-2" />
                            Unassign route
                        </button>
                    </>
                    )}
                </div>

            ) : (
                <span className="text-gray-500">-</span>
            )}
        </td>
    );
};

export default ActionButtons;
