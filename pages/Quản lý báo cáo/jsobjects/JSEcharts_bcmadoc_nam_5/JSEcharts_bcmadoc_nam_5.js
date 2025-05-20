export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countbcmadoc_nam_5.data.run(); // Gọi truy vấn SQL
        if (Countbcmadoc_nam_5.data && Countbcmadoc_nam_5.data.length > 0) {
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

    // Dữ liệu mẫu: [{ nam: 2022, soluongmadoc: 15 }, { nam: 2023, soluongmadoc: 25 }]
    const dataRows = Countbcmadoc_nam_5.data.map(row => ({
      year: String(row["nam"]),
      count: Number(row["soluongmadoc"])
    }));

    const years = dataRows.map(item => item.year);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng mã độc: {c}"
      },
      title: {
        text: "Số lượng mã độc được phát hiện theo năm",
        left: "center"
      },
      grid: {
        left: 30,
        right: 20,
        bottom: 60,
        top: 80,
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
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: "Số lượng mã độc",
          type: "bar",
          data: counts,
          itemStyle: {
            color: "#F44336"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
