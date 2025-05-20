export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countnoithuthap_5.run(); // Gọi truy vấn SQL
        if (Countnoithuthap_5.data && Countnoithuthap_5.data.length > 0) {
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

    // Dữ liệu mẫu: [{ noithuthap: "Hệ thống A", soluongmadoc: 12 }, ...]
    const dataRows = Countnoithuthap_5.data.map(row => ({
      source: String(row["noithuthap"]),
      count: Number(row["soluongmadoc"])
    }));

    const sources = dataRows.map(item => item.source);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng mã độc: {c}"
      },
      title: {
        text: "Số lượng mã độc theo nơi thu thập",
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
        data: sources,
        axisLabel: {
          rotate: 30,
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
            color: "#3F51B5"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
