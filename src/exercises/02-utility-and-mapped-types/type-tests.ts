import type { StrictOmit } from "../../lib/types";
import type { User } from "./Warmup";

type ExpectedUserFormData = StrictOmit<User, "id" | "createdAt" | "updatedAt">;

const badForm: ExpectedUserFormData = {
  // @ts-expect-error — id is server-owned and must not be in UserFormData
  id: "u_1",
  name: "X",
  email: "x@example.com",
  avatar: null,
  role: "admin",
};
void badForm;
