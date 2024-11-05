import { Checkpoint } from "./Checkpoint";

export interface Route {
    traffic_manager_id: string;
    route_name: string;
    checkpoint_routes: Checkpoint[];
}