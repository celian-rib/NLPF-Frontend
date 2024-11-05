import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Lot } from '../../types/Lot';
import { Tractor } from '../../types/Tractor';

interface ActionButtonsProps<T> {
    item: T;
    itemType: 'tractor' | 'lot';
    setIsStockExchangeModalOpen: (open: boolean) => void;
}

const ActionButtons = <T extends Lot | Tractor>({
    item,
    itemType,
    setIsStockExchangeModalOpen,
}: ActionButtonsProps<T>) => {

    // Function to handle the stock exchange button click
    const handleStockExchangeClick = () => {
        setIsStockExchangeModalOpen(true);
    };

    return (
        <td className="border p-2 text-center">
            {item.status === 'available' ? (
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                    <button className="self-center bg-green-200 text-green-800 px-4 py-2 flex items-center font-bold hover:bg-green-300 transition-colors rounded-md">
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
                    <button className="self-center bg-gray-800 text-white px-4 py-2 flex items-center font-bold hover:bg-black transition-colors rounded-md">
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
