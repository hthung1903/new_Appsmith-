export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Count_taikhoanmt_1.run(); // Gọi truy vấn SQL
        if (Count_taikhoanmt_1.data && Count_taikhoanmt_1.data.length > 0) {
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

    // Dữ liệu: [{ quocgia: "Việt Nam", soluongtaikhoan: 120 }, ...]
    const dataRows = Count_taikhoanmt_1.data.map(row => ({
      country: row["quocgia"] || "Không xác định",
      count: Number(row["soluongtaikhoan"])
    }));

    const countries = dataRows.map(item => item.country);
    const accountCounts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng tài khoản: {c}"
      },
      title: {
        text: "Số lượng tài khoản theo quốc gia",
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
        data: countries,
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
          name: "Số lượng tài khoản",
          type: "bar",
          data: accountCounts,
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
