// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/plugins/toolbar/prism-toolbar.js
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined") {
    return;
  }
  var callbacks = [];
  var map = {};
  var noop = function() {
  };
  Prism.plugins.toolbar = {};
  var registerButton = Prism.plugins.toolbar.registerButton = function(key, opts) {
    var callback;
    if (typeof opts === "function") {
      callback = opts;
    } else {
      callback = function(env) {
        var element;
        if (typeof opts.onClick === "function") {
          element = document.createElement("button");
          element.type = "button";
          element.addEventListener("click", function() {
            opts.onClick.call(this, env);
          });
        } else if (typeof opts.url === "string") {
          element = document.createElement("a");
          element.href = opts.url;
        } else {
          element = document.createElement("span");
        }
        if (opts.className) {
          element.classList.add(opts.className);
        }
        element.textContent = opts.text;
        return element;
      };
    }
    if (key in map) {
      console.warn('There is a button with the key "' + key + '" registered already.');
      return;
    }
    callbacks.push(map[key] = callback);
  };
  function getOrder(element) {
    while (element) {
      var order = element.getAttribute("data-toolbar-order");
      if (order != null) {
        order = order.trim();
        if (order.length) {
          return order.split(/\s*,\s*/g);
        } else {
          return [];
        }
      }
      element = element.parentElement;
    }
  }
  var hook = Prism.plugins.toolbar.hook = function(env) {
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }
    if (pre.parentNode.classList.contains("code-toolbar")) {
      return;
    }
    var wrapper = document.createElement("div");
    wrapper.classList.add("code-toolbar");
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    var toolbar = document.createElement("div");
    toolbar.classList.add("toolbar");
    var elementCallbacks = callbacks;
    var order = getOrder(env.element);
    if (order) {
      elementCallbacks = order.map(function(key) {
        return map[key] || noop;
      });
    }
    elementCallbacks.forEach(function(callback) {
      var element = callback(env);
      if (!element) {
        return;
      }
      var item = document.createElement("div");
      item.classList.add("toolbar-item");
      item.appendChild(element);
      toolbar.appendChild(item);
    });
    wrapper.appendChild(toolbar);
  };
  registerButton("label", function(env) {
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }
    if (!pre.hasAttribute("data-label")) {
      return;
    }
    var element;
    var template;
    var text = pre.getAttribute("data-label");
    try {
      template = document.querySelector("template#" + text);
    } catch (e) {
    }
    if (template) {
      element = template.content;
    } else {
      if (pre.hasAttribute("data-url")) {
        element = document.createElement("a");
        element.href = pre.getAttribute("data-url");
      } else {
        element = document.createElement("span");
      }
      element.textContent = text;
    }
    return element;
  });
  Prism.hooks.add("complete", hook);
})();
//# sourceMappingURL=prismjs_plugins_toolbar_prism-toolbar.js.map
