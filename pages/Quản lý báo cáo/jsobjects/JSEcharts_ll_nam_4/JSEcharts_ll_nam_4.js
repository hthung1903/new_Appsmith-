export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countlolot_nam_4.run(); // Gọi truy vấn SQL
        if (Countlolot_nam_4.data && Countlolot_nam_4.data.length > 0) {
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

    // Dữ liệu mẫu: [{ nam: 2022, soluongbaocao: 12 }, { nam: 2023, soluongbaocao: 20 }]
    const dataRows = Countlolot_nam_4.data.map(row => ({
      year: String(row["nam"]),
      count: Number(row["soluongbaocao"])
    }));

    const years = dataRows.map(item => item.year);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng báo cáo: {c}"
      },
      title: {
        text: "Báo cáo lộ lọt tài khoản theo năm",
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
          name: "Số lượng báo cáo",
          type: "bar",
          data: counts,
          itemStyle: {
            color: "#4CAF50"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
