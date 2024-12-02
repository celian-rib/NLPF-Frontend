import React, { useState } from 'react';
import { bidOnPackage, bidOnTractor } from '../../../services/stockExchange';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TractorOffer } from '../../../types/TractorOffer';
import { PackageOffer } from '../../../types/PackageOffer';

interface BidModalProps<T> {
    offer:  T;
    offerType: 'package' | 'tractor';
    closeModal: () => void;
}

const BidModal = <T extends PackageOffer | TractorOffer>({
    offer,
    offerType,
    closeModal
}: BidModalProps<T>) => {
    const [bidAmount, setBidAmount] = useState<number>(offer.current_price);
    const [volumeAmount, setVolumeAmount] = useState<number>(0);

    // Function to handle price change
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseFloat(e.target.value);
        setBidAmount(newPrice);
    };

    // Function to handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolumeAmount(newVolume);
    };

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            bid: bidAmount,
            user_id: localStorage.getItem('user_id'),
            ...(offerType === 'tractor' ? { volume: volumeAmount } : {}),
        };
        if (offerType === 'package')
        {
            // Make bid on a package using Stock Exchange API
            await bidOnPackage(offer.id, data);
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
                            min={offerType === 'package' ? 0.1 : offer.current_price}
                            max={offerType === 'package' ? offer.current_price : 1000}
                            step="0.1"
                            value={bidAmount}
                            onChange={handlePriceChange}
                            className="range w-full mt-2"
                        />
                    </div>

                    {(offerType === 'tractor' && offer.volume) && (   
                        <div className="mb-4">
                            <label className="block text-gray-700 text-lg font-bold">Volume</label>
                            <p className="text-3xl font-bold text-gray-700">
                                {volumeAmount} <span className="font-normal">m³</span>
                            </p>
                            <input
                                type="range"
                                min={0}
                                max={offer.volume}
                                step="0.1"
                                value={volumeAmount}
                                onChange={handleVolumeChange}
                                className="range w-full mt-2"
                            />
                        </div>
                    )}

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            <FontAwesomeIcon icon={faCheck} className="mr-2" />
                            <span className="font-bold">Validate</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BidModal;
