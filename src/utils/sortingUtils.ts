export const sortAndFilterData = (
    data: any[],
    selectedStatus: string,
    sortOption: string
): any[] => {
    let filteredData = selectedStatus === 'all' ? data : data.filter(item => item.status === selectedStatus);

    // Determine if data is for tractors or lots
    const isTractor = filteredData.length > 0 && 'tractor_name' in filteredData[0];
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
        case 'location_asc':
            return filteredData.sort((a, b) => a.current_checkpoint.checkpoint_name.localeCompare(b.current_checkpoint.checkpoint_name));
        case 'location_desc':
            return filteredData.sort((a, b) => b.current_checkpoint.checkpoint_name.localeCompare(a.current_checkpoint.checkpoint_name));
        default:
            return filteredData;
    }
};
