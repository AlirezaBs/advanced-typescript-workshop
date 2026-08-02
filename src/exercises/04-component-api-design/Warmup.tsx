import type { ComponentPropsWithoutRef } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export function TypedButton({ variant = "primary", className, ...props }: ButtonProps) {
  const variantClass = variant === "primary" ? "status-badge--paid" : "status-badge--pending";
  return (
    <button
      {...props}
      className={[className, "status-badge", variantClass].filter(Boolean).join(" ")}
    />
  );
}

export type InputProps =
  | { id: string; label: string; value: string; onChange: (v: string) => void }
  | { id?: undefined; label?: string; value: string; onChange: (v: string) => void };

export function TypedInput(props: InputProps) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {props.label ? <span>{props.label}</span> : null}
      <input
        id={props.id}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}
