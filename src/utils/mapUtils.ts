import L from 'leaflet';

// Generate a custom icon
export const createCustomIcon = (name: string, color: string, size: number, shadow: boolean) => {
    return L.divIcon({
        html: `<div style="display: flex; justify-content: center; align-items: center;">
                <i class="fas fa-${name}" style="font-size: ${size}px; color: ${color}; ${shadow ? `text-shadow: ${color}80 1px 0 5px;` : ''}"></i>
            </div>`,
        className: '',
        iconSize: [size + 5, size + 5],
        iconAnchor: [(size + 5) / 2, (size + 5) / 2],
    });
};

// Generate a custom cluster icon
export const createCustomClusterIcon = (cluster: any) => {
    const count = cluster.getChildCount();
    let size = 'small';
    if (count >= 50)
        size = 'large';
    else if (count >= 20)
        size = 'medium';
    const icon = L.divIcon({
        html: `<div
                 style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #1e293b;
                 "
               >
                <span
                 style="
                    color: white;
                    font-size: 20px;
                    font-weight: bold;
                 "
                >
                    ${count}
                </span>
               </div>`,
        className: `marker-cluster marker-cluster-${size}`,
        iconSize: L.point(40, 40, true),
    });
    cluster.setZIndexOffset(3000);
    return icon;
};