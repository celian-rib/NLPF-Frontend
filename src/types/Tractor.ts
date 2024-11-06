import { Checkpoint } from "./Checkpoint";
import { Route } from "./Route";
import { TractorType } from "./TractorType";
import { UserInfo } from "./UserInfo";

export interface Tractor {
    id: string;
    tractor_name: string;
    status: string;
    volume: number;
    occupied_volume?: number;
    type: TractorType;
    route?: Route;
    min_price: number;
    current_checkpoint: Checkpoint;
    start_checkpoint: Checkpoint;
    end_checkpoint: Checkpoint;
    traffic_managers?: UserInfo[];
}