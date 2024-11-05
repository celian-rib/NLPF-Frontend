import React from 'react';
import { UserInfo } from '../../types/UserInfo';

interface TrafficManagerSelectProps {
    trafficManagers: UserInfo[];
}

const TrafficManagerSelect: React.FC<TrafficManagerSelectProps> = ({ trafficManagers }) => {
    return (
        <td className="border text-center p-2">
            {trafficManagers.length === 0 ? (
                <span className="text-gray-400">None</span>
            ) : trafficManagers.length === 1 ? (
                <span className="text-black">{trafficManagers[0].username}</span>
            ) : (
                <select className="border border-gray-300 rounded px-2 py-1 mx-auto w-4/5">
                    {trafficManagers.map((traffic_manager: UserInfo) => (
                        <option key={traffic_manager.id} value={traffic_manager.id}>
                            {traffic_manager.username}
                        </option>
                    ))}
                </select>
            )}
        </td>
    );
};

export default TrafficManagerSelect;
