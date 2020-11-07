export default async function sortData(sortData, field, isSorted) {
  sortData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

  const res = await sortData.sort((a, b) => {
    if (isSorted) {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    } else {
      if (a[field] < b[field]) return 1;
      if (a[field] > b[field]) return -1;
      return 0;
    }
  });

  return res;
}
