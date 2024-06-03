// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-groovy.js
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
        // see below
      }
    }
  };
  Prism2.languages.groovy = Prism2.languages.extend("clike", {
    "string": {
      // https://groovy-lang.org/syntax.html#_dollar_slashy_string
      pattern: /'''(?:[^\\]|\\[\s\S])*?'''|'(?:\\.|[^\\'\r\n])*'/,
      greedy: true
    },
    "keyword": /\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|in|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
    "number": /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
    "operator": {
      pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
      lookbehind: true
    },
    "punctuation": /\.+|[{}[\];(),:$]/
  });
  Prism2.languages.insertBefore("groovy", "string", {
    "shebang": {
      pattern: /#!.+/,
      alias: "comment",
      greedy: true
    },
    "interpolation-string": {
      // TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with
      // simple division (see JS regex), so find a fix maybe?
      pattern: /"""(?:[^\\]|\\[\s\S])*?"""|(["/])(?:\\.|(?!\1)[^\\\r\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "string": /[\s\S]+/
      }
    }
  });
  Prism2.languages.insertBefore("groovy", "punctuation", {
    "spock-block": /\b(?:and|cleanup|expect|given|setup|then|when|where):/
  });
  Prism2.languages.insertBefore("groovy", "function", {
    "annotation": {
      pattern: /(^|[^.])@\w+/,
      lookbehind: true,
      alias: "punctuation"
    }
  });
  interpolation.inside.expression.inside = Prism2.languages.groovy;
})(Prism);
//# sourceMappingURL=prismjs_components_prism-groovy.js.map
