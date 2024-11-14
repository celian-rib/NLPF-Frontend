export const sortAndFilterData = (
    data: any[],
    selectedStatus: string,
    sortOption: string
): any[] => {
    let filteredData = selectedStatus === 'all' ? data : data.filter(item => item.status === selectedStatus);

    // Determine if data is for tractors or lots
    const isTractor = filteredData.length > 0 && (filteredData[0] as object).hasOwnProperty('tractor_name');
    const nameField = isTractor ? 'tractor_name' : 'lot_name';

    // Sort data
    switch (sortOption) {
        case 'name_asc':
            return filteredData.sort((a, b) => a[nameField].localeCompare(b[nameField]));
        case 'name_desc':
            return filteredData.sort((a, b) => b[nameField].localeCompare(a[nameField]));
        case 'volume_asc':
            return filteredData.sort((a, b) => a.volume - b.volume);
        case 'volume_desc':
            return filteredData.sort((a, b) => b.volume - a.volume);
        case 'max_price_asc':
            return filteredData.sort((a, b) => a.max_price - b.max_price);
        case 'max_price_desc':
            return filteredData.sort((a, b) => b.max_price - a.max_price);
        case 'min_price_asc':
            return filteredData.sort((a, b) => a.min_price - b.min_price);
        case 'min_price_desc':
            return filteredData.sort((a, b) => b.min_price - a.min_price);
        case 'current_price_asc':
            return filteredData.sort((a, b) => a.current_price - b.current_price);
        case 'current_price_desc':
            return filteredData.sort((a, b) => b.current_price - a.current_price);
        case 'location_asc':
            return filteredData.sort((a, b) => a.current_checkpoint.checkpoint_name.localeCompare(b.current_checkpoint.checkpoint_name));
        case 'location_desc':
            return filteredData.sort((a, b) => b.current_checkpoint.checkpoint_name.localeCompare(a.current_checkpoint.checkpoint_name));
        default:
            return filteredData;
    }
};
