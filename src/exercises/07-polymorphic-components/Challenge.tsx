import type { ElementType } from "react";
import "../exercise.css";

/** TODO: Polymorphic Text with as prop; document limitations in README. */
export type TextProps<C extends ElementType = "span"> = {
  as?: C;
  children: React.ReactNode;
};

export function Text<C extends ElementType = "span">(_props: TextProps<C>) {
  return <p className="placeholder">Implement polymorphic Text</p>;
}

export function PolymorphicChallenge() {
  return (
    <div className="exercise-panel">
      <Text as="p">Transaction summary</Text>
      <Text as="span">View all transactions</Text>
    </div>
  );
}
