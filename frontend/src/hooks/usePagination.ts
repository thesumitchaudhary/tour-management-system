import { useState } from "react";
export function usePagination(total: number, pageSize = 10) {
  const size = Math.max(1, pageSize);
  const pageCount = Math.max(1, Math.ceil(total / size));
  const [requestedPage, setRequestedPage] = useState(1);
  const page = Math.min(requestedPage, pageCount);
  const setPage = (value: number) => setRequestedPage(Math.max(1, Math.min(value, pageCount)));
  return { page, pageCount, pageSize: size, offset: (page - 1) * size, setPage, next: () => setPage(page + 1), previous: () => setPage(page - 1) };
}
