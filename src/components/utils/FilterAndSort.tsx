import React from 'react';

interface FilterAndSortProps {
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    sortOption: string;
    setSortOption: (option: string) => void;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({
    selectedStatus,
    setSelectedStatus,
    sortOption,
    setSortOption,
}) => {
    return (
        <div className="self-center">
            <div className="flex justify-between items-center self-end">
                <select 
                    value={selectedStatus} 
                    onChange={(e) => setSelectedStatus(e.target.value)} 
                    className="mr-2 border border-gray-300 rounded px-2 py-1"
                >
                    <option value="all" disabled>Filter by status</option>
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="in_transit">In transit</option>
                    <option value="on_market">On market</option>
                    <option value="archived">Archived</option>
                </select>

                <select 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value)} 
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    <option value="none" disabled>Sort by</option>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="volume_asc">Volume (Ascending)</option>
                    <option value="volume_desc">Volume (Descending)</option>
                    <option value="location_asc">Location (A-Z)</option>
                    <option value="location_desc">Location (Z-A)</option>
                </select>
            </div>
        </div>
    );
};

export default FilterAndSort;
