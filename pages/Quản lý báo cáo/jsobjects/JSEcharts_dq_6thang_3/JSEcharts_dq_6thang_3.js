export default {
    async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Countmuctieudq_6thang_3.run(); // chờ hàm chạy xong
				if (Countmuctieudq_6thang_3.data && Countmuctieudq_6thang_3.data.length >= 0) {
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
    // Giả sử dữ liệu đầu vào là BaoCaoDoQuetTheo6Thang.data
    const dataRows = Countmuctieudq_6thang_3.data.map(row => ({
      year: String(row["nam"]),
      firstHalf: Number(row["6ThangDau"]),
      secondHalf: Number(row["6ThangCuoi"])
    }));

    const years = dataRows.map(item => item.year);
    const firstHalfValues = dataRows.map(item => item.firstHalf);
    const secondHalfValues = dataRows.map(item => item.secondHalf);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}"
      },
      title: {
        text: "Số lượng mục tiêu dò quét theo 6 tháng từng năm",
        left: "center"
      },
      legend: {
        top: 40,
        type: "scroll",
        data: ["6 Tháng Đầu Năm", "6 Tháng Cuối Năm"]
      },
      grid: {
        left: 30,
        right: 20,
        bottom: 60,
        top: 100,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: years,
        axisLabel: {
          rotate: 0,
          interval: 0
        }
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: { formatter: "{value}" }
      },
      series: [
        {
          name: "6 Tháng Đầu Năm",
          type: "bar",
          stack: "Báo cáo",
          data: firstHalfValues
        },
        {
          name: "6 Tháng Cuối Năm",
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
