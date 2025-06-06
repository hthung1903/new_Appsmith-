export default {
  async fetchData() {
    let success = false;
		let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5; // số lần thử tối đa
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Counttheoquy_1.run(); // chờ hàm chạy xong
        if (Counttheoquy_1.data && Counttheoquy_1.data.length >= 0) {
          success = true;
        } else {
          throw new Error("Không có dữ liệu");
        }
      } catch (error) {
        retryCount++;
        console.log(`Thử lại lần ${retryCount}: ${error.message}`);
        await delay(time_delay); // đợi 1 giây trước khi thử lại
      }
    }

    if (!success) {
      throw new Error("Không thể lấy dữ liệu sau nhiều lần thử.");
    }

    // Xử lý dữ liệu sau khi chắc chắn đã thành công
    const dataRows = Counttheoquy_1.data.map(row => ({
      year: String(row["nam"]),
      q1: Number(row["q1"]),
      q2: Number(row["q2"]),
      q3: Number(row["q3"]),
      q4: Number(row["q4"])
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
        text: "Thống kê theo quý",
        left: "center",
        textStyle: {
          width: 300,
          overflow: "truncate"
        }
      },
      legend: {
        top: 40,
        type: "scroll",
        data: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"]
      },
      grid: {
        left: 15,
        right: 15,
        bottom: 30,
        top: 100,
        containLabel: true
      },
      xAxis: [{ type: "category", data: years }],
      yAxis: [{ type: "value" }],
      series: [
        { name: "Quý 1", type: "bar", stack: "Báo cáo", data: q1Values },
        { name: "Quý 2", type: "bar", stack: "Báo cáo", data: q2Values },
        { name: "Quý 3", type: "bar", stack: "Báo cáo", data: q3Values },
        { name: "Quý 4", type: "bar", stack: "Báo cáo", data: q4Values }
      ]
    };

    console.log(options);
    return options;
  }
}