export default {
  pieChartConfigBaoCao() {
    const rawData = ChartBaoCao.data;

    // Nếu chưa có dữ liệu thì trả về cấu hình rỗng hoặc hiển thị loading
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return {
        type: "pie3d",
        dataSource: {
          chart: {
            caption: "Báo Cáo",
            theme: "fusion"
          },
          data: []
        }
      };
    }

    const formattedData = rawData.map(item => ({
      name: item.loaibaocao,
      value: item.count
    }));

    return {
      type: "pie3d",
      dataSource: {
        chart: {
          caption: "Báo Cáo",
          theme: "fusion",
          showPercentValues: "0",
          showLabels: "0",
          showValues: "1",
          useDataPlotColorForLabels: "1",
          decimals: "0",
          labelDisplay: "AUTO",
          pieRadius: "100",
          labelFontSize: "14",
          labelFontColor: "#333333",
          valuePosition: "outside",
          smartLineColor: "#cccccc",
          smartLineThickness: "1",
          legendPosition: "bottom",
          legendItemFontSize: "14",
          legendItemFontColor: "#333333",
          legendItemMaxWidth: "250",
          numberSuffix: ""
        },
        data: formattedData
      }
    };
  }
};
