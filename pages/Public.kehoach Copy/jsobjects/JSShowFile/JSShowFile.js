export default {
  ShowSDTC: async () => {
    const path = update_form.formData.sodotuyencap;
    if (!path) {
      showAlert("Không có đường dẫn file!", "error");
      return null;
    }
    try {
      const response = await fetch('http://170.18.20.138:5000/move_file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: path })
      });
      const result = await response.json();
      if (response.ok) {
        const imageUrl = `http://170.18.20.138:5000${result.file_url}`;
        console.log("Image URL:", imageUrl);
        return imageUrl; //  Trả ra URL ngay
      } else {
        showAlert("Move file thất bại: " + result.error, "error");
        console.error(result);
        return null;
      }
    } catch (error) {
      showAlert("Lỗi khi gọi API move_file!", "error");
      console.error(error);
      return null;
    }
  },
	ShowSDLG: async () => {
    const path = update_form.formData.sodologic;
    if (!path) {
      showAlert("Không có đường dẫn file!", "error");
      return null;
    }
    try {
      const response = await fetch('http://170.18.20.138:5000/move_file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: path })
      });
      const result = await response.json();
      if (response.ok) {
        const imageUrl = `http://170.18.20.138:5000${result.file_url}`;
        console.log("Image URL:", imageUrl);
        return imageUrl; //  Trả ra URL ngay
      } else {
        showAlert("Move file thất bại: " + result.error, "error");
        console.error(result);
        return null;
      }
    } catch (error) {
      showAlert("Lỗi khi gọi API move_file!", "error");
      console.error(error);
      return null;
    }
  },
	ShowSTR: async () => {
    const path = update_form.formData.soturack;
    if (!path) {
      showAlert("Không có đường dẫn file!", "error");
      return null;
    }
    try {
      const response = await fetch('http://170.18.20.138:5000/move_file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: path })
      });
      const result = await response.json();
      if (response.ok) {
        const imageUrl = `http://170.18.20.138:5000${result.file_url}`;
        console.log("Image URL:", imageUrl);
        return imageUrl; //  Trả ra URL ngay
      } else {
        showAlert("Move file thất bại: " + result.error, "error");
        console.error(result);
        return null;
      }
    } catch (error) {
      showAlert("Lỗi khi gọi API move_file!", "error");
      console.error(error);
      return null;
    }
  },
	ShowDDF: async () => {
  const path = update_form.formData.duongdanfile;
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
