import { Lot } from "./Lot";
import { LotOffer } from "./LotOffer";

export interface LotBid {
    id: string;
    bid: number;
    user_id: string;
    accepted: string;
    created_at: string;
    offer_id: string;
    lot_id: string;
    lot?: Lot;
    lotOffer?: LotOffer;
}