// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-actionscript.js
Prism.languages.actionscript = Prism.languages.extend("javascript", {
  "keyword": /\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/,
  "operator": /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
});
Prism.languages.actionscript["class-name"].alias = "function";
delete Prism.languages.actionscript["parameter"];
delete Prism.languages.actionscript["literal-property"];
if (Prism.languages.markup) {
  Prism.languages.insertBefore("actionscript", "string", {
    "xml": {
      pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
      lookbehind: true,
      inside: Prism.languages.markup
    }
  });
}
//# sourceMappingURL=prismjs_components_prism-actionscript.js.map
