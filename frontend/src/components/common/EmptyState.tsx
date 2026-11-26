export default function EmptyState({ title = "No results", description }: { title?: string; description?: string }) {
  return <div className="p-8 text-center"><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
