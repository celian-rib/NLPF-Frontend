import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import DisplayLayerButtons from "../components/map/DisplayLayerButtons";
import { Lot } from '../types/Lot';
import { getLotsByClientId, getTractorsByClientId } from '../services/assets';
import { getAllCheckpoints, getLotsByTrafficManagerId, getTractorsByTrafficManagerId } from '../services/trafficManager';
import { Checkpoint } from '../types/Checkpoint';
import { Tractor } from '../types/Tractor';
import MarkerWithPopup from '../components/map/MarkerWithPopup';
import CheckpointMarker from '../components/map/CheckpointMarker';

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
