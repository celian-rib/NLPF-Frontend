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

    console.log("item: ", item);
    console.log("trafficManagers: ", trafficManagers);

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
            ) : (
                <select className="border border-gray-300 rounded px-2 py-1 mx-auto w-4/5"
                    onChange={(e) => handleTrafficManagerSelection(e.target.value)}
                    defaultValue=""
                >
                    {trafficManagers?.map((trafficManager: UserInfo) => (
                        <option key={trafficManager.user_id} value={trafficManager.user_id}>
                            {trafficManager.username}
                        </option>
                    ))}
                </select>
            )}
        </td>
    );
};

export default TrafficManagerSelect;
