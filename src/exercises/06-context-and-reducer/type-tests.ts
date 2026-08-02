import type { Permission } from "./Warmup";

// @ts-expect-error — invalid permission literal
const bad: Permission = "admin:delete";
void bad;
