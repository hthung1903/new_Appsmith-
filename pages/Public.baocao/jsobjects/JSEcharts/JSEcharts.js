export default {
  fetchData() {
    const dataRows = Counttheo6thang.data.map(row => ({
      year: String(row["nam"]),
      firstHalf: Number(row["6_thang_dau_nam"]),
      secondHalf: Number(row["6_thang_cuoi_nam"])
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
        formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}"
      },
      title: {
        text: "Thống kê 6 tháng",
        left: "center",
        textStyle: {
          width: 300,
          overflow: "truncate"
        }
      },
      legend: {
        top: 40,
        type: "scroll",
        data: ["6 tháng đầu năm", "6 tháng cuối năm"]
      },
      grid: {
        left: 15,
        right: 15,
        bottom: 30,
        top: 100,
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: years
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "6 tháng đầu năm",
          type: "bar",
          stack: "Báo cáo",
          data: firstHalfValues,
          encode: {
            x: "Năm",
            y: "6 tháng đầu năm"
          }
        },
        {
          name: "6 tháng cuối năm",
          type: "bar",
          stack: "Báo cáo",
          data: secondHalfValues,
          encode: {
            x: "Năm",
            y: "6 tháng cuối năm"
          }
        }
      ]
    };

    console.log(options);
    return options;
  }
}
