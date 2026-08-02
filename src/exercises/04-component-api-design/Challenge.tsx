import "../exercise.css";

/** TODO: Mutually exclusive modes — internal link | external link | button action. */
export type ModalActionProps = {
  mode: "internal" | "external" | "button";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export function ModalAction(_props: ModalActionProps) {
  return <p className="placeholder">Implement ModalAction</p>;
}

export function ComponentApiChallenge() {
  return (
    <div className="exercise-panel">
      <ModalAction mode="button" onClick={() => undefined}>
        Confirm refund
      </ModalAction>
    </div>
  );
}
