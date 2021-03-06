// Generated by CoffeeScript 1.10.0
var $A, $C, $ID, $L, $N, $R, $X, $XHR, $html, $svg,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

$X = (function() {
  var Class, XPath, defaults;
  defaults = {
    ns: {
      svg: "http://www.w3.org/2000/svg",
      html: "http://www.w3.org/1999/xhtml",
      xul: "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      xslt: "http://www.w3.org/1999/XSL/Transform",
      fo: "http://www.w3.org/1999/XSL/Format",
      xlink: "http://www.w3.org/1999/xlink"
    },
    resolver: function(ns) {
      return function(prefix) {
        return ns[prefix] || null;
      };
    },
    type: 0
  };
  Class = (function(superClass) {
    extend(Class, superClass);

    function Class() {
      Class.__super__.constructor.apply(this, arguments);
    }

    Class.prototype.clone = function() {
      var result;
      result = new this.constructor;
      result.push.apply(result, this);
      return result;
    };

    Class.prototype.xpath = function(xp, config) {
      var element, i, len, result;
      result = new this.constructor;
      for (i = 0, len = this.length; i < len; i++) {
        element = this[i];
        result.push.apply(result, this.constructor.XPath(xp, element, config));
      }
      return result;
    };

    Class.prototype.xpathFilter = function(xp) {
      var result;
      result = new this.constructor;
      result.push.apply(result, this.filter((function(_this) {
        return function(item) {
          return (_this.constructor.XPath(xp, item, {
            type: 3
          }))[0];
        };
      })(this)));
      return result;
    };

    Class.prototype.unique = typeof Set === 'function' ? function() {
      var result, set;
      result = new this.constructor;
      set = new Set;
      this.forEach(function(item) {
        if (!set.has(item)) {
          set.add(item);
          return result.push(item);
        }
      });
      return result;
    } : function() {
      var result;
      result = new this.constructor;
      this.forEach(function(item) {
        if (indexOf.call(result, item) < 0) {
          return result.push(item);
        }
      });
      return result;
    };

    Class.prototype.addListener = function(event, callback) {
      var i, item, len;
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        try {
          item.addEventListener(event, callback, false);
        } catch (undefined) {}
      }
      return this;
    };

    Class.prototype.removeListener = function(event, callback) {
      var i, item, len;
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        try {
          item.removeEventListener(event, callback, false);
        } catch (undefined) {}
      }
      return this;
    };

    Class.prototype.on = function() {
      return this.addListener.apply(this, arguments);
    };

    Class.prototype.off = function() {
      return this.removeListener.apply(this, arguments);
    };

    Class.prototype.one = function(event, callback) {
      var i, item, len, oneCallback;
      oneCallback = function() {
        try {
          this.removeEventListener(event, oneCallback, false);
        } catch (undefined) {}
        return callback.apply(this, arguments);
      };
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        try {
          item.addEventListener(event, oneCallback, false);
        } catch (undefined) {}
      }
      return this;
    };

    Class.prototype.once = function(event, callback) {
      var copy, i, item, len, onceCallback;
      copy = this.clone();
      onceCallback = function() {
        var i, item, len;
        try {
          for (i = 0, len = copy.length; i < len; i++) {
            item = copy[i];
            item.removeEventListener(event, onceCallback, false);
          }
        } catch (undefined) {}
        return callback.apply(this, arguments);
      };
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        try {
          item.addEventListener(event, onceCallback, false);
        } catch (undefined) {}
      }
      return this;
    };

    Class.prototype.dispatch = function(name, params) {
      var element, event, i, key, len, results, value;
      if (params == null) {
        params = {};
      }
      results = [];
      for (i = 0, len = this.length; i < len; i++) {
        element = this[i];
        if (!(typeof element.dispatchEvent === 'function')) {
          continue;
        }
        event = document.createEvent('Events');
        for (key in params) {
          value = params[key];
          event[key] = value;
        }
        results.push(element.dispatchEvent(event));
      }
      return results;
    };

    Class.prototype.fire = function() {
      return this.dispatch.apply(this, arguments);
    };

    Class.prototype.addClass = function(cls) {
      var classValue, i, item, len;
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Element) {
          item.setAttribute('class', item.hasAttribute('class') ? (classValue = item.getAttribute('class'), indexOf.call(classValue.split(/\s+/), cls) >= 0 ? classValue : classValue + " " + cls) : cls);
        }
      }
      return this;
    };

    Class.prototype.removeClass = function(cls) {
      var i, item, len, newClass, test;
      test = function(className) {
        return className !== cls;
      };
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Element) {
          if (newClass = item.getAttribute('class').split(/\s+/).filter(test).join(' ')) {
            item.setAttribute('class', newClass);
          } else {
            item.removeAttribute('class');
          }
        }
      }
      return this;
    };

    Class.prototype.attr = function(attrs) {
      var i, item, len, name, ns, splited, value;
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Element) {
          for (name in attrs) {
            value = attrs[name];
            splited = name.split(':');
            if (splited.length === 2) {
              ns = splited[0], name = splited[1];
              ns = this.constructor.XPath.defaults.ns[ns];
              try {
                if (value != null) {
                  item.setAttributeNS(ns, name, value);
                } else {
                  item.removeAttributeNS(ns, name);
                }
              } catch (undefined) {}
            } else {
              try {
                if (value != null) {
                  item.setAttribute(name, value);
                } else {
                  item.removeAttribute(name);
                }
              } catch (undefined) {}
            }
          }
        }
      }
      return this;
    };

    Class.prototype.getAttr = function(attr) {
      return (this.constructor.XPath("@" + attr, this[0], {
        type: 2
      }))[0];
    };

    Class.prototype.css = function(attrs) {
      var i, item, len, name, value;
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Element) {
          for (name in attrs) {
            value = attrs[name];
            item.style[name] = value;
          }
        }
      }
      return this;
    };

    Class.prototype.empty = function() {
      var i, item, len;
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Element) {
          while (item.hasChildNodes()) {
            item.removeChild(item.firstChild);
          }
        }
      }
      return this;
    };

    Class.prototype.remove = function() {
      var i, item, len, results;
      results = [];
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Node) {
          if (item.parentNode instanceof Node) {
            results.push(item.parentNode.removeChild(item));
          } else {
            results.push(void 0);
          }
        }
      }
      return results;
    };

    Class.prototype.prepend = function() {
      var args, element, i, item, len, prependArray, prependArrayMain;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (!args.length) {
        return this;
      }
      prependArrayMain = function(arr) {
        var i, index, results, value;
        results = [];
        for (index = i = arr.length - 1; i >= 0; index = i += -1) {
          value = arr[index];
          if (value instanceof Node) {
            results.push(element.insertBefore(value, element.firstChild));
          } else if (value instanceof [].constructor) {
            results.push(prependArray(value));
          } else {
            results.push(element.insertBefore(document.createTextNode("" + value), element.firstChild));
          }
        }
        return results;
      };
      prependArray = function(arr) {
        if (element.firstChild) {
          prependArray = prependArrayMain;
          return prependArrayMain(arr);
        } else if (arr[arr.length - 1] instanceof [].constructor) {
          prependArray(arr[arr.length - 1]);
          return prependArray(arr.slice(0, -1));
        } else {
          if (arr[arr.length - 1] instanceof Node) {
            element.appendChild(arr[arr.length - 1]);
          } else {
            element.appendChild(document.createTextNode("" + value));
          }
          prependArray = prependArrayMain;
          return prependArray(arr.slice(0, -1));
        }
      };
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Node) {
          element = item;
          break;
        }
      }
      if (element) {
        prependArray(args);
      }
      return this;
    };

    Class.prototype.append = function() {
      var appendArray, args, element, i, item, len;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (!args.length) {
        return this;
      }
      appendArray = function(arr) {
        var i, len, results, value;
        results = [];
        for (i = 0, len = arr.length; i < len; i++) {
          value = arr[i];
          if (value instanceof Node) {
            results.push(element.appendChild(value));
          } else if (value instanceof [].constructor) {
            results.push(appendArray(value));
          } else {
            results.push(element.appendChild(document.createTextNode("" + value)));
          }
        }
        return results;
      };
      for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        if (item instanceof Node) {
          element = item;
          break;
        }
      }
      if (element) {
        appendArray(args);
      }
      return this;
    };

    Class.prototype.val = function(value) {
      var i, item, j, len, len1;
      if (arguments.length) {
        for (i = 0, len = this.length; i < len; i++) {
          item = this[i];
          if (!(item instanceof Element)) {
            continue;
          }
          item.value = value;
          switch (false) {
            case !(item instanceof HTMLTextAreaElement):
              item.value = value;
              break;
            case !(item instanceof HTMLSelectElement):
              item.value = value;
              break;
            case !(item instanceof HTMLInputElement):
              switch (item.getAttribute) {
                case 'file':
                  continue;
                case 'checkbox':
                case 'radio':
                  item.checked = !!value;
                  break;
                default:
                  item.value = value;
              }
          }
        }
        return this;
      } else {
        for (j = 0, len1 = this.length; j < len1; j++) {
          item = this[j];
          if (item instanceof Element) {
            switch (false) {
              case !(item instanceof HTMLTextAreaElement):
                return item.value;
              case !(item instanceof HTMLSelectElement):
                return item.value;
              case !(item instanceof HTMLInputElement):
                switch (item.getAttribute) {
                  case 'file':
                    return item.files;
                  case 'checkbox':
                  case 'radio':
                    return item.checked;
                  default:
                    return item.value;
                }
            }
          }
        }
      }
    };

    return Class;

  })([].constructor);
  XPath = function(xpath, root, config) {
    var i, index, item, iterator, ref, resolver, result, type;
    if (root == null) {
      root = document;
    }
    resolver = (((config != null ? config.resolver : void 0) != null) || defaults.resolver)(((config != null ? config.ns : void 0) != null) || defaults.ns);
    type = (config != null ? config.type : void 0) != null ? config.type : defaults.type;
    iterator = (function() {
      try {
        return document.evaluate(xpath, root, resolver, type, null);
      } catch (undefined) {}
    })();
    result = new Class;
    if (iterator) {
      switch (iterator.resultType) {
        case 1:
          result.push(iterator.numberValue);
          break;
        case 2:
          result.push(iterator.stringValue);
          break;
        case 3:
          result.push(iterator.booleanValue);
          break;
        case 4:
        case 5:
          while ((item = iterator.iterateNext()) != null) {
            result.push(item);
          }
          break;
        case 6:
        case 7:
          for (index = i = 0, ref = iterator.snapshotLength; 0 <= ref ? i < ref : i > ref; index = 0 <= ref ? ++i : --i) {
            result.push(iterator.snapshotItem(index));
          }
          break;
        case 8:
        case 9:
          result.push(iterator.singleNodeValue);
      }
    }
    return result;
  };
  XPath.Class = Class;
  Class.XPath = XPath;
  XPath.defaults = defaults;
  XPath.clone = function() {
    var field, i, len, newClass, newXPath, ref;
    newXPath = (function(originalXPath) {
      return function() {
        return originalXPath.apply(this, arguments);
      };
    })(this);
    ref = Object.keys(this);
    for (i = 0, len = ref.length; i < len; i++) {
      field = ref[i];
      newXPath[field] = this[field];
    }
    newClass = (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }

      return _Class;

    })(this.Class);
    newClass.XPath = newXPath;
    newXPath.Class = newClass;
    return newXPath;
  };
  return XPath;
})();

"click dblclick mousedown mouseup mouseover mousemove mouseout dragstart drag dragenter\ndragleave dragover drop dragend keydown keypress keyup load unload abort\nerror resize scroll select change submit reset focus blur focusin\nfocusout DOMActivate DOMSubtreeModified DOMNodeInserted DOMNodeRemoved\nDOMNodeRemovedFromDocument DOMNodeInsertedIntoDocument DOMAttrModified DOMCharacterDataModified\ntouchstart touchend touchmove touchenter touchleave\ntouchcancel pointerdown pointerup pointercancel pointermove\npointerover pointerout pointerenter pointerleave gotpointercapture\nlostpointercapture cut copy paste beforecut\nbeforecopy beforepaste afterupdate beforeupdate cellchange\ndataavailable datasetchanged datasetcomplete errorupdate rowenter\nrowexit rowsdelete rowinserted contextmenu\nselectstart help beforeunload stop beforeeditfocus\nstart finish bounce beforeprint afterprint\npropertychange filterchange readystatechange losecapture DOMMouseScroll\ndragdrop dragexit draggesture CheckboxStateChange RadioStateChange close command input\nDOMMenuItemActive DOMMenuItemInactive overflow overflowchanged\nunderflow popuphidden popuphiding popupshowing popupshown broadcast commandupdate".split(/\s/).forEach(function(event) {
  return $X.Class.prototype[event] = function(callback) {
    return this.on(event, callback);
  };
});

$A = function() {
  var arr, i, j, len, len1, result, subval, val;
  arr = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  result = new $X.Class;
  for (i = 0, len = arr.length; i < len; i++) {
    val = arr[i];
    if ([].constructor.isArray(val)) {
      for (j = 0, len1 = val.length; j < len1; j++) {
        subval = val[j];
        result.push.apply(result, $A(subval));
      }
    } else {
      result.push(val);
    }
  }
  return result;
};

$svg = function(tag) {
  return $A([document.createElementNS("http://www.w3.org/2000/svg", tag)]);
};

$html = function(tag) {
  return $A([document.createElementNS("http://www.w3.org/1999/xhtml", tag)]);
};

$ID = function(id, root) {
  var e, element, result;
  if (root == null) {
    root = document;
  }
  element = (function() {
    var error1;
    try {
      return root.getElementById(id);
    } catch (error1) {
      e = error1;
      return null;
    }
  })();
  result = new $X.Class;
  if (element != null) {
    result.push(element);
  }
  return result;
};

$C = function(cls, root) {
  if (root == null) {
    root = document;
  }
  return $A(root.getElementsByClassName(cls));
};

$N = function(name, root) {
  return $X("//*[@name=" + (JSON.stringify(name)) + "]", root);
};

$L = console.log.bind(console);

$R = (function() {
  var list;
  list = [];
  return function(callback) {
    var e, error1, results;
    if (document.readyState !== "complete") {
      return ($A([document])).on('DOMContentLoaded', function() {
        return callback();
      });
    } else {
      if (list.length) {
        return list.push(callback);
      } else {
        list.push(callback);
        results = [];
        while (list.length) {
          try {
            results.push(list[0]());
          } catch (error1) {
            e = error1;
            results.push(setTimeout((function() {
              throw e;
            }), 10));
          } finally {
            list.shift();
          }
        }
        return results;
      }
    }
  };
})();

"concat slice splice map filter".split(" ").forEach(function(name) {
  return $X.Class.prototype[name] = (function(method) {
    return function() {
      var result;
      result = new this.constructor;
      result.push.apply(result, method.apply(this, arguments));
      return result;
    };
  })($X.Class.prototype[name]);
});

$XHR = (function() {
  var XHRClass;
  XHRClass = (function() {
    function XHRClass(options) {
      var headers, login, method, password, sync, url;
      url = options.url, method = options.method, sync = options.sync, login = options.login, password = options.password, headers = options.headers, this.data = options.data;
      this.xhr = new XMLHttpRequest();
      this.xhr.open(method, url, !sync, login, password);
      this.setCallbacks(options);
      this.setHeaders(headers);
    }

    XHRClass.prototype.send = function(txt) {
      return this.xhr.send(txt != null ? txt : this.data);
    };

    XHRClass.prototype.abort = function() {
      return this.xhr.abort();
    };

    XHRClass.prototype.on = function(event, callback) {
      this.xhr.addEventListener(event, callback, false);
      return this;
    };

    XHRClass.prototype.setCallbacks = function(arg) {
      var abort, error, load, progress;
      progress = arg.progress, load = arg.load, abort = arg.abort, error = arg.error;
      if (progress != null) {
        this.on('progress', progress);
      }
      if (load != null) {
        this.on('load', load);
      }
      if (abort != null) {
        this.on('abort', abort);
      }
      if (error != null) {
        return this.on('error', error);
      }
    };

    XHRClass.prototype.setHeaders = function(headers) {
      var i, len, name, value;
      if (headers != null) {
        for (value = i = 0, len = headers.length; i < len; value = ++i) {
          name = headers[value];
          this.xhr.setHeader(name, value);
        }
      }
      return this;
    };

    XHRClass.prototype.success = function(callback) {
      return this.on('load', (function(_this) {
        return function() {
          return callback(_this.xhr.response, _this);
        };
      })(this));
    };

    XHRClass.prototype.fail = function(callback) {
      this.on('error', (function(_this) {
        return function(evt) {
          return callback(evt, _this);
        };
      })(this));
      return this.on('abort', (function(_this) {
        return function(evt) {
          return callback(evt, _this);
        };
      })(this));
    };

    XHRClass.prototype.done = function(callback) {
      this.success(function(result, self) {
        return callback(null, result, self);
      });
      return this.fail(function(evt, self) {
        return callback(evt, null, self);
      });
    };

    return XHRClass;

  })();
  return {
    Class: XHRClass,
    send: function(method, url, txt, options) {
      var e, error1, promise, request;
      if (options == null) {
        options = {};
      }
      options = Object.create(options);
      options.method = method;
      options.url = url;
      options.sync = false;
      request = new this.Class(options);
      promise = new Promise(function(done, fail) {
        request.success(done);
        return request.fail(fail);
      });
      try {
        request.send(txt);
      } catch (error1) {
        e = error1;
        fail(e);
      }
      return promise;
    },
    get: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this.send.apply(this, ['GET'].concat(slice.call(args)));
    },
    put: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this.send.apply(this, ['PUT'].concat(slice.call(args)));
    },
    post: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this.send.apply(this, ['POST'].concat(slice.call(args)));
    },
    del: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this.send.apply(this, ['DELETE'].concat(slice.call(args)));
    }
  };
})();
