import 'leaflet/dist/leaflet.css';
import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import DisplayLayerButtons from "../components/map/DisplayLayerButtons";

const Map: React.FC = () => {
    const center: LatLngExpression = [44.9068, 3.9598];
    const zoom = 5;

    // State for the active buttons
    const [activeButtons, setActiveButtons] = useState<{ [key: string]: boolean }>({
        lots: false,
        checkpoints: false,
        tractors: false,
        routes: false,
    });

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
