import React from 'react';
import { Lot } from '../../types/Lot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { Tractor } from '../../types/Tractor';
import { Route } from '../../types/Route';
import { formatRouteAsString } from '../../utils/utils';

interface RouteAssignProps {
    tractor: Tractor;
    compatibleRoutes: Route[];
}

const RouteAssign: React.FC<RouteAssignProps> = ({
    tractor,
    compatibleRoutes,
}) => {

    return (
        <td className="border p-2 text-center max-w-28">
            {tractor.status === 'pending' && tractor.route?.route_id == null ? (
                compatibleRoutes.length > 0 ? (
                    <select
                        value=""
                        className="border border-gray-300 rounded px-2 py-1 mx-auto w-4/5"
                        onChange={() => {}}
                    >
                        <option value="" disabled>Select a route</option>
                        {compatibleRoutes.map((route) => (
                            <option key={route.route_id} value={route.route_id}>
                                {formatRouteAsString(route)}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className="px-2 py-1 mx-auto w-4/5 block text-gray-500">None</span>
                )
            ) : tractor.route ? (
                <span className="px-2 py-1 mx-auto w-4/5 block">{tractor.route.route_name}</span>
            ) : (
                <span className="px-2 py-1 mx-auto w-4/5 block text-gray-500">None</span>
            )}
        </td>
    );
};

export default RouteAssign;
