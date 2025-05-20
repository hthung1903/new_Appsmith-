export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Countusb_5.run(); // Gọi truy vấn SQL
        if (Countusb_5.data && Countusb_5.data.length > 0) {
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

    // Dữ liệu giả định: [{ nam: 2021, madoclayquausb: 12, madoclayquausbat: 5 }, ...]
    const dataRows = Countusb_5.data.map(row => ({
      year: String(row["nam"]),
      usb: Number(row["madoclayquausb"]),
      usbAT: Number(row["madoclayquausbat"])
    }));

    const years = dataRows.map(item => item.year);
    const usbValues = dataRows.map(item => item.usb);
    const usbATValues = dataRows.map(item => item.usbAT);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>USB thường: {c0}<br/>USB AT: {c1}"
      },
      title: {
        text: "Mã độc lây qua USB và USB AT theo năm",
        left: "center"
      },
      legend: {
        top: 40,
        data: ["USB thường", "USB AT"]
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
          name: "USB thường",
          type: "bar",
          stack: "Mã độc",
          data: usbValues,
          itemStyle: { color: "#4CAF50" }
        },
        {
          name: "USB AT",
          type: "bar",
          stack: "Mã độc",
          data: usbATValues,
          itemStyle: { color: "#FF9800" }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
