import { createContext, useContext } from "react";
import { PERMISSIONS, type Permission } from "./Warmup";
import "../exercise.css";

type PermissionsContextValue = {
  permissions: Set<Permission>;
  can: (permission: Permission) => boolean;
};

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const permissions = new Set<Permission>([
    PERMISSIONS["users:read"],
    PERMISSIONS["payments:refund"],
  ]);

  const value: PermissionsContextValue = {
    permissions,
    can: (permission) => permissions.has(permission),
  };

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
}

export function usePermission(permission: Permission): boolean {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermission must be used within PermissionsProvider");
  }
  return context.can(permission);
}

function PermissionChecks() {
  const canRefund = usePermission(PERMISSIONS["payments:refund"]);
  const canEditUsers = usePermission(PERMISSIONS["users:edit"]);

  return (
    <div className="demo-row">
      <span className={`status-badge ${canRefund ? "status-badge--paid" : "status-badge--failed"}`}>
        Refund: {canRefund ? "allowed" : "denied"}
      </span>
      <span className={`status-badge ${canEditUsers ? "status-badge--paid" : "status-badge--failed"}`}>
        Edit users: {canEditUsers ? "allowed" : "denied"}
      </span>
    </div>
  );
}

export function ContextReducerChallenge() {
  return (
    <div className="exercise-panel">
      <PermissionsProvider>
        <PermissionChecks />
      </PermissionsProvider>
    </div>
  );
}
