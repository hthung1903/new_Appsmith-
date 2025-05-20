export default {
	async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Counttheoquocgia_2.run(); // chờ hàm chạy xong
				if (Counttheoquocgia_2.data && Counttheoquocgia_2.data.length >= 0) {
					success = true;
				} else {
					throw new Error("Không có dữ liệu");
				}
			} catch (error) {
				retryCount++;
				console.log(`Thử lại lần ${retryCount}: ${error.message}`);
				await delay(time_delay); // đợi 1 giây trước khi thử lại
			}
		}
		// Chuyển đổi dữ liệu từ bảng truy vấn
		const dataRows = Counttheoquocgia_2.data.map(row => ({
			x: row["x"],
			y: Number(row["y"])
		}));

		// Lấy danh sách quốc gia và số lượng
		const countries = dataRows.map(item => item.x);
		const values = dataRows.map(item => item.y);

		// Cấu hình biểu đồ
		const options = {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow"
				},
				formatter: "{b}: {c} báo cáo"
			},
			title: {
				text: "Thống kê theo quốc gia",
				left: "center"
			},
			grid: {
				left: 30,
				right: 30,
				bottom: 60,
				top: 80,
				containLabel: true
			},
			xAxis: {
				type: "category",
				data: countries,
				axisLabel: {
					rotate: 45,
					interval: 0
				}
			},
			yAxis: {
				type: "value"
			},
			series: [
				{
					name: "Báo cáo",
					type: "bar",
					data: values,
					itemStyle: {
						color: "#5470C6"
					}
				}
			]
		};

		console.log(options);
		return options;
	}
}
