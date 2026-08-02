import { useMemo, useState } from "react";
import "../exercise.css";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  sortableKeys?: Array<keyof T>;
};

function readStoredValue<T>(key: string, initial: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return initial;
    }
    return JSON.parse(stored) as T;
  } catch {
    return initial;
  }
}

export function useLocalStorage<T>(key: string, initial: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initial));

  const setStoredValue = (next: T) => {
    localStorage.setItem(key, JSON.stringify(next));
    setValue(next);
  };

  return [value, setStoredValue];
}

function getCellContent<T>(row: T, column: Column<T>): React.ReactNode {
  if (column.render) {
    return column.render(row);
  }

  const cell = row[column.key];
  return cell == null ? "" : String(cell);
}

export function DataTable<T>({ rows, columns, sortableKeys = [] }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedRows = useMemo(() => {
    if (sortKey === null) {
      return rows;
    }

    const sorted = [...rows];
    sorted.sort((left, right) => {
      const leftValue = left[sortKey];
      const rightValue = right[sortKey];

      if (leftValue === rightValue) {
        return 0;
      }
      if (leftValue == null) {
        return 1;
      }
      if (rightValue == null) {
        return -1;
      }

      const comparison = leftValue < rightValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [rows, sortKey, sortDirection]);

  const handleSort = (key: keyof T) => {
    if (!sortableKeys.includes(key)) {
      return;
    }

    if (sortKey === key) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column) => {
            const isSortable = sortableKeys.includes(column.key);
            const isActive = sortKey === column.key;
            const sortIndicator = isActive ? (sortDirection === "asc" ? " ↑" : " ↓") : "";

            return (
              <th key={String(column.key)}>
                {isSortable ? (
                  <button
                    type="button"
                    className="data-table__sort"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.header}
                    {sortIndicator}
                  </button>
                ) : (
                  column.header
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={String(column.key)}>{getCellContent(row, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
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
          rows={[
            { id: "pay_1", amount: 99, status: "paid" },
            { id: "pay_2", amount: 44, status: "pending" },
            { id: "pay_3", amount: 100, status: "failed" },
            { id: "pay_4", amount: 101, status: "expired" },
          ]}
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
