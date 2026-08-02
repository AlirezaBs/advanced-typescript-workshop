/** TODO: Extend native button props; preserve onClick typing. */
export type ButtonProps = {
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
};

export function TypedButton(_props: ButtonProps) {
  return null;
}

/** TODO: Discriminated props — label required when id is provided (accessibility). */
export type InputProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
};

export function TypedInput(_props: InputProps) {
  return null;
}
