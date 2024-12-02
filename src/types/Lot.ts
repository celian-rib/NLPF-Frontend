import { Checkpoint } from "./Checkpoint";
import { PackageType } from "./PackageType";
import { Tractor } from "./Tractor";
import { UserInfo } from "./UserInfo";

export interface Package {
    id: string;
    package_name: string;
    status: string;
    volume: number;
    type: PackageType;
    max_price: number;
    current_checkpoint: Checkpoint;
    start_checkpoint: Checkpoint;
    end_checkpoint: Checkpoint;
    tractor?: Tractor;
    traffic_manager?: UserInfo | null;
}