declare module '@changey/react-leaflet-markercluster' {
    import { ComponentType } from 'react';
    import { LayerGroupProps } from 'react-leaflet';
    import { DivIcon } from 'leaflet';
    import { ReactNode } from 'react';

    const MarkerClusterGroup: ComponentType<LayerGroupProps & {
        spiderfyOnMaxZoom?: boolean;
        showCoverageOnHover?: boolean;
        maxClusterRadius?: number;
        disableClusteringAtZoom?: number;
        removeOutsideVisibleBounds?: boolean;
        animate?: boolean;
        spiderfyDistanceMultiplier?: number;
        chunkedLoading?: boolean;
        iconCreateFunction?: (cluster: any) => DivIcon;
        children?: ReactNode;
    }>;

    export default MarkerClusterGroup;
}