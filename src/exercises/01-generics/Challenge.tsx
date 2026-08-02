import { useState } from "react";
import "../exercise.css";

export type Column<T> = {
  /** TODO: Constrain key to keyof T */
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  sortableKeys?: Array<keyof T>;
};

/** TODO: Implement DataTable<T> with typed columns and optional sort UI (stub sort OK). */
export function DataTable<T>(_props: DataTableProps<T>) {
  return <p className="placeholder">Implement DataTable&lt;T&gt;</p>;
}

/** TODO: Implement useLocalStorage<T> with typed read/write. */
export function useLocalStorage<T>(_key: string, initial: T): [T, (value: T) => void] {
  // Stub — replace with localStorage-backed state
  void _key;
  const [value, setValue] = useState<T>(initial);
  return [value, setValue];
}

type Theme = "light" | "dark";

export function GenericsChallenge() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  return (
    <div className="exercise-panel">
      <section>
        <h3>useLocalStorage&lt;Theme&gt;</h3>
        <button type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Theme: {theme}
        </button>
      </section>
      <section>
        <h3>DataTable demo</h3>
        <DataTable
          rows={[{ id: "pay_1", amount: 99, status: "paid" }]}
          columns={[
            { key: "id", header: "ID" },
            { key: "amount", header: "Amount" },
          ]}
          sortableKeys={["amount"]}
        />
      </section>
    </div>
  );
}
