import React from 'react';
import { Lot } from '../../types/Lot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

interface TrafficManagerSelectProps {
    lot: Lot;
}

const TractorAssign: React.FC<TrafficManagerSelectProps> = ({ lot }) => {
    return (
        <td className="border p-2 text-center">
            {lot.tractor ? (
                <span className="px-2 py-1 mx-auto w-4/5 block">
                    {lot.tractor.tractor_name}
                </span>
            ) : (
                lot.status === 'pending' ? (
                    <div className="flex flex-wrap justify-center space-x-2">
                        <button
                            onClick={() => {}}
                            className="bg-green-200 text-green-800 px-4 py-2 flex items-center font-bold hover:bg-green-300 transition-colors rounded-md"
                        >
                            <FontAwesomeIcon icon={faTruck} className="mr-2" />
                            Assign
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
