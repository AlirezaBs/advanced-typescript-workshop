import type { UserFormData } from "./Warmup";
import "../exercise.css";

/** TODO: Form field keys must be keyof UserFormData; requiredKeys type-safe. */
export type FormConfig<T, K extends keyof T = keyof T> = {
  initialValues: Partial<T>;
  requiredKeys: K[];
  fields: Array<{
    name: keyof T;
    label: string;
  }>;
};

/** TODO: Implement AdminUserForm using FormConfig<UserFormData>. */
export function AdminUserForm(_config: FormConfig<UserFormData>) {
  return <p className="placeholder">Implement typed form config</p>;
}

export function UtilityTypesExercise() {
  return (
    <div className="exercise-panel">
      <section>
        <h2>Exercise — Typed admin user form</h2>
        <AdminUserForm
          initialValues={{ name: "Ada" }}
          requiredKeys={["name", "email"]}
          fields={[
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
          ]}
        />
      </section>
    </div>
  );
}
