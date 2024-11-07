import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Tractor } from '../../../types/Tractor';
import { getStatusInfo } from '../../../utils/utils';

interface AssignTractorModalProps {
    lotId: string;
    compatibleTractors: Tractor[];
    closeModal: () => void;
}

const AssignTractorModal: React.FC<AssignTractorModalProps> = ({
    lotId,
    compatibleTractors,
    closeModal,
}) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5" onClick={(e) => e.stopPropagation()}>

                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={closeModal}>
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6">Assign tractor</h2>

                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-center">Name</th>
                            <th className="border p-2 text-center">Status</th>
                            <th className="border p-2 text-center">Location</th>
                            <th className="border p-2 text-center">Route</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compatibleTractors.map((tractor) => (
                            <tr key={tractor.id}>
                                
                                <td className="border p-2 text-center">{tractor.tractor_name}</td>

                                <td className="border p-2 text-center">
                                    <span className={`px-2 py-1 rounded ${getStatusInfo(tractor.status).color}`}>
                                        {getStatusInfo(tractor.status).text}
                                    </span>
                                </td>

                                <td className="border p-2 text-center">
                                    {tractor.current_checkpoint.checkpoint_name}
                                </td>

                                <td className="border p-2 text-center">
                                    {tractor.route ? tractor.route.route_name : (
                                        <span className="px-2 py-1 mx-auto w-4/5 block text-gray-500">None</span>
                                    )}
                                </td>

                                <td className="border p-2 text-center">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => {}}
                                            className="bg-gray-200 text-gray-600 px-4 py-2 flex items-center font-bold hover:bg-green-200 hover:text-green-800 transition-colors rounded-md group"
                                        >
                                            <FontAwesomeIcon icon={faHandPointer} className="mr-2 icon-default group-hover:hidden" />
                                            <FontAwesomeIcon icon={faCheck} className="mr-2 icon-hover hidden group-hover:inline" />
                                            Select
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignTractorModal;
