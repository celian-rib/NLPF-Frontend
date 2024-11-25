import L from 'leaflet';

// Generate a custom icon
export const createCustomIcon = (name: string, color: string, size: number) => {
    return L.divIcon({
        html: `<div style="display: flex; justify-content: center; align-items: center;">
                <i class="fas fa-${name}" style="font-size: ${size}px; color: ${color};"></i>
            </div>`,
        className: '',
        iconSize: [size + 5, size + 5],
        iconAnchor: [(size + 5) / 2, (size + 5) / 2],
    });
}; 