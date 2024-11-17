import React, { useState } from 'react';
import { Checkpoint } from '../../types/Checkpoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { createRoute } from '../../services/trafficManager';

interface RouteCreateProps {
    checkpoints: Checkpoint[];
}

const RouteCreate: React.FC<RouteCreateProps> = ({
    checkpoints,
}) => {
    const [selectedCheckpoints, setSelectedCheckpoints] = useState<Checkpoint[]>([]);
    const [newRouteName, setNewRouteName] = useState<string>('');

    // Add checkpoint
    const addCheckpoint = () => {
        const availableCheckpoints = getAvailableCheckpoints(selectedCheckpoints.length);
        if (availableCheckpoints.length > 0)
            setSelectedCheckpoints([...selectedCheckpoints, availableCheckpoints[0]]);
    };

    // Remove checkpoint
    const removeCheckpoint = (index: number) => {
        if (index < 1)
            return;
        let arr: Checkpoint[];
        arr = selectedCheckpoints.slice(0, index)
                                 .concat(selectedCheckpoints.slice(index + 1))
                                 .filter((value, i, arr) => i === 0 || value !== arr[i - 1]);
        setSelectedCheckpoints(arr);
    };

    // Get available checkpoints
    const getAvailableCheckpoints = (currentIndex: number): Checkpoint[] => {
        if (currentIndex === 0) 
            return checkpoints;
        const previousCheckpoint = selectedCheckpoints[currentIndex - 1];
        if (currentIndex === checkpoints.length - 1)
            return checkpoints.filter(checkpoint => checkpoint !== previousCheckpoint);
        const nextCheckpoint = selectedCheckpoints[currentIndex + 1];
        return checkpoints.filter(checkpoint => checkpoint !== previousCheckpoint && checkpoint !== nextCheckpoint);
    };

    // Add created route to table
    const addRoute = async () => {

        // Add position to checkpoint list
        let checkpoints: Checkpoint[] = selectedCheckpoints;
        for (let i = 0; i < selectedCheckpoints.length; i++)
            checkpoints[i].position = i + 1;

        // Create route
        const data = {
            route_name: newRouteName,
            checkpoint_routes: selectedCheckpoints
        };
        await createRoute(data);
    };

    // Validate route
    const validateRoute = () => {
        const validCheckpoints = selectedCheckpoints.filter(checkpoint => checkpoint.checkpoint_name !== '');
        if (validCheckpoints.length < 2 || newRouteName.trim() === '')
            return;
        addRoute();

        // Reset after adding route
        setSelectedCheckpoints([]);
        setNewRouteName('');
    };

    return (
        <>
            <h2 className="text-2xl text-gray-800 font-bold mb-4">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add a route
            </h2>

            <div className="mb-4">
            <input
                type="text"
                id="route-name"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={newRouteName}
                onChange={(e) => setNewRouteName(e.target.value)}
                placeholder="Enter route name"
            />
            </div>

            <div className="mb-4">
                {selectedCheckpoints.map((selectedCheckpoint, index) => (
                    <div key={index} className="mb-1 flex items-center">
                        {index !== 0 && (
                            <button
                            onClick={() => removeCheckpoint(index)}
                            className="bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-600 flex items-center justify-center mr-2"
                            title="Supprimer ce checkpoint"
                            >
                            <FontAwesomeIcon icon={faMinus} />
                            </button>
                        )}

                        <select
                            id={`checkpoint-${index}`}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={selectedCheckpoint.checkpoint_name}
                            onChange={(e) => {
                            const updatedCheckpoints = [...selectedCheckpoints];
                            updatedCheckpoints[index] = checkpoints.find(
                                (checkpoint) => checkpoint.checkpoint_name === e.target.value
                            )!;
                            setSelectedCheckpoints(updatedCheckpoints);
                            }}
                        >
                            {getAvailableCheckpoints(index).map((checkpoint) => (
                            <option key={checkpoint.id} value={checkpoint.checkpoint_name}>
                                {checkpoint.checkpoint_name}
                            </option>
                            ))}
                        </select>
                    </div>
                ))}

                <button
                    onClick={addCheckpoint}
                    className="bg-gray-800 text-white rounded px-4 py-2 w-full hover:bg-gray-900 transition-colors flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                </button>
            </div>

            {selectedCheckpoints.filter((checkpoint) => checkpoint !== null).length >= 2 && newRouteName.trim() !== '' && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={validateRoute}
                        className="bg-blue-500 text-white font-bold rounded px-6 py-3 hover:bg-blue-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Validate
                    </button>
                </div>
            )}
        </>
    );
};

export default RouteCreate;
