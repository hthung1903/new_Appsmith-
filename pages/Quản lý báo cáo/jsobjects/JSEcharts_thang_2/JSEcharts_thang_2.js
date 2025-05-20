export default {
	async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Counttheothang_2.run(); // chờ hàm chạy xong
				if (Counttheothang_2.data && Counttheothang_2.data.length >= 0) {
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
		// Chuyển đổi dữ liệu từ truy vấn
		const dataRows = Counttheothang_2.data.map(row => ({
			monthYear: row["thangnam"],
			count: Number(row["soluongbaocao"])
		}));

		// Trích danh sách các tháng và số lượng báo cáo
		const labels = dataRows.map(item => item.monthYear);
		const counts = dataRows.map(item => item.count);

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
				text: "Thống kê theo tháng",
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
				data: labels,
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
					data: counts,
					itemStyle: {
						color: "#73C0DE"
					}
				}
			]
		};

		console.log(options);
		return options;
	}
}
