// Markdown files are bundled as plain text (see the "loader" option in angular.json).
declare module '*.md' {
  const content: string;
  export default content;
}
