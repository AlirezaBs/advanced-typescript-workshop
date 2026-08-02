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

export type UserFormData = StrictOmit<User, "id" | "createdAt" | "updatedAt">;

export type UserPreview = Pick<User, "id" | "name" | "email" | "avatar" | "role">;

export type UserPatch = Partial<UserFormData>;

export type UserResponse = Readonly<User>;

export type RolePermissions = Record<User["role"], string[]>;

export const sampleUser: User = {
  id: "u_1",
  name: "Ada Lovelace",
  email: "ada@example.com",
  avatar: null,
  role: "admin",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-15T00:00:00Z",
};
