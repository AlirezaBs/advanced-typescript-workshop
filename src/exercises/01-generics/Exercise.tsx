import "../exercise.css";

export type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
};

export function List<T>({ items, renderItem, emptyMessage = "No items" }: ListProps<T>) {
  if (items.length === 0) {
    return <p className="hint">{emptyMessage}</p>;
  }

  return (
    <div className="demo-row">
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

type User = { id: string; name: string; role: "admin" | "support" };

const sampleUsers: User[] = [
  { id: "u_1", name: "Ada", role: "admin" },
  { id: "u_2", name: "Grace", role: "support" },
];

export function GenericsExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Generic List</h2>
        <p className="hint">
          Implement <code>List&lt;T&gt;</code> so each row infers its item type from{" "}
          <code>items</code>.
        </p>
        <List items={sampleUsers} renderItem={(user) => <span>{user.name}</span>} />
      </section>
    </div>
  );
}
