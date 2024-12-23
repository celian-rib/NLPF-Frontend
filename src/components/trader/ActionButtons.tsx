import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Package } from '../../types/Package';
import { Tractor } from '../../types/Tractor';

interface ActionButtonsProps<T> {
    item: T;
    itemType: 'tractor' | 'package';
    setSelectedPackage?: (package: Package) => void;
    setSelectedTractor?: (tractor: Tractor) => void;
    setIsStockExchangeModalOpen: (open: boolean) => void;
    onTableUpdated: () => void;
}

const ActionButtons = <T extends Package | Tractor>({
    item,
    itemType,
    setSelectedPackage,
    setSelectedTractor,
    setIsStockExchangeModalOpen,
    onTableUpdated,
}: ActionButtonsProps<T>) => {

    // Function to add item to stock exchange
    const handleStockExchangeClick = () => {
        if (itemType === 'package' && setSelectedPackage)
        {
            setSelectedPackage(item as Package);
        }
        else if (itemType === 'tractor' && setSelectedTractor)
        {
            setSelectedTractor(item as Tractor);
        }
        setIsStockExchangeModalOpen(true);
        onTableUpdated();
    };

    return (
        <td className="border p-2 text-center">
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                {item.status === "at_trader" ? (
                    <button 
                        onClick={handleStockExchangeClick}
                        className="bg-blue-200 text-blue-800 px-4 py-2 flex items-center font-bold hover:bg-blue-300 transition-colors rounded-md"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Stock exchange
                    </button>
                ) : (
                    <span className="text-gray-500">-</span>
                )}
            </div>
        </td>
    );
};

export default ActionButtons;
