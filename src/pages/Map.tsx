import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import DisplayLayerButtons from "../components/map/DisplayLayerButtons";
import { Lot } from '../types/Lot';
import { getLotsByClientId, getTractorsByClientId } from '../services/assets';
import { getAllCheckpoints, getLotsByTrafficManagerId, getTractorsByTrafficManagerId } from '../services/trafficManager';
import { Checkpoint } from '../types/Checkpoint';
import { Tractor } from '../types/Tractor';
import MarkerWithPopup from '../components/map/MarkerWithPopup';
import CheckpointMarker from '../components/map/CheckpointMarker';
import { Route } from '../types/Route';

const Map: React.FC = () => {
    const [userRole, setUserRole] = useState<string>('');
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [lots, setLots] = useState<Lot[]>([]);
    const [tractors, setTractors] = useState<Tractor[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);

    const center: LatLngExpression = [44.9068, 3.9598];
    const zoom = 5;

    // State for the active buttons
    const [activeButtons, setActiveButtons] = useState<{ [key: string]: boolean }>({
        lots: true,
        checkpoints: true,
        tractors: true,
        routes: true,
    });  

    // Fetch lots
    const fetchLots = async () => {
        let data;
        if (userRole === 'client')
            data = await getLotsByClientId();
        else if (userRole === 'traffic-manager')
            data = await getLotsByTrafficManagerId();
        else
            return;
        if (!data)
            return;
        setLots(data);
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
        let assignedRoutes: Route[] = [];
        for (let i = 0; i < data.length; i++)
        {
            if (data[i].route && data[i].route?.route_name)
                assignedRoutes.push(data[i].route as Route);
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
            fetchLots();
            fetchRoutesAndTractors();
        }
        fetchCheckpoints();
        // eslint-disable-next-line
    }, [userRole]);

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

                        {activeButtons.lots &&
                            lots.map((lot) => (
                                <MarkerWithPopup
                                    key={`lot-${lot.id}`}
                                    item={lot}
                                    itemType={'lot'}
                                    iconName={'box'}
                                    iconColor={'#d946ef'}
                                    iconSize={40}
                                />
                            ))}

                        {activeButtons.tractors &&
                            tractors.map((tractor) => (
                                <MarkerWithPopup
                                    key={`tractor-${tractor.id}`}
                                    item={tractor}
                                    itemType={'tractor'}
                                    iconName={'truck'}
                                    iconColor={'#6366f1'}
                                    iconSize={35}
                                />
                            ))}

                        {activeButtons.checkpoints &&
                            checkpoints.map((checkpoint) => (
                                <CheckpointMarker
                                    key={`checkpoint-${checkpoint.id}`}
                                    checkpoint={checkpoint}
                                />
                            ))}

                        {activeButtons.routes &&
                            routes.map((route) => (
                                <Polyline
                                    key={`route-${route.id}`}
                                    positions={route.checkpoint_routes.map((checkpoint) => [
                                        checkpoint.checkpoint_latitude,
                                        checkpoint.checkpoint_longitude,
                                    ])}
                                    color="#0ea5e9"
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
