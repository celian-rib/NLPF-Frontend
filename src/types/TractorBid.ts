export interface TractorBid {
    id: string;
    bid: number;
    user_id: string;
    accepted: boolean;
    created_at: string;
    offer_id: string;
    tractor_id: string;
}