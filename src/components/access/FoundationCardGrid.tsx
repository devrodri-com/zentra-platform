type FoundationCardGridProps = {
  emptyState: string;
  sections: readonly string[];
};

export function FoundationCardGrid({ emptyState, sections }: FoundationCardGridProps) {
  return (
    <ul className="access-card-grid">
      {sections.map((section) => (
        <li className="access-card" key={section}>
          <h2>{section}</h2>
          <p>{emptyState}</p>
        </li>
      ))}
    </ul>
  );
}
