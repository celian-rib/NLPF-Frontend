import { Checkpoint } from "./Checkpoint";
import { TractorType } from "./TractorType";

export interface TractorOffer {
    id: string;
    status: string;
    volume: number;
    type: TractorType;
    current_price: number;
    min_price: number;
    current_checkpoint: Checkpoint;
    start_checkpoint: Checkpoint;
    end_checkpoint: Checkpoint;
    limit_date: string;
}