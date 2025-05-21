export default {
	async planID () {
		const selectedRow = data_table.selectedRow;
		if (selectedRow && selectedRow.id) {
			storeValue('selectedKeHoachId', selectedRow.id);
		} else {
			storeValue('selectedKeHoachId', null);
		}
	}
}