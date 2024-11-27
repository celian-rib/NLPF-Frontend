export interface Checkpoint {
    id: string;
    checkpoint_name: string;
    checkpoint_latitude: number;
    checkpoint_longitude: number;
    position?: number;
    country?: string;
}