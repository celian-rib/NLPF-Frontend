import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Lot } from '../../types/Lot';
import { Tractor } from '../../types/Tractor';
import { assignLotToTrafficManager, assignTractorToTrafficManager } from '../../services/trafficManager';
import { deleteLot, deleteTractor } from '../../services/assets';

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

    // Function to add item to stock exchange
    const handleStockExchangeClick = () => {
        if (itemType === 'lot' && setSelectedLot)
        {
            setSelectedLot(item as Lot);
        }
        else if (itemType === 'tractor' && setSelectedTractor)
        {
            setSelectedTractor(item as Tractor);
        }
        setIsStockExchangeModalOpen(true);
        onTableUpdated();
    };

    // Function to assign item to traffic manager
    const handleAssignClick = async () => {
        if (!item.traffic_manager)
        {
            alert('Please select a traffic manager first.');
            return;
        }
        if (itemType === 'lot')
        {
            // Assign lot to traffic manager Traffic Manager API
            await assignLotToTrafficManager(item.id, item.traffic_manager.user_id);
        }
        else if (itemType === 'tractor')
        {
            // Assign tractor to traffic manager Traffic Manager API
            await assignTractorToTrafficManager(item.id, item.traffic_manager.user_id);
        }
        onTableUpdated();
    }

    // Function to remove item
    const handleRemoveClick = async () => {
        if (itemType === 'lot')
        {
            // Remove lot using Assets API
            await deleteLot(item.id);
        }
        else if (itemType === 'tractor')
        {
            // Remove tractor using Assets API
            await deleteTractor(item.id);
        }
        onTableUpdated();
    }

    return (
        <td className="border p-2 text-center">
            {item.status === 'available' ? (
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                    <button
                        className="self-center bg-green-200 text-green-800 px-4 py-2 flex items-center font-bold hover:bg-green-300 transition-colors rounded-md"
                        onClick={handleAssignClick}
                    >
                        <FontAwesomeIcon icon={faTruck} className="mr-2" />
                        Assign
                    </button>
                    <button
                        className="self-center bg-blue-200 text-blue-800 px-4 py-2 flex items-center font-bold hover:bg-blue-300 transition-colors rounded-md"
                        onClick={handleStockExchangeClick}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Stock exchange
                    </button>
                    <button
                        className="self-center bg-red-200 text-red-600 px-4 py-2 flex items-center font-bold hover:bg-red-300 transition-colors rounded-md"
                        onClick={handleRemoveClick}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                        Remove
                    </button>
                </div>
            ) : (
                <span className="text-gray-400">-</span>
            )}
        </td>
    );
};

export default ActionButtons;
