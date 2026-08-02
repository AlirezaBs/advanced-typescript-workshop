import type { RolePermissions } from "./Warmup";
import "../exercise.css";

const rolePermissions: RolePermissions = {
  admin: ["users:read", "users:edit", "payments:refund", "reports:view"],
  support: ["users:read", "payments:refund"],
  finance: ["reports:view", "payments:refund"],
};

export function UtilityTypesChallenge() {
  return (
    <div className="exercise-panel">
      {Object.entries(rolePermissions).map(([role, permissions]) => (
        <section key={role}>
          <h3>{role}</h3>
          <div className="demo-row">
            {permissions.map((permission) => (
              <span key={permission} className="status-badge status-badge--paid">
                {permission}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
