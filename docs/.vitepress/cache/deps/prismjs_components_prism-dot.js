// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-dot.js
(function(Prism2) {
  var ID = "(?:" + [
    // an identifier
    /[a-zA-Z_\x80-\uFFFF][\w\x80-\uFFFF]*/.source,
    // a number
    /-?(?:\.\d+|\d+(?:\.\d*)?)/.source,
    // a double-quoted string
    /"[^"\\]*(?:\\[\s\S][^"\\]*)*"/.source,
    // HTML-like string
    /<(?:[^<>]|(?!<!--)<(?:[^<>"']|"[^"]*"|'[^']*')+>|<!--(?:[^-]|-(?!->))*-->)*>/.source
  ].join("|") + ")";
  var IDInside = {
    "markup": {
      pattern: /(^<)[\s\S]+(?=>$)/,
      lookbehind: true,
      alias: ["language-markup", "language-html", "language-xml"],
      inside: Prism2.languages.markup
    }
  };
  function withID(source, flags) {
    return RegExp(source.replace(/<ID>/g, function() {
      return ID;
    }), flags);
  }
  Prism2.languages.dot = {
    "comment": {
      pattern: /\/\/.*|\/\*[\s\S]*?\*\/|^#.*/m,
      greedy: true
    },
    "graph-name": {
      pattern: withID(/(\b(?:digraph|graph|subgraph)[ \t\r\n]+)<ID>/.source, "i"),
      lookbehind: true,
      greedy: true,
      alias: "class-name",
      inside: IDInside
    },
    "attr-value": {
      pattern: withID(/(=[ \t\r\n]*)<ID>/.source),
      lookbehind: true,
      greedy: true,
      inside: IDInside
    },
    "attr-name": {
      pattern: withID(/([\[;, \t\r\n])<ID>(?=[ \t\r\n]*=)/.source),
      lookbehind: true,
      greedy: true,
      inside: IDInside
    },
    "keyword": /\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,
    "compass-point": {
      pattern: /(:[ \t\r\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uFFFF])/,
      lookbehind: true,
      alias: "builtin"
    },
    "node": {
      pattern: withID(/(^|[^-.\w\x80-\uFFFF\\])<ID>/.source),
      lookbehind: true,
      greedy: true,
      inside: IDInside
    },
    "operator": /[=:]|-[->]/,
    "punctuation": /[\[\]{};,]/
  };
  Prism2.languages.gv = Prism2.languages.dot;
})(Prism);
//# sourceMappingURL=prismjs_components_prism-dot.js.map