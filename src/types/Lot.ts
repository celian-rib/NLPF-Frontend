import { Checkpoint } from "./Checkpoint";
import { LotType } from "./LotType";
import { UserInfo } from "./UserInfo";

export interface Lot {
    id: string;
    status: string;
    volume: number;
    created_at: string;
    type: LotType;
    max_price: number;
    current_checkpoint: Checkpoint;
    start_checkpoint: Checkpoint;
    end_checkpoint: Checkpoint;
    traffic_managers: UserInfo[];
}