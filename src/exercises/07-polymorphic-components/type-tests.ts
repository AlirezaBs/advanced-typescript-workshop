import type { ElementType } from "react";

/** Expected shape once BoxProps merges intrinsic element props */
type ExpectedBoxProps<C extends ElementType = "div"> = {
  as?: C;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

// @ts-expect-error — href is not valid on button element props
const bad: ExpectedBoxProps<"button"> = { as: "button", href: "/nope", children: "Bad" };
void bad;
