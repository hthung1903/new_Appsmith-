export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countbcmadoc_quy_5.run(); // chạy hàm chứa truy vấn báo cáo mã độc theo quý
        if (Countbcmadoc_quy_5.data && Countbcmadoc_quy_5.data.length >= 0) {
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

    const dataRows = Countbcmadoc_quy_5.data.map(row => ({
      year: String(row["nam"]),
      q1: Number(row["quy1"]),
      q2: Number(row["quy2"]),
      q3: Number(row["quy3"]),
      q4: Number(row["quy4"])
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
        formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}<br/>{a3}: {c3}"
      },
      title: {
        text: "Báo cáo mã độc theo quý",
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
        axisLabel: { formatter: "{value}" }
      },
      series: [
        {
          name: "Quý 1",
          type: "bar",
          stack: "Báo cáo",
          data: q1Values,
          itemStyle: { color: "#4CAF50" }
        },
        {
          name: "Quý 2",
          type: "bar",
          stack: "Báo cáo",
          data: q2Values,
          itemStyle: { color: "#2196F3" }
        },
        {
          name: "Quý 3",
          type: "bar",
          stack: "Báo cáo",
          data: q3Values,
          itemStyle: { color: "#FFC107" }
        },
        {
          name: "Quý 4",
          type: "bar",
          stack: "Báo cáo",
          data: q4Values,
          itemStyle: { color: "#F44336" }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
