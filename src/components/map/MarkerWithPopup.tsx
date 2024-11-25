import { Tractor } from '../../types/Tractor';
import { Lot } from '../../types/Lot';
import { Marker, Popup } from 'react-leaflet';
import { createCustomIcon } from '../../utils/mapUtils';

interface MarkerWithPopupProps<T> {
    item: T;
    itemType: 'lot' | 'tractor';
    iconName: string,
    iconColor: string,
    iconSize: number,
}

const MarkerWithPopup = <T extends Lot | Tractor>({
    item,
    itemType,
    iconName,
    iconColor,
    iconSize,
}: MarkerWithPopupProps<T>) => {

    // Check if the item is a lot
    const isLot = (item: Lot | Tractor): item is Lot => itemType === 'lot';

    return (
        <Marker
            key={item.id}
            position={[
                item.current_checkpoint.checkpoint_latitude,
                item.current_checkpoint.checkpoint_longitude,
            ]}
            icon={createCustomIcon(iconName, iconColor, iconSize)}
        >
            <Popup>
                <div>
                    <h1>{isLot(item) ? item.lot_name : item.tractor_name}</h1>
                    <p><strong>Status:</strong> {item.status}</p>
                    <p><strong>Location:</strong> {item.current_checkpoint.checkpoint_name}</p>
                    <p><strong>Departure:</strong> {item.start_checkpoint.checkpoint_name}</p>
                    <p><strong>Arrival:</strong> {item.end_checkpoint.checkpoint_name}</p>
                </div>
            </Popup>
        </Marker>
    );
};

export default MarkerWithPopup;
