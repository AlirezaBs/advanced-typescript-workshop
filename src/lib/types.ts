export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type AppErrorKind = "validation" | "authorization" | "network" | "server";
