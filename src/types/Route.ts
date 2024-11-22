import { Checkpoint } from "./Checkpoint";

export interface Route {
    id: string;
    route_name: string;
    checkpoint_routes: Checkpoint[];
    traffic_manager_id?: string;
}