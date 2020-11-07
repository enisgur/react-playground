export const getTotalPage = async (tableDataLength, pageLimit) => {
  const dataLength = await tableDataLength;
  const totalPage = (await dataLength) / pageLimit;

  return totalPage;
};
