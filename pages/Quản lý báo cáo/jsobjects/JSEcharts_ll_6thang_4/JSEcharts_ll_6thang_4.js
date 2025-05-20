export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countlolot_6thang_4.run(); // Gọi truy vấn từ backend
        if (Countlolot_6thang_4.data && Countlolot_6thang_4.data.length >= 0) {
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

    // Dữ liệu giả định: [{ nam: 2021, nuanamdau: 12, nuanamsau: 20 }, ...]
    const dataRows = Countlolot_6thang_4.data.map(row => ({
      year: String(row["nam"]),
      firstHalf: Number(row["nuanamdau"]),
      secondHalf: Number(row["nuanamsau"])
    }));

    const years = dataRows.map(item => item.year);
    const firstHalfValues = dataRows.map(item => item.firstHalf);
    const secondHalfValues = dataRows.map(item => item.secondHalf);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{b}<br/>6 tháng đầu: {c0}<br/>6 tháng cuối: {c1}"
      },
      title: {
        text: "Báo cáo lộ lọt tài khoản theo nửa năm",
        left: "center"
      },
      legend: {
        top: 40,
        data: ["6 tháng đầu", "6 tháng cuối"]
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
        minInterval: 1
      },
      series: [
        {
          name: "6 tháng đầu",
          type: "bar",
          stack: "Báo cáo",
          data: firstHalfValues,
          itemStyle: { color: "#73C0DE" }
        },
        {
          name: "6 tháng cuối",
          type: "bar",
          stack: "Báo cáo",
          data: secondHalfValues,
          itemStyle: { color: "#FF6666" }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
