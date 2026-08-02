import "../exercise.css";

/** TODO: Define ListProps<T> with items: T[] and renderItem: (item: T) => React.ReactNode */
export type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
};

/** TODO: Implement generic List<T> — infer T from items prop without explicit type args. */
export function List<T>(_props: ListProps<T>) {
  return <p className="placeholder">Implement List&lt;T&gt;</p>;
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
