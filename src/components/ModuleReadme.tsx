import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getModuleReadme, stripModuleTitle } from "../lib/moduleReadmes";
import "./ModuleReadme.css";

type ModuleReadmeProps = {
  slug: string;
  moduleId: string;
};

export function ModuleReadme({ slug, moduleId }: ModuleReadmeProps) {
  const markdown = stripModuleTitle(getModuleReadme(slug));

  return (
    <article className="module-readme" aria-labelledby={`readme-heading-${moduleId}`}>
      <header className="module-readme-header">
        <p className="module-readme-label">Lesson guide</p>
        <h2 id={`readme-heading-${moduleId}`}>Module {moduleId} README</h2>
      </header>

      <div className="module-readme-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </article>
  );
}
