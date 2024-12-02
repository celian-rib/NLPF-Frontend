import { Checkpoint } from "./Checkpoint";
import { PackageType } from "./PackageType";

export interface PackageOffer {
    id: string;
    status: string;
    volume: number;
    type: PackageType;
    current_price: number;
    max_price: number;
    current_checkpoint: Checkpoint;
    start_checkpoint: Checkpoint;
    end_checkpoint: Checkpoint;
    limit_date: string;
}