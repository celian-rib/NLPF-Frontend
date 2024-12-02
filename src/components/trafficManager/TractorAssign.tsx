import React from 'react';
import { Package } from '../../types/Package';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

interface TractorAssignProps {
    package: Package;
    setSelectedPackage: (package: Package) => void;
    setIsAssignTractorModalOpen: (open: boolean) => void;
}

const TractorAssign: React.FC<TractorAssignProps> = ({
    package,
    setSelectedPackage,
    setIsAssignTractorModalOpen,
}) => {

    // Function to open assign tractor modal event
    const handleAssignClick = () => {
        setSelectedPackage(package);
        setIsAssignTractorModalOpen(true);
    };

    return (
        <td className="border p-2 text-center">
            {package.tractor ? (
                <span className="px-2 py-1 mx-auto w-4/5 block">
                    {package.tractor.tractor_name}
                </span>
            ) : (
                package.status === 'pending' ? (
                    <div className="flex flex-wrap justify-center space-x-2">
                        <button
                            onClick={() => handleAssignClick()}
                            className="bg-green-200 text-green-800 px-4 py-2 flex items-center font-bold hover:bg-green-300 transition-colors rounded-md"
                        >
                            <FontAwesomeIcon icon={faTruck} className="mr-2" />
                            Assign tractor
                        </button>
                    </div>
                ) : (
                    <span className="text-gray-500">None</span>
                )
            )}
        </td>
    );
};

export default TractorAssign;
