export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Count_taikhoantt_1.run(); // Gọi truy vấn SQL
        if (Count_taikhoantt_1.data && Count_taikhoantt_1.data.length > 0) {
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

    // Dữ liệu: [{ trangthai: "Đang hoạt động", soluong: 100 }, ...]
    const dataRows = Count_taikhoantt_1.data.map(row => ({
      status: row["trangthai"] || "Không rõ",
      count: Number(row["soluong"])
    }));

    const statuses = dataRows.map(item => item.status);
    const counts = dataRows.map(item => item.count);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>Số lượng: {c}"
      },
      title: {
        text: "Số lượng tài khoản theo trạng thái",
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
        data: statuses,
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
          name: "Số lượng",
          type: "bar",
          data: counts,
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
