export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Count_tailieumt_2.run(); // Gọi truy vấn từ backend
        if (Count_tailieumt_2.data && Count_tailieumt_2.data.length > 0) {
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

    // Dữ liệu giả định: [{ quocgia: "VN", soluong: 20 }, ...]
    const dataRows = Count_tailieumt_2.data.map(row => ({
      country: row["quocgia"] || "Không rõ",
      count: Number(row["soluong"])
    }));

    const countries = dataRows.map(item => item.country);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng tài liệu: {c}"
      },
      title: {
        text: "Số lượng tài liệu theo quốc gia",
        left: "center"
      },
      grid: {
        left: 40,
        right: 30,
        bottom: 80,
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: countries,
        axisLabel: {
          rotate: 30,
          interval: 0
        }
      },
      yAxis: {
        type: "value",
        minInterval: 1
      },
      series: [
        {
          name: "Số lượng tài liệu",
          type: "bar",
          data: counts,
          itemStyle: {
            color: "#91CC75"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
