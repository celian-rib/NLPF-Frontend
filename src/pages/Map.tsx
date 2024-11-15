import React from "react";
import Navbar from "../components/navbar/Navbar";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {

    const center: LatLngExpression = [44.9068, 3.9598];
    const zoom = 5;

    return (
        <>
            <Navbar />

            <div className="h-screen w-full mt-32">
                <MapContainer
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                    preferCanvas={true}
                    zoomControl={false}
                    worldCopyJump={true}
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
        </>
    );
};

export default Map;