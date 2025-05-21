export default {
  async fetchData() {
    let success = false;
    let time_delay = Math.random() * 1000;
    let retryCount = 0;
    const maxRetries = 5;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    while (!success && retryCount < maxRetries) {
      try {
        await Count_tailieudm_2.run();
        console.log("Dữ liệu trả về:", Count_tailieudm_2.data); // Kiểm tra dữ liệu
        if (Count_tailieudm_2.data && Count_tailieudm_2.data.length >= 0) {
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

    if (!success) {
      throw new Error("Không thể lấy dữ liệu sau nhiều lần thử.");
    }

    // Xử lý dữ liệu với kiểm tra an toàn
    const dataRows = (Count_tailieudm_2.data || []).map(row => ({
      quocGia: String(row["QuocGia"] || ""),
      toiMat: Number(row["ToiMat"] || 0),
      mat: Number(row["Mat"] || 0),
      hanChe: Number(row["HanChe"] || 0)
    }));

    if (dataRows.length === 0) {
      console.warn("Không có dữ liệu để hiển thị biểu đồ.");
      return {
        tooltip: { trigger: "axis" },
        title: { text: "Không có dữ liệu", left: "center" },
        xAxis: [{ type: "category", data: [] }],
        yAxis: [{ type: "value" }],
        series: []
      };
    }

    const quocGias = dataRows.map(item => item.quocGia);
    const toiMatValues = dataRows.map(item => item.toiMat);
    const matValues = dataRows.map(item => item.mat);
    const hanCheValues = dataRows.map(item => item.hanChe);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}"
      },
      title: {
        text: "Thống kê số lượng tài liệu theo độ mật và quốc gia",
        left: "center",
        textStyle: { width: 300, overflow: "truncate" }
      },
      legend: {
        top: 40,
        type: "scroll",
        data: ["Tối mật", "Mật", "Hạn Chế"]
      },
      grid: {
        left: 15,
        right: 15,
        bottom: 30,
        top: 100,
        containLabel: true
      },
      xAxis: [{ type: "category", data: quocGias }],
      yAxis: [{ type: "value" }],
      series: [
        { name: "Tối mật", type: "bar", stack: "TaiLieu", data: toiMatValues },
        { name: "Mật", type: "bar", stack: "TaiLieu", data: matValues },
        { name: "Hạn Chế", type: "bar", stack: "TaiLieu", data: hanCheValues }
      ]
    };

    console.log("Cấu hình biểu đồ:", options);
    return options;
  }
};