import type { ElementType } from "react";

/** TODO: Simplified polymorphic Box — as prop merges intrinsic props. */
export type BoxProps<C extends ElementType = "div"> = {
  as?: C;
  children?: React.ReactNode;
};

export function Box<C extends ElementType = "div">(_props: BoxProps<C>) {
  return null;
}
