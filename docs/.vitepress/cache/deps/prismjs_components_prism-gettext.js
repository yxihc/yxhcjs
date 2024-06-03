// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-gettext.js
Prism.languages.gettext = {
  "comment": [
    {
      pattern: /# .*/,
      greedy: true,
      alias: "translator-comment"
    },
    {
      pattern: /#\..*/,
      greedy: true,
      alias: "extracted-comment"
    },
    {
      pattern: /#:.*/,
      greedy: true,
      alias: "reference-comment"
    },
    {
      pattern: /#,.*/,
      greedy: true,
      alias: "flag-comment"
    },
    {
      pattern: /#\|.*/,
      greedy: true,
      alias: "previously-untranslated-comment"
    },
    {
      pattern: /#.*/,
      greedy: true
    }
  ],
  "string": {
    pattern: /(^|[^\\])"(?:[^"\\]|\\.)*"/,
    lookbehind: true,
    greedy: true
  },
  "keyword": /^msg(?:ctxt|id|id_plural|str)\b/m,
  "number": /\b\d+\b/,
  "punctuation": /[\[\]]/
};
Prism.languages.po = Prism.languages.gettext;
//# sourceMappingURL=prismjs_components_prism-gettext.js.map