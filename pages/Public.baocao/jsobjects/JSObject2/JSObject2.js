export default {
	IconButton4onClick () {
		//DatePickerend.formattedDate
		//	write code here
		 const startDate = DatePickerstart.selectedDate;
  const endDate = DatePickerend.selectedDate;
  
  // Kiểm tra xem người dùng đã chọn đủ ngày và ngày hợp lệ chưa
  if (!startDate || !endDate) {
    showAlert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc', 'warning');
  } else if (endDate < startDate) {
    showAlert('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu', 'error');
  } else {
    // Nếu ngày hợp lệ, chạy query
    GetReportByDateRange.run({
      onSuccess: () => {
        showAlert('Truy vấn thành công!', 'success');
        
       
      },
      onError: () => {
        showAlert('Có lỗi khi chạy truy vấn. Vui lòng thử lại.', 'error');
      }
    });
  }

	}
}
