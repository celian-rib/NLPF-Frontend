import { Checkpoint } from "./Checkpoint";

export interface Route {
    route_id: string;
    route_name: string;
    checkpoint_routes: Checkpoint[];
    traffic_manager_id?: string;
}