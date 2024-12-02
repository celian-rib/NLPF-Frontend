import React, { useState } from 'react';
import { Checkpoint } from '../../../types/Checkpoint';
import { validateInputNumber } from '../../../utils/utils';
import { createPackage, createTractor } from '../../../services/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface AddItemModalProps {
    closeModal: () => void;
    types: string[];
    checkpoints: Checkpoint[];
    itemType: 'package' | 'tractor';
}

const AddItemModal: React.FC<AddItemModalProps> = ({ closeModal, types, checkpoints, itemType }) => {
    const [name, setName] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [volume, setVolume] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
    const [selectedArrival, setSelectedArrival] = useState<string | null>(null);

    // Validation function for volume and price
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => validateInputNumber(e, setVolume);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => validateInputNumber(e, setPrice);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (parseFloat(volume) <= 0)
        {
            alert('Volume must be greater than 0.');
            return;
        }

        if (parseFloat(price) <= 0.1)
        {
            alert('Price must be greater than 0.1.');
            return;
        }

        const data = {
            client_id: localStorage.getItem('user_id'),
            ...(itemType === 'package' ? { package_name: name } : { tractor_name: name }),
            volume: parseFloat(volume),
            type: selectedType.toLowerCase(),
            ...(itemType === 'package' ? { max_price: parseFloat(price) } : { min_price: parseFloat(price) }),
            start_checkpoint_id: selectedDeparture,
            end_checkpoint_id: selectedArrival,
        };
        if (itemType === 'package')
        {
            // Create a package using assets API
            await createPackage(data);
        }
        else if (itemType === 'tractor')
        {
            // Create a tractor using assets API
            await createTractor(data);
        }
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>

                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={closeModal}>
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">Add a {itemType}</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name :</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Type :</label>
                        <select 
                            className="w-full border border-gray-300 p-2 rounded" 
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            required
                        >
                            <option disabled key="" value="">Select a type</option>
                            {types.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Volume :</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter volume (in m³)"
                            onChange={handleVolumeChange}
                            value={volume}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {itemType === 'package' ? 'Maximum price :' : 'Minimum price :'}
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder={`Enter ${itemType === 'package' ? 'maximum' : 'minimum'} price (per km)`}
                            onChange={handlePriceChange}
                            value={price}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Departure :</label>
                        <select 
                            className="w-full border border-gray-300 p-2 rounded" 
                            value={selectedDeparture || ''}
                            onChange={(e) => setSelectedDeparture(e.target.value)}
                            required
                        >
                            <option disabled key="" value="">Select a checkpoint</option>
                            {checkpoints.map((checkpoint) => (
                                <option key={checkpoint.id} value={checkpoint.id}>
                                    {checkpoint.checkpoint_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Arrival :</label>
                        <select 
                            className="w-full border border-gray-300 p-2 rounded" 
                            value={selectedArrival || ''}
                            onChange={(e) => setSelectedArrival(e.target.value)}
                            required
                        >
                            <option disabled key="" value="">Select a checkpoint</option>
                            {checkpoints.map((checkpoint) => (
                                <option key={checkpoint.id} value={checkpoint.id}>
                                    {checkpoint.checkpoint_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            <span className="font-bold">Add</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;
