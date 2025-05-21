export default {
	async fetchData() {
		let success = false;
		let retryCount = 0;
		const maxRetries = 5;
		const time_delay = Math.random() * 1000;
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Count_tailieucd_2.run(); // <-- Gọi đúng query
				if (Count_tailieucd_2.data && Count_tailieucd_2.data.length > 0) {
					success = true;
				} else {
					throw new Error("Không có dữ liệu");
				}
			} catch (error) {
				retryCount++;
				console.log(`Thử lại lần ${retryCount}: ${error.message}`);
				await delay(time_delay);
			}
		}

		if (!success) {
			throw new Error("Không thể lấy dữ liệu sau nhiều lần thử.");
		}

		const dataRows = Count_tailieucd_2.data.map(row => ({
			capDo: row["capdo"] || "Không xác định",
			soLuong: Number(row["soluong"]) || 0
		}));

		const categories = dataRows.map(row => row.capDo);
		const values = dataRows.map(row => row.soLuong);

		const options = {
			tooltip: {
				trigger: "axis",
				axisPointer: { type: "shadow" }
			},
			title: {
				text: "Số lượng tài liệu theo Cấp độ",
				left: "center"
			},
			legend: { show: false },
			grid: {
				left: 20,
				right: 20,
				bottom: 60,
				top: 100,
				containLabel: true
			},
			xAxis: {
				type: "category",
				data: categories,
				// axisLabel: {
				// interval: 0,
				// rotate: 30
				// }
			},
			yAxis: { type: "value", minInterval: 1 },
			series: [{
				name: "Số lượng",
				type: "bar",
				data: values,
				itemStyle: {
					color: "#5cb85c"
				}
			}]
		};

		console.log(options);
		return options;
	}
}
