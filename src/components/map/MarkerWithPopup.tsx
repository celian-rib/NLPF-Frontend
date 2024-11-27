import { Tractor } from '../../types/Tractor';
import { Lot } from '../../types/Lot';
import { Marker, Popup } from 'react-leaflet';
import { createCustomIcon } from '../../utils/mapUtils';
import { getStatusInfo } from '../../utils/utils';

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
                <div className="px-4 py-2 bg-white rounded-md text-center">
                    <h1 className="text-lg font-bold text-gray-800 mb-2">
                        {isLot(item) ? item.lot_name : item.tractor_name}
                    </h1>
                    <span className={`px-2 py-1 rounded ${getStatusInfo(item.status).color}`}>
                        {getStatusInfo(item.status).text}
                    </span>
                    <div className="mt-3">
                        <p className="text-sm text-gray-600 !m-0">
                            <strong className="font-semibold">Location:</strong> {item.current_checkpoint.checkpoint_name}
                        </p>
                        <p className="text-sm text-gray-600 !m-0">
                            <strong className="font-semibold">Departure:</strong> {item.start_checkpoint.checkpoint_name}
                        </p>
                        <p className="text-sm text-gray-600 !m-0">
                            <strong className="font-semibold">Arrival:</strong> {item.end_checkpoint.checkpoint_name}
                        </p>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default MarkerWithPopup;
