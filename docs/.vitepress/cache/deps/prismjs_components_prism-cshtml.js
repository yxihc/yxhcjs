// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-cshtml.js
(function(Prism2) {
  var commentLike = /\/(?![/*])|\/\/.*[\r\n]|\/\*[^*]*(?:\*(?!\/)[^*]*)*\*\//.source;
  var stringLike = /@(?!")|"(?:[^\r\n\\"]|\\.)*"|@"(?:[^\\"]|""|\\[\s\S])*"(?!")/.source + "|" + /'(?:(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'|(?=[^\\](?!')))/.source;
  function nested(pattern, depthLog2) {
    for (var i = 0; i < depthLog2; i++) {
      pattern = pattern.replace(/<self>/g, function() {
        return "(?:" + pattern + ")";
      });
    }
    return pattern.replace(/<self>/g, "[^\\s\\S]").replace(/<str>/g, "(?:" + stringLike + ")").replace(/<comment>/g, "(?:" + commentLike + ")");
  }
  var round = nested(/\((?:[^()'"@/]|<str>|<comment>|<self>)*\)/.source, 2);
  var square = nested(/\[(?:[^\[\]'"@/]|<str>|<comment>|<self>)*\]/.source, 1);
  var curly = nested(/\{(?:[^{}'"@/]|<str>|<comment>|<self>)*\}/.source, 2);
  var angle = nested(/<(?:[^<>'"@/]|<comment>|<self>)*>/.source, 1);
  var inlineCs = /@/.source + /(?:await\b\s*)?/.source + "(?:" + /(?!await\b)\w+\b/.source + "|" + round + ")(?:" + /[?!]?\.\w+\b/.source + "|(?:" + angle + ")?" + round + "|" + square + ")*" + /(?![?!\.(\[]|<(?!\/))/.source;
  var tagAttrInlineCs = /@(?![\w()])/.source + "|" + inlineCs;
  var tagAttrValue = "(?:" + /"[^"@]*"|'[^'@]*'|[^\s'"@>=]+(?=[\s>])/.source + `|["'][^"'@]*(?:(?:` + tagAttrInlineCs + `)[^"'@]*)+["'])`;
  var tagAttrs = /(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*<tagAttrValue>|(?=[\s/>])))+)?/.source.replace(/<tagAttrValue>/, tagAttrValue);
  var tagContent = /(?!\d)[^\s>\/=$<%]+/.source + tagAttrs + /\s*\/?>/.source;
  var tagRegion = /\B@?/.source + "(?:" + /<([a-zA-Z][\w:]*)/.source + tagAttrs + /\s*>/.source + "(?:" + (/[^<]/.source + "|" + // all tags that are not the start tag
  // eslint-disable-next-line regexp/strict
  /<\/?(?!\1\b)/.source + tagContent + "|" + // nested start tag
  nested(
    // eslint-disable-next-line regexp/strict
    /<\1/.source + tagAttrs + /\s*>/.source + "(?:" + (/[^<]/.source + "|" + // all tags that are not the start tag
    // eslint-disable-next-line regexp/strict
    /<\/?(?!\1\b)/.source + tagContent + "|<self>") + ")*" + // eslint-disable-next-line regexp/strict
    /<\/\1\s*>/.source,
    2
  )) + ")*" + // eslint-disable-next-line regexp/strict
  /<\/\1\s*>/.source + "|" + /</.source + tagContent + ")";
  Prism2.languages.cshtml = Prism2.languages.extend("markup", {});
  var csharpWithHtml = Prism2.languages.insertBefore("csharp", "string", {
    "html": {
      pattern: RegExp(tagRegion),
      greedy: true,
      inside: Prism2.languages.cshtml
    }
  }, { csharp: Prism2.languages.extend("csharp", {}) });
  var cs = {
    pattern: /\S[\s\S]*/,
    alias: "language-csharp",
    inside: csharpWithHtml
  };
  var inlineValue = {
    pattern: RegExp(/(^|[^@])/.source + inlineCs),
    lookbehind: true,
    greedy: true,
    alias: "variable",
    inside: {
      "keyword": /^@/,
      "csharp": cs
    }
  };
  Prism2.languages.cshtml.tag.pattern = RegExp(/<\/?/.source + tagContent);
  Prism2.languages.cshtml.tag.inside["attr-value"].pattern = RegExp(/=\s*/.source + tagAttrValue);
  Prism2.languages.insertBefore("inside", "punctuation", { "value": inlineValue }, Prism2.languages.cshtml.tag.inside["attr-value"]);
  Prism2.languages.insertBefore("cshtml", "prolog", {
    "razor-comment": {
      pattern: /@\*[\s\S]*?\*@/,
      greedy: true,
      alias: "comment"
    },
    "block": {
      pattern: RegExp(
        /(^|[^@])@/.source + "(?:" + [
          // @{ ... }
          curly,
          // @code{ ... }
          /(?:code|functions)\s*/.source + curly,
          // @for (...) { ... }
          /(?:for|foreach|lock|switch|using|while)\s*/.source + round + /\s*/.source + curly,
          // @do { ... } while (...);
          /do\s*/.source + curly + /\s*while\s*/.source + round + /(?:\s*;)?/.source,
          // @try { ... } catch (...) { ... } finally { ... }
          /try\s*/.source + curly + /\s*catch\s*/.source + round + /\s*/.source + curly + /\s*finally\s*/.source + curly,
          // @if (...) {...} else if (...) {...} else {...}
          /if\s*/.source + round + /\s*/.source + curly + "(?:" + /\s*else/.source + "(?:" + /\s+if\s*/.source + round + ")?" + /\s*/.source + curly + ")*",
          // @helper Ident(params) { ... }
          /helper\s+\w+\s*/.source + round + /\s*/.source + curly
        ].join("|") + ")"
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "keyword": /^@\w*/,
        "csharp": cs
      }
    },
    "directive": {
      pattern: /^([ \t]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/m,
      lookbehind: true,
      greedy: true,
      inside: {
        "keyword": /^@\w+/,
        "csharp": cs
      }
    },
    "value": inlineValue,
    "delegate-operator": {
      pattern: /(^|[^@])@(?=<)/,
      lookbehind: true,
      alias: "operator"
    }
  });
  Prism2.languages.razor = Prism2.languages.cshtml;
})(Prism);
//# sourceMappingURL=prismjs_components_prism-cshtml.js.map
