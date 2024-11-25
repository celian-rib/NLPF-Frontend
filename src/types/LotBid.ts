export interface LotBid {
    id: string;
    bid: number;
    user_id: string;
    accepted: boolean;
    created_at: string;
    offer_id: string;
    lot_id: string;
}