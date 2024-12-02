import React, { useEffect, useState } from 'react';
import { createPackageOffer, createTractorOffer } from '../../../services/stockExchange';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getCurrentDate } from '../../../services/simulation';

interface StockExchangeModalProps<T> {
    item: T;
    itemType: 'package' | 'tractor';
    closeModal: () => void;
}

const AddToStockExchangeModal = <T extends { id: string }>({
    item,
    itemType,
    closeModal,
}: StockExchangeModalProps<T>) => {
    const [limitDate, setLimitDate] = useState<string>('');
    const [minDate, setMinDate] = useState<string>('');

    // Fetch current date
    const fetchDate = async () => {
        const data = await getCurrentDate();
        if (!data)
            return;
        const formattedDate = new Date(data).toISOString().split('T')[0];
        setMinDate(formattedDate);
    };

    useEffect(() => {
        fetchDate();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            ...(itemType === 'package' ? { package_id: item.id } : { tractor_id: item.id }),
            limit_date: new Date(limitDate).toISOString(),
        };
        if (itemType === 'package')
        {
            // Create package offer using Stock Exchange API
            await createPackageOffer(data);
        }
        else if (itemType === 'tractor')
        {
            // Create tractor offer using Stock Exchange API
            await createTractorOffer(data);
        }
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={closeModal}>
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6">{`Stock exchange`}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Limit Date :</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 p-2 rounded"
                            value={limitDate}
                            onChange={(e) => setLimitDate(e.target.value)}
                            min={minDate}
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600">
                            <FontAwesomeIcon icon={faCheck} className="mr-2" />
                            <span className="font-bold">Add</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddToStockExchangeModal;
