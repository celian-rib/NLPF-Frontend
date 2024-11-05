export const sortAndFilterData = (
    data: any[],
    selectedStatus: string,
    sortOption: string
): any[] => {
    let filteredData = selectedStatus === 'all' ? data : data.filter(item => item.status === selectedStatus);

    switch (sortOption) {
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
