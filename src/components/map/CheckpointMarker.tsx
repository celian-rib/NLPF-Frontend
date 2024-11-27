import { Marker, Popup} from 'react-leaflet';
import { Checkpoint } from '../../types/Checkpoint';
import { createCustomIcon } from '../../utils/mapUtils';

interface CheckpointMarkerProps {
    checkpoint: Checkpoint;
    zIndex: number;
}

const CheckpointMarker = ({
    checkpoint,
    zIndex,
}: CheckpointMarkerProps) => {

    return (
        <Marker
            key={checkpoint.id}
            position={[
                checkpoint.checkpoint_latitude,
                checkpoint.checkpoint_longitude,
            ]}
            icon={createCustomIcon('location-pin', '#64748b', 20, false)}
            zIndexOffset={zIndex}
        >
            <Popup>
                <div className="px-2 py-0 bg-white rounded-md text-center">
                    <h1 className="text-lg font-bold text-gray-800 mb-0">
                        {checkpoint.checkpoint_name}
                    </h1>
                    <p className="text-sm text-gray-600 !m-0">
                        {checkpoint.country}
                    </p>
                </div>
            </Popup>
        </Marker>
    );
};

export default CheckpointMarker;
