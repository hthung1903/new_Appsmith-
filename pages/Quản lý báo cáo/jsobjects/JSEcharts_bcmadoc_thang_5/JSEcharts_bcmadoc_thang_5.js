export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countbcmadoc_thang_5.run(); // Chạy truy vấn dữ liệu
        if (Countbcmadoc_thang_5.data && Countbcmadoc_thang_5.data.length >= 0) {
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

    // Xử lý dữ liệu trả về
    const dataRows = Countbcmadoc_thang_5.data.map(row => ({
      monthYear: row["x"],
      count: Number(row["y"])
    }));

    const times = dataRows.map(item => item.monthYear);
    const counts = dataRows.map(item => item.count);

    // Cấu hình biểu đồ ECharts
    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}<br/>Số lượng báo cáo: {c}"
      },
      title: {
        text: "Báo cáo mã độc theo tháng",
        left: "center"
      },
      grid: {
        left: 30,
        right: 20,
        bottom: 80,
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: times,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: "Số lượng báo cáo",
          type: "bar",
          data: counts,
          itemStyle: {
            color: "#FF6666"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
