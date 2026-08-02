import type { ComponentPropsWithoutRef, ElementType } from "react";

export type BoxProps<C extends ElementType = "div"> = {
  as?: C;
} & ComponentPropsWithoutRef<C>;

export function Box<C extends ElementType = "div">({ as, ...props }: BoxProps<C>) {
  const Component = as ?? "div";
  return <Component {...props} />;
}
