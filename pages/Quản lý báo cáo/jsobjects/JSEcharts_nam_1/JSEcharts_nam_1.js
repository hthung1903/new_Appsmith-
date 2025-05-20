export default {
	async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Counttheonam_1.run(); // chờ hàm chạy xong
				if (Counttheonam_1.data && Counttheonam_1.data.length >= 0) {
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

		if (!success) {
			throw new Error("Không thể lấy dữ liệu sau nhiều lần thử.");
		}
		const dataRows = Counttheonam_1.data.map(row => ({
			year: String(row["nam"]),
			count: Number(row["soluongbaocao"])
		}));

		const years = dataRows.map(item => item.year);
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
				text: "Thống kê theo năm",
				left: "center",
				textStyle: {
					width: 300,
					overflow: "truncate"
				}
			},
			grid: {
				left: 15,
				right: 15,
				bottom: 30,
				top: 100,
				containLabel: true
			},
			xAxis: [
				{
					type: "category",
					data: years,
					name: "Năm"
				}
			],
			yAxis: [
				{
					type: "value",
					name: "Số báo cáo"
				}
			],
			series: [
				{
					name: "Số báo cáo",
					type: "bar",
					data: counts,
					encode: {
						x: "Năm",
						y: "Số báo cáo"
					}
				}
			]
		};

		console.log(options);
		return options;
	}
}
