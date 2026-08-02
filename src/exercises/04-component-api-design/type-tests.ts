/** Expected shape once ModalActionProps is a mutually exclusive discriminated union */
type ExpectedModalActionProps =
  | { mode: "internal"; href: string; children: React.ReactNode }
  | { mode: "external"; href: string; children: React.ReactNode }
  | { mode: "button"; onClick: () => void; children: React.ReactNode };

const invalid = {
  mode: "button",
  // @ts-expect-error — cannot combine button onClick with link href
  href: "/dashboard",
  onClick: () => undefined,
  children: "Bad",
} satisfies ExpectedModalActionProps;
void invalid;
