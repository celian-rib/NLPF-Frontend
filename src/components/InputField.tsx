import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface InputFieldProps {
    type: string;
    id: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: any;
}

const InputField: React.FC<InputFieldProps> = ({ type, id, placeholder, value, onChange, icon }) => (
    <div className="mb-4 relative">
        <FontAwesomeIcon icon={icon} className="absolute left-3 top-2.5 text-gray-400" />
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
        />
    </div>
);

export default InputField;
