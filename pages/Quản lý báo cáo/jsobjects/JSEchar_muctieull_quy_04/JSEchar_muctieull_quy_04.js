export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countmuctieull_quy_4.run(); // Gọi hàm thực thi truy vấn
        if (Countmuctieull_quy_4.data && Countmuctieull_quy_4.data.length > 0) {
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

    // Mapping dữ liệu
    const dataRows = Countmuctieull_quy_4.data.map(row => ({
      year: String(row["nam"]),
      q1: Number(row["quy1"]),
      q2: Number(row["quy2"]),
      q3: Number(row["quy3"]),
      q4: Number(row["quy4"]),
      total: Number(row["tongsomuctieu"])
    }));

    const years = dataRows.map(item => item.year);
    const q1Values = dataRows.map(item => item.q1);
    const q2Values = dataRows.map(item => item.q2);
    const q3Values = dataRows.map(item => item.q3);
    const q4Values = dataRows.map(item => item.q4);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: function (params) {
          let tooltip = `${params[0].axisValue}<br/>`;
          params.forEach(item => {
            tooltip += `${item.seriesName}: ${item.data}<br/>`;
          });
          return tooltip;
        }
      },
      title: {
        text: "Số lượng mục tiêu bị lộ lọt theo quý",
        left: "center"
      },
      legend: {
        top: 40,
        type: "scroll",
        data: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"]
      },
      grid: {
        left: 30,
        right: 20,
        bottom: 60,
        top: 100,
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
          formatter: "{value}"
        }
      },
      series: [
        {
          name: "Quý 1",
          type: "bar",
          stack: "Mục tiêu",
          data: q1Values,
          itemStyle: { color: "#5470C6" }
        },
        {
          name: "Quý 2",
          type: "bar",
          stack: "Mục tiêu",
          data: q2Values,
          itemStyle: { color: "#91CC75" }
        },
        {
          name: "Quý 3",
          type: "bar",
          stack: "Mục tiêu",
          data: q3Values,
          itemStyle: { color: "#FAC858" }
        },
        {
          name: "Quý 4",
          type: "bar",
          stack: "Mục tiêu",
          data: q4Values,
          itemStyle: { color: "#EE6666" }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
