export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Count_domainmt_1.run(); // Gọi truy vấn SQL
        if (Count_domainmt_1.data && Count_domainmt_1.data.length > 0) {
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

    // Dữ liệu: [{ quocgia: "Việt Nam", soluongdomain: 30 }, ...]
    const dataRows = Count_domainmt_1.data.map(row => ({
      country: row["quocgia"] || "Không xác định",
      count: Number(row["soluongdomain"])
    }));

    const countries = dataRows.map(item => item.country);
    const domainCounts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng domain: {c}"
      },
      title: {
        text: "Số lượng domain theo quốc gia",
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
          name: "Số lượng domain",
          type: "bar",
          data: domainCounts,
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
