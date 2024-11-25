import { Marker} from 'react-leaflet';
import { Checkpoint } from '../../types/Checkpoint';
import { createCustomIcon } from '../../utils/mapUtils';

interface CheckpointMarkerProps {
    checkpoint: Checkpoint;
}

const CheckpointMarker = ({
    checkpoint,
}: CheckpointMarkerProps) => {

    return (
        <Marker
            key={checkpoint.id}
            position={[
                checkpoint.checkpoint_latitude,
                checkpoint.checkpoint_longitude,
            ]}
            icon={createCustomIcon('location-pin', '#a855f7', 20)}
        >
        </Marker>
    );
};

export default CheckpointMarker;
