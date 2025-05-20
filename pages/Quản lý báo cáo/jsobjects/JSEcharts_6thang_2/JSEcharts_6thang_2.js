export default {
	async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Counttheo6thang_2.run(); // chờ hàm chạy xong
				if (Counttheo6thang_2.data && Counttheo6thang_2.data.length >= 0) {
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
		const dataRows = Counttheo6thang_2.data.map(row => ({
			year: String(row["nam"]),
			firstHalf: Number(row["nuanamdau"]),
			secondHalf: Number(row["nuanamsau"])
		}));

		const years = dataRows.map(item => item.year);
		const firstHalfValues = dataRows.map(item => item.firstHalf);
		const secondHalfValues = dataRows.map(item => item.secondHalf);

		const options = {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow"
				},
				formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}"
			},
			title: {
				text: "Thống kê sáu tháng",
				left: "center"
			},
			legend: {
				top: 40,
				type: "scroll",
				data: ["Nửa năm đầu", "Nửa năm sau"]
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
					data: years
				}
			],
			yAxis: [
				{
					type: "value"
				}
			],
			series: [
				{
					name: "Nửa năm đầu",
					type: "bar",
					stack: "Báo cáo",
					data: firstHalfValues
				},
				{
					name: "Nửa năm sau",
					type: "bar",
					stack: "Báo cáo",
					data: secondHalfValues
				}
			]
		};

		console.log(options);
		return options;
	}
}
