import { Package } from "./Package";
import { PackageOffer } from "./PackageOffer";

export interface PackageBid {
    id: string;
    bid: number;
    user_id: string;
    accepted: string;
    created_at: string;
    offer_id: string;
    package_id: string;
    package?: Package;
    packageOffer?: PackageOffer;
}