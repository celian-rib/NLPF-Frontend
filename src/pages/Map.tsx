import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import DisplayLayerButtons from "../components/map/DisplayLayerButtons";
import { Package } from '../types/Package';
import { getPackagesByClientId, getTractorsByClientId } from '../services/assets';
import { getAllCheckpoints, getPackagesByTrafficManagerId, getTractorsByTrafficManagerId } from '../services/trafficManager';
import { Checkpoint } from '../types/Checkpoint';
import { Tractor } from '../types/Tractor';
import MarkerWithPopup from '../components/map/MarkerWithPopup';
import CheckpointMarker from '../components/map/CheckpointMarker';
import { Route } from '../types/Route';
import { getStatusColorHex } from '../utils/utils';
import { AssignedRoute } from '../types/AssignedRoute';
import { useWebSocket } from '../socket/WebSocketContext';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { createCustomClusterIcon } from '../utils/mapUtils';

const Map: React.FC = () => {
    const [userRole, setUserRole] = useState<string>('');
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [tractors, setTractors] = useState<Tractor[]>([]);
    const [routes, setRoutes] = useState<AssignedRoute[]>([]);

    const { simulationDate, messageBroadcasted } = useWebSocket();

    const center: LatLngExpression = [44.9068, 3.9598];
    const zoom = 5;

    // State for the active buttons
    const [activeButtons, setActiveButtons] = useState<{ [key: string]: boolean }>({
        packages: true,
        checkpoints: true,
        tractors: true,
        routes: true,
    });  

    // Fetch packages
    const fetchPackages = async () => {
        let data;
        if (userRole === 'client')
            data = await getPackagesByClientId();
        else if (userRole === 'traffic-manager')
            data = await getPackagesByTrafficManagerId();
        else
            return;
        if (!data)
            return;
        setPackages(data);
    };

    // Fetch tractors
    const fetchTractors = async () => {
        let data;
        if (userRole === 'client')
            data = await getTractorsByClientId();
        else if (userRole === 'traffic-manager')
            data = await getTractorsByTrafficManagerId();
        else
            return;
        if (!data)
            return;
        setTractors(data);
        return data;
    };

    // Fetch checkpoints
    const fetchCheckpoints = async () => {
        const data = await getAllCheckpoints();
        if (!data)
            return;
        setCheckpoints(data);
    };

    // Get assigned routes
    const fetchRoutesAndTractors = async () => {
        const data = await fetchTractors();
        if (!data)
            return
        let assignedRoutes: AssignedRoute[] = [];
        let assignedRoute: AssignedRoute;
        for (let i = 0; i < data.length; i++)
        {
            if (data[i].route && data[i].route?.route_name)
            {
                assignedRoute = {
                    tractor: data[i],
                    route: data[i].route as Route
                };
                assignedRoutes.push(assignedRoute);
            }
        }
        setRoutes(assignedRoutes);
    };

    // Fetch user role
    useEffect(() => {
        const role: string = localStorage.getItem('user_role') || '';
        setUserRole(role || '');
    }, []);
    
    useEffect(() => {
        if (userRole)
        {
            fetchPackages();
            fetchRoutesAndTractors();
        }
        fetchCheckpoints();
        // eslint-disable-next-line
    }, [userRole, simulationDate, messageBroadcasted]);

    return (
        <>
            <Navbar />

            <div className="h-screen w-full mt-28 relative">
                <div className="absolute inset-0 z-0">
                    <MapContainer
                        center={center}
                        zoom={zoom}
                        scrollWheelZoom={true}
                        className="h-full w-full"
                        preferCanvas={true}
                        zoomControl={false}
                        worldCopyJump={true}
                        minZoom={3}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            tileSize={512}
                            zoomOffset={-1}
                            detectRetina={true}
                        />

                        <MarkerClusterGroup iconCreateFunction={createCustomClusterIcon}>
                            {activeButtons.packages &&
                                packages.map((package) => (
                                    <MarkerWithPopup
                                        key={`package-${package.id}`}
                                        item={package}
                                        itemType={'package'}
                                        iconName={'box'}
                                        iconColor={getStatusColorHex(package.status)}
                                        iconSize={40}
                                        zIndex={500}
                                    />
                                ))}
                            
                            {activeButtons.tractors &&
                                tractors.map((tractor) => (
                                    <MarkerWithPopup
                                        key={`tractor-${tractor.id}`}
                                        item={tractor}
                                        itemType={'tractor'}
                                        iconName={'truck'}
                                        iconColor={getStatusColorHex(tractor.status)}
                                        iconSize={35}
                                        zIndex={1000}
                                    />
                                ))}
                        </MarkerClusterGroup>

                        {activeButtons.checkpoints &&
                            checkpoints.map((checkpoint) => (
                                <CheckpointMarker
                                    key={`checkpoint-${checkpoint.id}`}
                                    checkpoint={checkpoint}
                                    zIndex={0}
                                />
                            ))}

                        {activeButtons.routes &&
                            routes.map((route, index) => (
                                <Polyline
                                    key={`route-${index}`}
                                    positions={route.route.checkpoint_routes.map((checkpoint) => [
                                        checkpoint.checkpoint_latitude,
                                        checkpoint.checkpoint_longitude,
                                    ])}
                                    color={getStatusColorHex(route.tractor.status)}
                                    weight={2}
                                />
                            ))}
                    </MapContainer>
                </div>

                <DisplayLayerButtons
                    activeButtons={activeButtons}
                    setActiveButtons={setActiveButtons}
                />

            </div>
        </>
    );
};

export default Map;
