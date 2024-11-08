import { Checkpoint } from "../types/Checkpoint";
import { Route } from "../types/Route";

// Function to get status color and text
export const getStatusInfo = (state: string): { color: string; text: string } => {
    switch (state) {
        case 'available':
            return { color: 'bg-green-200 text-green-800', text: '◉ Available' };
        case 'pending':
            return { color: 'bg-yellow-200 text-yellow-800', text: '◉ Pending' };
        case 'in_transit':
            return { color: 'bg-orange-200 text-orange-800', text: '◉ In transit' };
        case 'on_market':
            return { color: 'bg-blue-200 text-blue-800', text: '◉ On market' };
        case 'archived':
            return { color: 'bg-gray-200 text-gray-800', text: '◉ Archived' };
        case 'at_trader':
            return { color: 'bg-purple-200 text-purple-800', text: '◉ At trader' };
        case 'return_from_market':
            return { color: 'bg-fuchsia-200 text-fuchsia-800', text: '◉ Return from market' };
        default:
            return { color: 'bg-gray-200 text-gray-800', text: '🛇 Unknown' };
    }
};

// Function to validate input number
export const validateInputNumber = (e: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, '');
    if ((value.match(/\./g) || []).length > 1)
        value = value.replace(/\.+$/, '');
    setValue(value);
};

// Function to format a date as "MM/DD/YYYY"
export const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return `${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}/${parsedDate.getDate().toString().padStart(2, '0')}/${parsedDate.getFullYear()}`;
};

// Function to format route as string
export const formatRouteAsString = (route: Route, displayName: boolean): string => {
    const str = route.checkpoint_routes
        .map((checkpoint: Checkpoint) => checkpoint.checkpoint_name)
        .join(' - ');
    if (!displayName)
        return str;
    return `${route.route_name}: ${str}`;
}