import type { RolePermissions } from "./Warmup";
import "../exercise.css";

/** TODO: Build RolePermissions and render each role with its permissions. */
export function UtilityTypesChallenge() {
  const permissions: RolePermissions = {
    admin: [],
    support: [],
    finance: [],
  };
  void permissions;

  return (
    <div className="exercise-panel">
      <p className="placeholder">Implement role-to-permissions map from User model</p>
    </div>
  );
}
