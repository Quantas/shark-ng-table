import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('json', json);

/** Returns syntax highlighted HTML for a code snippet. Unknown languages are escaped and returned as-is. */
export function highlight(code: string, language: string): string {
  const lang = hljs.getLanguage(language) ? language : 'plaintext';
  return lang === 'plaintext'
    ? code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    : hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
}

/** Removes the common leading indentation and surrounding blank lines from a template literal snippet. */
export function dedent(code: string): string {
  const lines = code.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
  const indent = Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^ */)![0].length));
  return lines.map(line => line.slice(indent)).join('\n');
}
