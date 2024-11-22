import React from 'react';
import { Tractor } from '../../types/Tractor';
import { Route } from '../../types/Route';
import { formatRouteAsString } from '../../utils/utils';
import { assignRouteToTractor } from '../../services/trafficManager';

interface RouteAssignProps {
    tractor: Tractor;
    compatibleRoutes: Route[];
    onTableUpdated: () => void;
}

const RouteAssign: React.FC<RouteAssignProps> = ({
    tractor,
    compatibleRoutes,
    onTableUpdated,
}) => {

    const handleRouteSelection = async (routeId: string) => {
        // Assign route to tractor using Traffic Manager API
        await assignRouteToTractor(routeId, tractor.id);
        onTableUpdated();
    }

    return (
        <td className="border p-2 text-center max-w-28">
            {tractor.route && tractor.route.route_name ? (
                <span className="px-2 py-1 mx-auto w-4/5 block">{tractor.route.route_name}</span>
            ) : tractor.status === 'pending' && tractor.route?.id == null ? (
                compatibleRoutes.length > 0 ? (
                    <select
                        value=""
                        className="border border-gray-300 rounded px-2 py-1 mx-auto w-4/5"
                        onChange={(event) => handleRouteSelection(event.target.value)}
                    >
                        <option value="" disabled>Select a route</option>
                        {compatibleRoutes.map((route) => (
                            <option key={route.id} value={route.id}>
                                {formatRouteAsString(route, true)}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className="px-2 py-1 mx-auto w-4/5 block text-gray-500">None</span>
                )
            ) : (
                <span className="px-2 py-1 mx-auto w-4/5 block text-gray-500">None</span>
            )}
        </td>
    );
};

export default RouteAssign;
