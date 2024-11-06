import React from 'react';

interface FilterAndSortProps {
    selectedStatus?: string;
    setSelectedStatus?: ((status: string) => void) | null;
    sortOption?: string;
    setSortOption?: ((option: string) => void)  | null;
    sort?: boolean;
    sortByName?: boolean;
    sortByVolume?: boolean;
    sortByMaxPrice?: boolean;
    sortByMinPrice?: boolean;
    sortByCurrentPrice?: boolean;
    sortByLocation?: boolean;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({
    selectedStatus = null,
    setSelectedStatus = null,
    sortOption = null,
    setSortOption = null,
    sortByName = false,
    sortByVolume = false,
    sortByMaxPrice = false,
    sortByMinPrice = false,
    sortByCurrentPrice = false,
    sortByLocation = false
}) => {
    return (
        <div className="self-center">
            <div className="flex justify-between items-center self-end">

                {selectedStatus && (
                    <select 
                        value={selectedStatus} 
                        onChange={(e) => setSelectedStatus && setSelectedStatus(e.target.value)} 
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
                )}

                {sortOption && (
                    <select 
                        value={sortOption} 
                        onChange={(e) => setSortOption && setSortOption(e.target.value)} 
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="none" disabled>Sort by</option>
                        {sortByName && (
                            <>
                                <option value="name_asc">Name (A-Z)</option>
                                <option value="name_desc">Name (Z-A)</option>
                            </>
                        )}
                        {sortByVolume && (
                            <>
                                <option value="volume_asc">Volume (Ascending)</option>
                                <option value="volume_desc">Volume (Descending)</option>
                            </>
                        )}
                        {sortByMaxPrice && (
                            <>
                                <option value="max_price_asc">Maximum price (Ascending)</option>
                                <option value="max_price_desc">Maximum price (Descending)</option>
                            </>
                        )}
                        {sortByMinPrice && (
                            <>
                                <option value="min_price_asc">Minimum price (Ascending)</option>
                                <option value="min_price_desc">Minimum price (Descending)</option>
                            </>
                        )}
                        {sortByCurrentPrice && (
                            <>
                                <option value="current_price_asc">Current price (Ascending)</option>
                                <option value="current_price_desc">Current price (Descending)</option>
                            </>
                        )}
                        {sortByLocation && (
                            <>
                                <option value="location_asc">Location (A-Z)</option>
                                <option value="location_desc">Location (Z-A)</option>
                            </>
                        )}
                    </select>
                )}
    
            </div>
        </div>
    );
};

export default FilterAndSort;
