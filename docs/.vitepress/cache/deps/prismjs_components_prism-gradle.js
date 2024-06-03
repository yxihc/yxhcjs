// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-gradle.js
(function(Prism2) {
  var interpolation = {
    pattern: /((?:^|[^\\$])(?:\\{2})*)\$(?:\w+|\{[^{}]*\})/,
    lookbehind: true,
    inside: {
      "interpolation-punctuation": {
        pattern: /^\$\{?|\}$/,
        alias: "punctuation"
      },
      "expression": {
        pattern: /[\s\S]+/,
        inside: null
      }
    }
  };
  Prism2.languages.gradle = Prism2.languages.extend("clike", {
    "string": {
      pattern: /'''(?:[^\\]|\\[\s\S])*?'''|'(?:\\.|[^\\'\r\n])*'/,
      greedy: true
    },
    "keyword": /\b(?:apply|def|dependencies|else|if|implementation|import|plugin|plugins|project|repositories|repository|sourceSets|tasks|val)\b/,
    "number": /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
    "operator": {
      pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
      lookbehind: true
    },
    "punctuation": /\.+|[{}[\];(),:$]/
  });
  Prism2.languages.insertBefore("gradle", "string", {
    "shebang": {
      pattern: /#!.+/,
      alias: "comment",
      greedy: true
    },
    "interpolation-string": {
      pattern: /"""(?:[^\\]|\\[\s\S])*?"""|(["/])(?:\\.|(?!\1)[^\\\r\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "string": /[\s\S]+/
      }
    }
  });
  Prism2.languages.insertBefore("gradle", "punctuation", {
    "spock-block": /\b(?:and|cleanup|expect|given|setup|then|when|where):/
  });
  Prism2.languages.insertBefore("gradle", "function", {
    "annotation": {
      pattern: /(^|[^.])@\w+/,
      lookbehind: true,
      alias: "punctuation"
    }
  });
  interpolation.inside.expression.inside = Prism2.languages.gradle;
})(Prism);
//# sourceMappingURL=prismjs_components_prism-gradle.js.map
