function usePages(data = [], pageno = 1, perPage = 30) {
  const totalPages = Math.ceil(data.length / perPage);

  const start = (pageno - 1) * perPage;
  const end = start + perPage;
  const currentData = data.slice(start, end);

  return { currentData, totalPages };
}

export default usePages;
