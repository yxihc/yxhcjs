// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined") {
    return;
  }
  if (!Prism.plugins.toolbar) {
    console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.");
    return;
  }
  function registerClipboard(element, copyInfo) {
    element.addEventListener("click", function() {
      copyTextToClipboard(copyInfo);
    });
  }
  function fallbackCopyTextToClipboard(copyInfo) {
    var textArea = document.createElement("textarea");
    textArea.value = copyInfo.getText();
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand("copy");
      setTimeout(function() {
        if (successful) {
          copyInfo.success();
        } else {
          copyInfo.error();
        }
      }, 1);
    } catch (err) {
      setTimeout(function() {
        copyInfo.error(err);
      }, 1);
    }
    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(copyInfo) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyInfo.getText()).then(copyInfo.success, function() {
        fallbackCopyTextToClipboard(copyInfo);
      });
    } else {
      fallbackCopyTextToClipboard(copyInfo);
    }
  }
  function selectElementText(element) {
    window.getSelection().selectAllChildren(element);
  }
  function getSettings(startElement) {
    var settings = {
      "copy": "Copy",
      "copy-error": "Press Ctrl+C to copy",
      "copy-success": "Copied!",
      "copy-timeout": 5e3
    };
    var prefix = "data-prismjs-";
    for (var key in settings) {
      var attr = prefix + key;
      var element = startElement;
      while (element && !element.hasAttribute(attr)) {
        element = element.parentElement;
      }
      if (element) {
        settings[key] = element.getAttribute(attr);
      }
    }
    return settings;
  }
  Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(env) {
    var element = env.element;
    var settings = getSettings(element);
    var linkCopy = document.createElement("button");
    linkCopy.className = "copy-to-clipboard-button";
    linkCopy.setAttribute("type", "button");
    var linkSpan = document.createElement("span");
    linkCopy.appendChild(linkSpan);
    setState("copy");
    registerClipboard(linkCopy, {
      getText: function() {
        return element.textContent;
      },
      success: function() {
        setState("copy-success");
        resetText();
      },
      error: function() {
        setState("copy-error");
        setTimeout(function() {
          selectElementText(element);
        }, 1);
        resetText();
      }
    });
    return linkCopy;
    function resetText() {
      setTimeout(function() {
        setState("copy");
      }, settings["copy-timeout"]);
    }
    function setState(state) {
      linkSpan.textContent = settings[state];
      linkCopy.setAttribute("data-copy-state", state);
    }
  });
})();
//# sourceMappingURL=prismjs_plugins_copy-to-clipboard_prism-copy-to-clipboard.js.map
