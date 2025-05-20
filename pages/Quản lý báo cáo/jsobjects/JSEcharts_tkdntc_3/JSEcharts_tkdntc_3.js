export default {
	fetchData() {
		// Giả định biến dữ liệu trả về từ truy vấn là TaiKhoanThamNhapDuocTheoMucTieu.data
		const dataRows = Counttaikhoandntc_3.data.map(row => ({
			target: row["tenmuctieu"],
			count: Number(row["soluongtaikhoanthamnhapduoc"])
		}));

		const targets = dataRows.map(item => item.target);
		const counts = dataRows.map(item => item.count);

		const options = {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow"
				},
				formatter: "{b}: {c} tài khoản"
			},
			title: {
				text: "Số lượng tài khoản đăng nhập thành công theo mục tiêu",
				left: "center"
			},
			grid: {
				left: 20,
				right: 20,
				bottom: 40,
				top: 80,
				containLabel: true
			},
			xAxis: {
				type: "category",
				data: targets,
				axisLabel: {
					rotate: 30,
					overflow: "truncate"
				}
			},
			yAxis: {
				type: "value",
				minInterval: 1
			},
			series: [
				{
					name: "Tài khoản",
					type: "bar",
					data: counts,
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
