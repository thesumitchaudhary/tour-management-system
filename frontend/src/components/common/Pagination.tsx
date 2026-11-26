export default function Pagination({ page, pageCount, onPageChange }: { page: number; pageCount: number; onPageChange: (page: number) => void }) {
  return <nav aria-label="Pagination"><button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</button><span aria-live="polite"> {page} / {pageCount} </span><button disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>Next</button></nav>;
}
