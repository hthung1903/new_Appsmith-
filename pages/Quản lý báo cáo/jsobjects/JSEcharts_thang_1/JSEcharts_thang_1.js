export default {
	async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Counttheothang_1.run(); // chờ hàm chạy xong
				if (Counttheothang_1.data && Counttheothang_1.data.length >= 0) {
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
		const dataRows = Counttheothang_1.data.map(row => ({
			monthYear: String(row["x"]),
			count: Number(row["y"])
		}));

		const labels = dataRows.map(item => item.monthYear);
		const counts = dataRows.map(item => item.count);

		const options = {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow"
				},
				formatter: "{b}: {c}"
			},
			title: {
				text: "Thống kê theo tháng",
				left: "center",
				textStyle: {
					width: 300,
					overflow: "truncate"
				}
			},
			grid: {
				left: 15,
				right: 15,
				bottom: 60, // tăng padding dưới để không bị cắt chữ nghiêng
				top: 100,
				containLabel: true
			},
			xAxis: [
				{
					type: "category",
					data: labels,
					name: "Tháng/Năm",
					axisLabel: {
						rotate: 45 // xoay nhãn trục X
					}
				}
			],
			yAxis: [
				{
					type: "value",
					name: "Số báo cáo",
					minInterval: 1
				}
			],
			series: [
				{
					name: "Số báo cáo",
					type: "bar",
					data: counts,
					encode: {
						x: "Tháng/Năm",
						y: "Số báo cáo"
					}
				}
			]
		};

		console.log(options);
		return options;
	}
}
