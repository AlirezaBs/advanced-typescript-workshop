import type { Permission } from "./Warmup";
import "../exercise.css";

/** TODO: Provider + usePermission hook — invalid permission strings must fail at compile time. */
export function usePermission(_permission: Permission): boolean {
  // Stub — replace with useContext + typed permission check
  void _permission;
  throw new Error("Not implemented");
}

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  // Stub — provide permissions context
  void children;
  return null;
}

export function ContextReducerChallenge() {
  return (
    <div className="exercise-panel">
      <PermissionsProvider>
        <p className="hint">Implement usePermission with typed permission keys.</p>
      </PermissionsProvider>
    </div>
  );
}
