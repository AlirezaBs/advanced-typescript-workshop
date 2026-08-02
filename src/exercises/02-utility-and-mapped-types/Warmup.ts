import type { Prettify, StrictOmit } from "../../lib/types";

export type { Prettify, StrictOmit };

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: "admin" | "support" | "finance";
  createdAt: string;
  updatedAt: string;
}

/** TODO: Editable fields only — use StrictOmit from lib/types. */
export type UserFormData = User;

/** TODO: Preview card fields — use Pick. */
export type UserPreview = User;

/** TODO: PATCH payload — Partial of editable fields. */
export type UserPatch = User;

/** TODO: Readonly API response — use Readonly. */
export type UserResponse = User;

/** TODO: Map each role to permission strings — use Record. */
export type RolePermissions = Record<string, string[]>;

export const sampleUser: User = {
  id: "u_1",
  name: "Ada Lovelace",
  email: "ada@example.com",
  avatar: null,
  role: "admin",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-15T00:00:00Z",
};
