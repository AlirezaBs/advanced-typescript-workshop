import type { ComponentPropsWithoutRef, ElementType } from "react";
import "../exercise.css";

export type TextProps<C extends ElementType = "span"> = {
  as?: C;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<C>;

export function Text<C extends ElementType = "span">({ as, children, ...props }: TextProps<C>) {
  const Component = as ?? "span";
  return <Component {...props}>{children}</Component>;
}

export function PolymorphicChallenge() {
  return (
    <div className="exercise-panel">
      <Text as="p">Transaction summary</Text>
      <Text as="a" href="/transactions">
        View all transactions
      </Text>
    </div>
  );
}
