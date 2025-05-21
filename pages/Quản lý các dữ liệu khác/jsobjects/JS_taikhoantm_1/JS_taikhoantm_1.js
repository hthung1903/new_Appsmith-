export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Count_taikhoantm_1.run(); // Gọi truy vấn SQL
        if (Count_taikhoantm_1.data && Count_taikhoantm_1.data.length > 0) {
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

    // Dữ liệu: [{ domain: "example.com", soluong: 10 }, ...]
    const dataRows = Count_taikhoantm_1.data.map(row => ({
      domain: row["domain"] || "Không rõ",
      count: Number(row["soluong"])
    }));

    const domains = dataRows.map(item => item.domain);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng tài khoản: {c}"
      },
      title: {
        text: "Số lượng tài khoản theo domain",
        left: "center"
      },
      grid: {
        left: 40,
        right: 30,
        bottom: 100,
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: domains,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: "value",
        minInterval: 1
      },
      series: [
        {
          name: "Số lượng tài khoản",
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
