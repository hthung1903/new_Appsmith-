export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Count_tailieukt_2.run(); // Gọi truy vấn từ backend
        if (Count_tailieukt_2.data && Count_tailieukt_2.data.length > 0) {
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

    // Dữ liệu giả định: [{ quocgia: "VN", tongkichthuoc: 12345 }, ...]
    const dataRows = Count_tailieukt_2.data.map(row => ({
      country: row["quocgia"] || "Không rõ",
      size: Number(row["tongkichthuoc"])
    }));

    const countries = dataRows.map(item => item.country);
    const sizes = dataRows.map(item => item.size);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Tổng kích thước: {c} KB"
      },
      title: {
        text: "Tổng kích thước tài liệu theo quốc gia",
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
        minInterval: 1,
        axisLabel: {
          formatter: "{value} KB"
        }
      },
      series: [
        {
          name: "Tổng kích thước",
          type: "bar",
          data: sizes,
          itemStyle: {
            color: "#FAC858"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
