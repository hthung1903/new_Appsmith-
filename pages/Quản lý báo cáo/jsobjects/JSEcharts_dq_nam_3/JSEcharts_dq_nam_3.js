export default {
    async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Countmuctieudq_nam_3.run(); // chờ hàm chạy xong
				if (Countmuctieudq_nam_3.data && Countmuctieudq_nam_3.data.length >= 0) {
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
    // Giả sử dữ liệu đầu vào là BaoCaoDoQuetTheoNam.data
    const dataRows = Countmuctieudq_nam_3.data.map(row => ({
      year: String(row["nam"]),
      totalTargets: Number(row["tongsomuctieudoquet"])
    }));

    const years = dataRows.map(item => item.year);
    const totalValues = dataRows.map(item => item.totalTargets);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>{a0}: {c0}"
      },
      title: {
        text: "Tổng số mục tiêu dò quét theo năm",
        left: "center"
      },
      legend: {
        top: 40,
        data: ["Tổng số mục tiêu dò quét"]
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
          name: "Tổng số mục tiêu dò quét",
          type: "bar",
          data: totalValues,
          barWidth: '50%',
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
