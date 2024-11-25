import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import DisplayLayerButtons from "../components/map/DisplayLayerButtons";
import { Lot } from '../types/Lot';
import { getLotsByClientId, getTractorsByClientId } from '../services/assets';
import { getAllCheckpoints, getLotsByTrafficManagerId, getTractorsByTrafficManagerId } from '../services/trafficManager';
import { Checkpoint } from '../types/Checkpoint';
import { Tractor } from '../types/Tractor';

const Map: React.FC = () => {
    const [userRole, setUserRole] = useState<string>('');
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [lots, setLots] = useState<Lot[]>([]);
    const [tractors, setTractors] = useState<Tractor[]>([]);

    const center: LatLngExpression = [44.9068, 3.9598];
    const zoom = 5;

    // State for the active buttons
    const [activeButtons, setActiveButtons] = useState<{ [key: string]: boolean }>({
        lots: true,
        checkpoints: true,
        tractors: true,
        routes: true,
    });

    // Generate a custom icon
    const createCustomIcon = (name: string, color: string, size: number) => {
        return L.divIcon({
            html: `<div style="display: flex; justify-content: center; align-items: center;">
                    <i class="fas fa-${name}" style="font-size: ${size}px; color: ${color};"></i>
                </div>`,
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
        });
    };    

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
    };

    // Fetch checkpoints
    const fetchCheckpoints = async () => {
        const data = await getAllCheckpoints();
        if (!data)
            return;
        setCheckpoints(data);
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
            fetchTractors();
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
                                <Marker
                                    key={lot.id}
                                    position={[
                                        lot.current_checkpoint.checkpoint_latitude,
                                        lot.current_checkpoint.checkpoint_longitude,
                                    ]}
                                    icon={createCustomIcon('box', '#d946ef', 40)}
                                >
                                    <Popup>
                                        <div>
                                            <h1>{lot.lot_name}</h1>
                                            <p><strong>Status:</strong> {lot.status}</p>
                                            <p><strong>Location:</strong> {lot.current_checkpoint.checkpoint_name}</p>
                                            <p><strong>Departure:</strong> {lot.start_checkpoint.checkpoint_name}</p>
                                            <p><strong>Arrival:</strong> {lot.end_checkpoint.checkpoint_name}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                        {activeButtons.tractors &&
                            tractors.map((tractor) => (
                                <Marker
                                    key={tractor.id}
                                    position={[
                                        tractor.current_checkpoint.checkpoint_latitude,
                                        tractor.current_checkpoint.checkpoint_longitude,
                                    ]}
                                    icon={createCustomIcon('truck', '#6366f1', 35)}
                                >
                                    <Popup>
                                        <div>
                                            <h3>{tractor.tractor_name}</h3>
                                            <p><strong>Status:</strong> {tractor.status}</p>
                                            <p><strong>Volume:</strong> {tractor.volume}</p>
                                            <p><strong>Max Price:</strong> {tractor.min_price}</p>
                                            <p><strong>Current Checkpoint:</strong> {tractor.current_checkpoint.checkpoint_name}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                        {activeButtons.checkpoints &&
                            checkpoints.map((checkpoint) => (
                                <Marker
                                    key={checkpoint.id}
                                    position={[
                                        checkpoint.checkpoint_latitude,
                                        checkpoint.checkpoint_longitude,
                                    ]}
                                    icon={createCustomIcon('location-pin', '#a855f7', 20)}
                                >
                                </Marker>
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
