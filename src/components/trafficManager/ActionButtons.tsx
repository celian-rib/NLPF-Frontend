import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPlus, faHand, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Lot } from '../../types/Lot';
import { Tractor } from '../../types/Tractor';
import { startTractor, stopTractor, unassignRouteFromTractor } from '../../services/trafficManager';
import { assignLotToTrader, assignTractorToTrader } from '../../services/trader';

interface ActionButtonsProps<T> {
    item: T;
    itemType: 'tractor' | 'lot';
    setSelectedLot?: (lot: Lot) => void;
    setSelectedTractor?: (tractor: Tractor) => void;
    setIsStockExchangeModalOpen: (open: boolean) => void;
    onTableUpdated: () => void;
}

const ActionButtons = <T extends Lot | Tractor>({
    item,
    itemType,
    setSelectedLot,
    setSelectedTractor,
    setIsStockExchangeModalOpen,
    onTableUpdated,
}: ActionButtonsProps<T>) => {
    const role: string | null = localStorage.getItem('user_role');

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

    // Function to add item to stock exchange
    const handleStockExchangeClick = async () => {
        if (role === 'traffic-manager')
        {
            if (itemType === 'lot')
            {
                // Assign lot to trader using Trader API
                await assignLotToTrader(item.id);
            }
            else if (itemType === 'tractor')
            {
                // Assign tractor to trader using Trader API
                await assignTractorToTrader(item.id);
            }
        }
        else
        {
            if (itemType === 'lot' && setSelectedLot)
            {
                setSelectedLot(item as Lot);
            }
            else if (itemType === 'tractor' && setSelectedTractor)
            {
                setSelectedTractor(item as Tractor);
            }
            setIsStockExchangeModalOpen(true);
        }
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

                    <button
                        onClick={() => handleStockExchangeClick()}
                        className="bg-blue-200 text-blue-800 px-4 py-2 flex items-center font-bold hover:bg-blue-300 transition-colors rounded-md"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Stock exchange
                    </button>

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
