import { Tractor } from "./Tractor";
import { TractorOffer } from "./TractorOffer";

export interface TractorBid {
    id: string;
    bid: number;
    user_id: string;
    accepted: string;
    created_at: string;
    offer_id: string;
    tractor_id: string;
    tractor?: Tractor;
    tractorOffer?: TractorOffer;
}