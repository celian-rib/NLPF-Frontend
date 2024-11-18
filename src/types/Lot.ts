import { Checkpoint } from "./Checkpoint";
import { LotType } from "./LotType";
import { Tractor } from "./Tractor";

export interface Lot {
    id: string;
    lot_name: string;
    status: string;
    volume: number;
    type: LotType;
    max_price: number;
    current_checkpoint: Checkpoint;
    start_checkpoint: Checkpoint;
    end_checkpoint: Checkpoint;
    tractor?: Tractor;
}