import "../exercise.css";

export type ModalActionProps =
  | { mode: "internal"; href: string; children: React.ReactNode }
  | { mode: "external"; href: string; children: React.ReactNode }
  | { mode: "button"; onClick: () => void; children: React.ReactNode };

export function ModalAction(props: ModalActionProps) {
  switch (props.mode) {
    case "internal":
      return (
        <a href={props.href} className="status-badge status-badge--pending">
          {props.children}
        </a>
      );
    case "external":
      return (
        <a href={props.href} target="_blank" rel="noreferrer" className="status-badge status-badge--paid">
          {props.children}
        </a>
      );
    case "button":
      return (
        <button type="button" onClick={props.onClick} className="status-badge status-badge--failed">
          {props.children}
        </button>
      );
    default: {
      const _exhaustive: never = props;
      return _exhaustive;
    }
  }
}

export function ComponentApiChallenge() {
  return (
    <div className="exercise-panel">
      <div className="demo-row">
        <ModalAction mode="button" onClick={() => undefined}>
          Confirm refund
        </ModalAction>
        <ModalAction mode="internal" href="/payments">
          View payments
        </ModalAction>
        <ModalAction mode="external" href="https://example.com/docs">
          API docs
        </ModalAction>
      </div>
    </div>
  );
}
