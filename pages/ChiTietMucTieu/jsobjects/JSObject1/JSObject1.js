export default {
  // Hàm lưu triggeredRow của bảng và xóa các bảng còn lại
  saveTriggeredRowFrom(tableName) {
    if (tableName === "BCTS") {
      storeValue("selectedRow_BCTS", TableBCTS.triggeredRow);
      removeValue("selectedRow_BCMD");
      removeValue("selectedRow_BCLL");
			removeValue("selectedRow_BCDQ");
    } else if (tableName === "BCMD") {
      storeValue("selectedRow_BCMD", TableBCMD.triggeredRow);
      removeValue("selectedRow_BCTS");
      removeValue("selectedRow_BCLL");
			removeValue("selectedRow_BCDQ");
    } else if (tableName === "BCLL") {
      storeValue("selectedRow_BCLL", TableBCLL.triggeredRow);
      removeValue("selectedRow_BCTS");
      removeValue("selectedRow_BCMD");
			removeValue("selectedRow_BCDQ");
    }else if (tableName === "BCDQ") {
      storeValue("selectedRow_BCDQ", TableBCDQ.triggeredRow);
			removeValue("selectedRow_BCLL");
      removeValue("selectedRow_BCTS");
      removeValue("selectedRow_BCMD");
    }
  },

  // Hàm lấy triggeredRow đầu tiên có dữ liệu
  getTriggeredRow() {
    return (
      appsmith.store.selectedRow_BCTS ||
      appsmith.store.selectedRow_BCMD ||
      appsmith.store.selectedRow_BCLL ||
			appsmith.store.selectedRow_BCDQ ||
      null
    );
  },
	 getTailieuQuery() {
  const selectedOption = Select1.selectedOptionValue;
  const mucTieuId = appsmith.store.selectedMucTieuId;

  // Kiểm tra nếu không có mục tiêu được chọn
  if (!mucTieuId) {
    return "-- Không có mục tiêu được chọn --";
  }

  // Subquery để lấy danh sách tài liệu liên quan đến mục tiêu từ các bảng báo cáo
  const subQuery = `
    SELECT tailieuid 
    FROM baocaotrinhsat 
    WHERE muctieuid = ${mucTieuId} AND tailieuid IS NOT NULL
    UNION
    SELECT tailieuid 
    FROM baocaololot 
    WHERE muctieuid = ${mucTieuId} AND tailieuid IS NOT NULL
  `;

  // Trường hợp chỉ lấy tài liệu trong báo cáo
  if (selectedOption === "trong_baocao") {
    return `
      SELECT DISTINCT tl.*
      FROM tailieu tl
      WHERE tl.id IN (${subQuery})
    `;
  }

  // Trường hợp chỉ lấy tài liệu ngoài báo cáo
  if (selectedOption === "ngoai_baocao") {
    return `
      SELECT DISTINCT tl.*
      FROM tailieu tl
      WHERE tl.muctieuid = ${mucTieuId}
        AND tl.id NOT IN (${subQuery})
    `;
  }

  // Trường hợp chưa chọn gì: Lấy tất cả tài liệu (trong và ngoài báo cáo)
  return `
    SELECT DISTINCT tl.*
    FROM tailieu tl
    WHERE tl.id IN (${subQuery})

    UNION

    SELECT DISTINCT tl.*
    FROM tailieu tl
    WHERE tl.muctieuid = ${mucTieuId}
      AND tl.id NOT IN (${subQuery})
  `;
}

}