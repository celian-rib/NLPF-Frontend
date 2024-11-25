import React, { useState } from 'react';
import { bidOnLot, bidOnTractor } from '../../../services/stockExchange';

interface BidModalProps<T> {
    offer:  T;
    offerType: 'lot' | 'tractor';
    closeModal: () => void;
}

const BidModal = <T extends { id: string, current_price: number, max_price?: number, min_price?: number }>({
    offer,
    offerType,
    closeModal
}: BidModalProps<T>) => {
    const [bidAmount, setBidAmount] = useState<number>(offer.current_price);

    // Function to handle price change
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseFloat(e.target.value);
        setBidAmount(newPrice);
    };

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            bid: bidAmount,
            user_id: localStorage.getItem('user_id')
        };
        if (offerType === 'lot')
        {
            // Make bid on a lot using Stock Exchange API
            await bidOnLot(offer.id, data);
        }
        else if (offerType === 'tractor')
        {
            // Make bid on a tractor using Stock Exchange API
            await bidOnTractor(offer.id, data);
        }
        closeModal();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white text-center p-6 rounded-lg shadow-lg w-1/4"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={closeModal}
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6">{`Bid on the ${offerType}`}</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-bold">Price</label>
                        <p className="text-3xl font-bold text-gray-700">
                            {bidAmount} <span className="font-normal">€/km</span>
                        </p>
                        <input
                            type="range"
                            min={offerType === 'lot' ? offer.current_price : offer.min_price ?? offer.current_price}
                            max={offerType === 'lot' ? offer.max_price ?? offer.current_price : offer.current_price}
                            step="0.1"
                            value={bidAmount}
                            onChange={handlePriceChange}
                            className="range w-full mt-2"
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            <i className="fas fa-check"></i>
                            <span className="font-bold">Validate</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BidModal;
