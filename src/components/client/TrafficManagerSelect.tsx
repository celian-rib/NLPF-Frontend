import { UserInfo } from '../../types/UserInfo';
import { Tractor } from '../../types/Tractor';
import { Lot } from '../../types/Lot';

interface TrafficManagerSelectProps<T> {
    item: T;
    trafficManagers: UserInfo[] | null;
}

const TrafficManagerSelect = <T extends Lot | Tractor>({
    item,
    trafficManagers,
}: TrafficManagerSelectProps<T>) => {

    // Function to handle traffic manager selection
    const handleTrafficManagerSelection = (trafficManagerId: string) => {
        if (item.traffic_manager)
            item.traffic_manager.user_id = trafficManagerId;
        else
            item.traffic_manager = { user_id: trafficManagerId };
    };

    return (
        <td className="border text-center p-2">
            {item.traffic_manager ? (
                <span className="text-black">{item.traffic_manager.username}</span>
            ) : !trafficManagers ? (
                <span className="text-gray-400">None</span>
            ) : trafficManagers?.length === 1 ? (
                <span className="text-black">{trafficManagers[0].username}</span>
            ) : item.status === 'available' ? (
                <select className="border border-gray-300 rounded px-2 py-1 mx-auto w-4/5"
                    onChange={(e) => handleTrafficManagerSelection(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Select a traffic manager</option>
                    {trafficManagers?.map((trafficManager: UserInfo) => (
                        <option key={trafficManager.user_id} value={trafficManager.user_id}>
                            {trafficManager.username}
                        </option>
                    ))}
                </select>
            ) : (
                <span className="text-gray-400">None</span>
            )}
        </td>
    );
};

export default TrafficManagerSelect;
