import type { UserFormData } from "./Warmup";
import "../exercise.css";

export type FormConfig<T, K extends keyof T = keyof T> = {
  initialValues: Partial<T>;
  requiredKeys: K[];
  fields: Array<{
    name: keyof T;
    label: string;
  }>;
};

export function AdminUserForm({ initialValues, requiredKeys, fields }: FormConfig<UserFormData>) {
  return (
    <form className="demo-row" onSubmit={(event) => event.preventDefault()}>
      {fields.map((field) => {
        const isRequired = requiredKeys.includes(field.name as (typeof requiredKeys)[number]);
        const value = initialValues[field.name];
        const displayValue = value == null ? "" : String(value);

        return (
          <label key={String(field.name)} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span>
              {field.label}
              {isRequired ? " *" : ""}
            </span>
            <input name={String(field.name)} defaultValue={displayValue} />
          </label>
        );
      })}
    </form>
  );
}

export function UtilityTypesExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Typed admin user form</h2>
        <AdminUserForm
          initialValues={{ name: "Ada", email: "ada@example.com" }}
          requiredKeys={["name", "email"]}
          fields={[
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
            { name: "role", label: "Role" },
          ]}
        />
      </section>
    </div>
  );
}
