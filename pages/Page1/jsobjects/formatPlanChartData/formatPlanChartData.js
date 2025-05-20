export default {
  source() {
    const rawData = ChartKeHoach.data;

    // Lấy tất cả quý (Q1/2024...) và loại kế hoạch duy nhất
    const quarters = [...new Set(rawData.map(row => row.x))];
    const planTypes = [...new Set(rawData.map(row => row.series))];

    // Header: ["Quý", "Kế hoạch A", "Kế hoạch B", ...]
    const source = [['Quý', ...planTypes]];

    // Duyệt từng quý để tạo dòng dữ liệu
    quarters.forEach(q => {
      const row = [q];
      planTypes.forEach(type => {
        const match = rawData.find(r => r.x === q && r.series === type);
        row.push(match ? match.y : 0);
      });
      source.push(row);
    });

    return source;
  },
	
}
