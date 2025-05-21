export default {
	async planID () {
		const selectedRow = data_table.selectedRow;
		if (selectedRow && selectedRow.id) {
			storeValue('selectedMucTieuId', selectedRow.id);
		} else {
			storeValue('selectedMucTieuId', null);
		}
	}
}