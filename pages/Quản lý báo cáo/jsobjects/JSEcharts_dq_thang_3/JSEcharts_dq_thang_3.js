export default {
  async fetchData() {
		let success = false;
		let time_delay = Math.random() * 1000;
		let retryCount = 0;
		const maxRetries = 5; // số lần thử tối đa
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		while (!success && retryCount < maxRetries) {
			try {
				await Countmuctieudq_thang_3.run(); // chờ hàm chạy xong
				if (Countmuctieudq_thang_3.data && Countmuctieudq_thang_3.data.length >= 0) {
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
    // Giả sử dữ liệu trả về dạng:
    // [{ thoigian: '01/2023', soluongmuctieudoquet: 5 }, { thoigian: '02/2023', soluongmuctieudoquet: 8 }, ...]
    const dataRows = Countmuctieudq_thang_3.data.map(row => ({
      time: row["thoigian"],
      count: Number(row["soluongmuctieudoquet"])
    }));

    const times = dataRows.map(item => item.time);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}<br/>Số lượng mục tiêu dò quét: {c}"
      },
      title: {
        text: "Mục tiêu dò quét theo tháng",
        left: "center"
      },
      grid: {
        left: 30,
        right: 20,
        bottom: 80,  // đủ chỗ cho nhãn dài xoay
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: times,
        axisLabel: {
          rotate: 45,
          interval: 0,
        }
      },
      yAxis: {
        type: "value",
        minInterval: 1, // chỉ hiện số nguyên
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: "Số lượng mục tiêu dò quét",
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
