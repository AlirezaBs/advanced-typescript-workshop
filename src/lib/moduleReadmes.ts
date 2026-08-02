const readmeModules = import.meta.glob("../exercises/*/README.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const readmeBySlug = Object.fromEntries(
  Object.entries(readmeModules).map(([path, content]) => {
    const slug = path.match(/\/exercises\/([^/]+)\/README\.md$/)?.[1];
    return slug ? [slug, content] : ["", content];
  }),
) as Record<string, string>;

export function getModuleReadme(slug: string): string {
  return readmeBySlug[slug] ?? `# Lesson guide\n\nREADME not found for \`${slug}\`.`;
}

/** Drop the duplicate module title — the app header already shows it. */
export function stripModuleTitle(markdown: string): string {
  return markdown.replace(/^#\s+Module[^\n]*\n+/, "");
}
