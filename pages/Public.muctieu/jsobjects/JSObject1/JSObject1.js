export default {
  buildWhereClause: () => {
    const selectedValues = MultiTreeSelect1.selectedOptionValues;

    if (selectedValues && Array.isArray(selectedValues) && selectedValues.length > 0) {
      const safeValues = selectedValues
        .map(value => Number(value))
        .filter(value => !isNaN(value));

      if (safeValues.length > 0) {
        return `"id" IN (${safeValues.join(',')})`;
      } else {
        return `FALSE`;
      }
    }
    return `TRUE`;
  }
}