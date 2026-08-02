import { useState } from "react";
import { modules, type ModuleDefinition } from "./modules";
import "./App.css";

function ModulePanel({ module }: { module: ModuleDefinition }) {
  const Demo = module.component;
  const Challenge = module.challengeComponent;

  return (
    <div className="module-panel">
      <header className="module-header">
        <div>
          <p className="module-id">Module {module.id}</p>
          <h2>{module.title}</h2>
        </div>
        <span className={`status-chip status-chip--${module.status}`}>{module.status}</span>
      </header>

      <section className="objectives">
        <h3>Learning objectives</h3>
        <ul>
          {module.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <Demo />

      {Challenge && (
        <section className="challenge-section">
          <h3>Production challenge</h3>
          <Challenge />
        </section>
      )}
    </div>
  );
}

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState("00");
  const activeModule = modules.find((module) => module.id === activeModuleId) ?? modules[0]!;

  return (
    <div className="app">
      <aside className="sidebar">
        <header className="sidebar-header">
          <h1>Advanced TS in React</h1>
          <p>TypeScript learning playground</p>
        </header>

        <nav className="module-nav">
          {modules.map((module) => {
            const isActive = module.id === activeModuleId;

            return (
              <button
                key={module.id}
                type="button"
                className={`module-link${isActive ? " module-link--active" : ""}`}
                onClick={() => setActiveModuleId(module.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="module-link-title">
                  {module.id}. {module.title}
                </span>
                <span className={`module-link-status module-link-status--${module.status}`}>
                  {module.status}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="main">
        <ModulePanel module={activeModule} />
      </main>
    </div>
  );
}
