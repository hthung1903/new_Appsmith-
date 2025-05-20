export default {
  // Hàm lưu triggeredRow của bảng và xóa các bảng còn lại
  saveTriggeredRowFromTableTL(tableName) {
    if (tableName === "TLBCTS") {
      storeValue("selectedRow_TLBCTS", TableTLBCTS.triggeredRow);
      removeValue("selectedRow_TLBCLL");
      removeValue("selectedRow_TL");
			
    }  else if (tableName === "TLBCLL") {
      storeValue("selectedRow_TLBCLL", TableTLBCLL.triggeredRow);
      removeValue("selectedRow_TLBCTS");
      removeValue("selectedRow_TL");

    }else if (tableName === "TL") {
      storeValue("selectedRow_TL", TableTL.triggeredRow);
			removeValue("selectedRow_TLBCTS");
      removeValue("selectedRow_TLBCLL");
      
    }
  },

  // Hàm lấy triggeredRow đầu tiên có dữ liệu
  getTriggeredRowTableTL() {
    return (
      appsmith.store.selectedRow_TLBCTS ||
      appsmith.store.selectedRow_TLBCLL ||
      appsmith.store.selectedRow_TL ||
      null
    );
  },
	ShowDDFTL: async () => {
		const path = JSObject2.getTriggeredRowTableTL().duongdan;
		if (!path) {
			showAlert("Không có đường dẫn file!", "error");
			return null;
		}
		try {
			const response = await fetch('http://170.18.20.138:5000/view_file', {  // 🛠 Đổi API
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ path: path })
			});
			const result = await response.json();
			if (response.ok) {
				const fileUrl = `http://170.18.20.138:5000${result.file_url}`; //  Lấy file_url từ kết quả
				console.log("File URL:", fileUrl);
				return fileUrl; //  Trả về URL file (có thể là .pdf hoặc file gốc)
			} else {
				showAlert("View file thất bại: " + result.error, "error");
				console.error(result);
				return null;
			}
		} catch (error) {
			showAlert("Lỗi khi gọi API view_file!", "error");
			console.error(error);
			return null;
		}
	} 

}