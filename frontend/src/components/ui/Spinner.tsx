export default function Spinner({ label = "Loading" }: { label?: string }) {
  return <span role="status" aria-label={label} className="inline-block size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />;
}
