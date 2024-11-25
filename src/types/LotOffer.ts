import { Checkpoint } from "./Checkpoint";
import { LotType } from "./LotType";

export interface LotOffer {
    id: string;
    status: string;
    volume: number;
    type: LotType;
    current_price: number;
    max_price: number;
    current_checkpoint: Checkpoint;
    start_checkpoint: Checkpoint;
    end_checkpoint: Checkpoint;
    limit_date: string;
}