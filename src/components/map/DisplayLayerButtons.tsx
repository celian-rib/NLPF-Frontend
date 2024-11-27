import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface DisplayLayerButtonsProps {
    activeButtons: { [key: string]: boolean };
    setActiveButtons: React.Dispatch<React.SetStateAction<{[key: string]: boolean;}>>;
}

const DisplayLayerButtons: React.FC<DisplayLayerButtonsProps> = ({activeButtons, setActiveButtons}) => {

    // Function to toggle the buttons
    const toggleButton = (buttonKey: string) => {
        setActiveButtons((prev) => ({
            ...prev,
            [buttonKey]: !prev[buttonKey],
        }));
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50 w-40">
            <button
                onClick={() => toggleButton("lots")}
                className={`py-2 px-4 rounded-md shadow transition ${
                    !activeButtons.lots ? "bg-red-500 hover:bg-red-700" : "bg-gray-800 hover:bg-black"
                } text-white`}
            >
                <FontAwesomeIcon
                    icon={!activeButtons.lots ? faEyeSlash : faEye}
                    className="mr-2"
                />
                Lots
            </button>

            <button
                onClick={() => toggleButton("checkpoints")}
                className={`py-2 px-4 rounded-md shadow transition ${
                    !activeButtons.checkpoints ? "bg-red-500 hover:bg-red-700" : "bg-gray-800 hover:bg-black"
                } text-white`}
            >
                <FontAwesomeIcon
                    icon={!activeButtons.checkpoints ? faEyeSlash : faEye}
                    className="mr-2"
                />
                Checkpoints
            </button>

            <button
                onClick={() => toggleButton("tractors")}
                className={`py-2 px-4 rounded-md shadow transition ${
                    !activeButtons.tractors ? "bg-red-500 hover:bg-red-700" : "bg-gray-800 hover:bg-black"
                } text-white`}
            >
                <FontAwesomeIcon
                    icon={!activeButtons.tractors ? faEyeSlash : faEye}
                    className="mr-2"
                />
                Tractors
            </button>

            <button
                onClick={() => toggleButton("routes")}
                className={`py-2 px-4 rounded-md shadow transition ${
                    !activeButtons.routes ? "bg-red-500 hover:bg-red-700" : "bg-gray-800 hover:bg-black"
                } text-white`}
            >
                <FontAwesomeIcon
                    icon={!activeButtons.routes ? faEyeSlash : faEye}
                    className="mr-2"
                />
                Routes
            </button>
        </div>
    );
};

export default DisplayLayerButtons;
