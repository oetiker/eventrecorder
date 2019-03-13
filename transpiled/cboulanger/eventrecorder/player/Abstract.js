var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.Element": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cboulanger.eventrecorder.MHelperMethods": {
        "require": true
      },
      "qx.lang.Type": {},
      "qx.core.Id": {},
      "qx.core.Init": {},
      "qx.event.type.Data": {},
      "qx.core.Assert": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("cboulanger.eventrecorder.player.Abstract", {
    extend: qx.core.Object,
    include: [cboulanger.eventrecorder.MHelperMethods],

    statics: {
      utilityFunctions: {
        /**
         * Runs the given function in the interval until it returns true or the
         * given timeout is reached. Returns a promise that will resolve once the
         * function returns true or rejects if the timeout is reached.
         * @param fn {Function} Condition function
         * @param interval {Number} The interval in which to run the function. Defaults to 100 ms.
         * @param timeout {Number} The timeout in milliseconds. Defaults to 10 seconds
         * @param timeoutMsg {String|undefined} An optional addition to the timeout error message
         * @return {Promise}
         */
        waitForCondition: function waitForCondition(fn) {
          var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
          var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
          var timeoutMsg = arguments[3];

          return new Promise(function (resolve, reject) {
            var intervalId = setInterval(function () {
              if (fn()) {
                clearInterval(intervalId);
                resolve();
              }
            }, interval);
            setTimeout(function () {
              clearInterval(intervalId);
              reject(new Error(timeoutMsg || "Timeout waiting for condition."));
            }, timeout);
          });
        },

        /**
         * Returns a promise that will resolve (with any potential event data) if
         * the given object fires an event with the given type and will reject if
         * the timeout is reached before that happens.
         *
         * @param qxObjOrId {qx.core.Object|String} If string, assume it is the object id
         * @param type {String} Type of the event
         * @param expectedData {*|undefined} The data to expect. If undefined,
         * resolve. If a regular expression, the event data as a JSON literal will
         * be matched with that regex and the promise will resolve when it matches.
         * Otherwise, the data will be compared with the actual event data both
         * serialized to JSON.
         * @param timeout {Number|undefined} The timeout in milliseconds. Defaults to 10 seconds
         * @param timeoutMsg {String|undefined} An optional addition to the timeout error message
         * @return {Promise}
         */
        waitForEvent: function waitForEvent(qxObjOrId, type, expectedData, timeout, timeoutMsg) {
          var qxObj = qxObjOrId;
          if (qx.lang.Type.isString(qxObjOrId)) {
            qxObj = qx.core.Id.getQxObject(qxObjOrId);
            if (!qxObj) {
              throw new Error("Invalid object id " + qxObjOrId);
            }
          }
          timeout = timeout || this.getTimeout();

          return new Promise(function (resolve, reject) {
            // create a timeout
            var timeoutId = setTimeout(function () {
              qxObj.removeListener(type, changeEventHandler);
              reject(new Error(timeoutMsg || "Timeout waiting for event \"" + type + "."));
            }, timeout);

            // function to create a listener for the change event
            var changeEventHandler = function changeEventHandler(e) {
              var app = qx.core.Init.getApplication();
              var eventdata = e instanceof qx.event.type.Data ? e.getData() : undefined;
              if (expectedData !== undefined) {
                if (eventdata === undefined) {
                  app.warn("\n--- When waiting for event '" + type + "' on object " + qxObj + ", received 'undefined'");
                  qxObj.addListenerOnce(type, changeEventHandler);
                  return;
                }
                if (qx.lang.Type.isArray(expectedData) && qx.lang.Type.isArray(eventdata) && expectedData.length && expectedData[0] instanceof qx.core.Object) {
                  /** a) either match array and check for "live" qooxdoo objects in the array (this is for selections), */
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = expectedData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var _ref = _step.value;

                      var _ref2 = _slicedToArray(_ref, 2);

                      var index = _ref2[0];
                      var expectedItem = _ref2[1];

                      if (expectedItem !== eventdata[index]) {
                        app.warn("\n--- When waiting for event '" + type + "' on object " + qxObj + ", received non-matching array of qooxdoo objects!");
                        qxObj.addListenerOnce(type, changeEventHandler);
                        return;
                      }
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }
                } else {
                  // convert event data to JSON
                  try {
                    eventdata = JSON.stringify(e.getData());
                  } catch (e) {
                    throw new Error("\n--- When waiting for event '" + type + "' on object " + qxObj + ", could not stringify event data for comparison.");
                  }
                  if (qx.lang.Type.isRegExp(expectedData)) {
                    /** b) or match a regular expression, */
                    if (!eventdata.match(expectedData)) {
                      app.warn("\n--- When waiting for event '" + type + "' on object " + qxObj + ", expected data to match '" + expectedData.toString() + "', got " + eventdata + "!");
                      qxObj.addListenerOnce(type, changeEventHandler);
                      return;
                    }
                  } else {
                    /* c) or compare JSON equality */
                    try {
                      expectedData = JSON.stringify(expectedData);
                    } catch (e) {
                      throw new Error("When waiting for event '" + type + "' on object " + qxObj + ", could not stringify expected data for comparison.");
                    }
                    if (eventdata !== expectedData) {
                      app.warn("\n--- When waiting for event '" + type + "' on object " + qxObj + ", expected '" + JSON.stringify(expectedData) + "', got '" + JSON.stringify(eventdata) + "'!\"");
                      qxObj.addListenerOnce(type, changeEventHandler);
                      return;
                    }
                  }
                }
              }
              app.info("\n+++ Received correct event '" + type + "' on object " + qxObj + ".\"");
              clearTimeout(timeoutId);
              resolve(eventdata);
            };

            // add a listener
            qxObj.addListenerOnce(type, changeEventHandler);
          });
        }
      }
    },

    properties: {
      /**
       * The replay mode. Possible values:
       * "test": The script is executed ignoring the "delay" commands, errors will
       * stop execution and will be thrown.
       * "presentation": The script is executed with user delays, errors will be
       * logged to the console but will not stop execution
       */
      mode: {
        check: ["test", "presentation"],
        event: "changeMode",
        init: "presentation",
        apply: "_applyMode"
      },

      /**
       * The timeout in milliseconds
       */
      timeout: {
        check: "Number",
        init: 10000
      },

      /**
       * The interval between checks if waiting for a condition to fulfil
       */
      interval: {
        check: "Number",
        init: 100
      },

      /**
       * if true, ignore user delays and use defaultDelay
       */
      useDefaultDelay: {
        check: "Boolean",
        nullable: false,
        init: false
      },

      /**
       * The maximun delay between events (limits user-generated delay)
       */
      maxDelay: {
        check: "Number",
        init: 1000
      },

      /**
       * Whether the player can replay the generated script in the browser
       */
      canReplayInBrowser: {
        check: "Boolean",
        nullable: false,
        init: false,
        event: "changeCanReplay"
      },

      /**
       * Whether the player can export code that can be used outside this application
       */
      canExportExecutableCode: {
        check: "Boolean",
        nullable: false,
        init: false,
        event: "changeCanExportExecutableCode"
      }
    },

    events: {
      /**
       * Fired with each step of the replayed script. The event data is an array
       * containing the number of the step and the number of steps
       */
      "progress": "qx.event.type.Data"
    },

    /**
     * constructor
     */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__commands = [];
      this.__macros = [];
      this.__macro_stack = [];
      this._globalRef = "eventrecorder_player";
      window[this._globalRef] = this;
      // inject utility functions in the statics section into the global scope
      // so that they are available in eval()
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(cboulanger.eventrecorder.player.Abstract.utilityFunctions)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref3 = _step2.value;

          var _ref4 = _slicedToArray(_ref3, 2);

          var name = _ref4[0];
          var fn = _ref4[1];

          window[name] = fn;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },

    /**
     * The methods and simple properties of this class
     */
    members: {
      /**
       * A globally accessible reference to the player implementation
       */
      _globalRef: null,

      /**
       * A list of available commands
       */
      __commands: null,

      /**
       * An object mapping macro names to arrays containing the macro lines
       * @var {Object}
       */
      __macros: null,

      /**
       * An array of object containing information on the macros that are currently
       * being defined (in a nested way)
       * @var {Object[]}
       */
      __macro_stack: null,

      /**
       * The index of the macro in the macro stack that is currently defined
       * @var {Integer}
       */
      __macro_stack_index: -1,

      /**
       * Variables
       */
      __vars: null,

      /**
       * An array of promises which are to be awaited
       */
      __promises: null,

      /**
       * Stub to be overridden if needed
       * @param value
       * @param old
       * @private
       */
      _applyMode: function _applyMode(value, old) {},


      /**
       * NOT IMPLEMENTED
       * Adds the given array of commands
       * @param commands {Object[]}
       */
      _addCommands: function _addCommands(commands) {
        this.__commands = this.__commands.concat(commands).sort(function (a, b) {
          return a.name > b.name;
        });
      },


      /**
       * NOT IMPLEMENTED
       * Returns the list of availabe commands
       * @return {Object[]}
       */
      getCommands: function getCommands() {
        return this.__commands;
      },


      /**
       * Simple tokenizer which splits expressions separated by whitespace, but keeps
       * expressions in quotes (which can contain whitespace) together. Parses tokens
       * as JSON expressions, but accepts unquoted text as strings.
       * @param line {String}
       * @return {String[]}
       * @private
       */
      _tokenize: function _tokenize(line) {
        qx.core.Assert.assertString(line);
        var tokens = [];
        var token = "";
        var prevChar = "";
        var insideQuotes = false;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = line.trim().split("")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var char = _step3.value;

            switch (char) {
              case "\"":
                insideQuotes = !insideQuotes;
                token += char;
                break;
              case " ":
                // add whitespace to token if inside quotes
                if (insideQuotes) {
                  token += char;
                  break;
                }
                // when outside quotes, whitespace is end of token
                if (prevChar !== " ") {
                  // parse token as json expression or as a string if that fails
                  try {
                    token = JSON.parse(token);
                  } catch (e) {}
                  tokens.push(token);
                  token = "";
                }
                break;
              default:
                token += char;
            }
            prevChar = char;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (token.length) {
          try {
            token = JSON.parse(token);
          } catch (e) {}
          tokens.push(token);
        }
        return tokens;
      },


      /**
       * Translates a single line from the intermediate code into the target
       * language. To be overridden by subclasses if neccessary.
       *
       * @param line {String}
       * @return {String}
       */
      _translateLine: function _translateLine(line) {
        // comment
        if (line.startsWith("#")) {
          return this.addComment(line.substr(1).trim());
        }
        // parse command line

        var _tokenize2 = this._tokenize(line),
            _tokenize3 = _toArray(_tokenize2),
            command = _tokenize3[0],
            args = _tokenize3.slice(1);
        // run command generation implementation


        var method_name = "cmd_" + command.replace(/-/g, "_");
        if (typeof this[method_name] == "function") {
          var translatedLine = this[method_name].apply(this, args);
          if (translatedLine && translatedLine.startsWith("(") && this.isInAwaitBlock()) {
            this._addPromiseToAwaitStack(translatedLine);
            return null;
          }
          return translatedLine;
        }
        throw new Error("Unsupported/unrecognized command: '" + command + "'");
      },


      /**
       * Given a script, return an array of lines with all variable and macro
       * declarations registered and removed. Optionally, variables are expanded.
       *
       * @param script {String}
       * @param expandVariables {Boolean} Whether to expand the found variables. Default to true
       * @return {Array}
       * @private
       */
      _handleMeta: function _handleMeta(script) {
        var _this = this;

        var expandVariables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        this.__macros = {};
        this.__macro_stack = [];
        this.__macro_stack_index = -1;
        this.__vars = {};
        var lines = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = script.split(/\n/)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var line = _step4.value;

            line = line.trim();
            if (!line) {
              continue;
            }
            // expand variables
            var var_def = line.match(/([^=\s]+)\s*=\s*(.+)/);
            if (var_def) {
              this.__vars[var_def[1]] = var_def[2];
              continue;
            } else if (expandVariables && line.match(/\$([^\s\d\/]+)/)) {
              line = line.replace(/\$([^\s\d\/]+)/g, function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                return _this.__vars[args[1]];
              });
            }

            // register macros
            if (line.startsWith("define ")) {
              if (this.isInAwaitBlock()) {
                throw new Error("You cannot use a macro in an await block.");
              }
              this._translateLine(line);
              continue;
            }

            // await block
            if (line.startsWith("await-")) {
              this._translateLine(line);
            }

            // end await block or macro
            if (line === "end") {
              // macro
              if (!this.isInAwaitBlock()) {
                this._translateLine(line);
                continue;
              }
              // await block
              this._translateLine(line);
            }

            // add code to macro
            if (this.__macro_stack_index >= 0) {
              var name = this.__macro_stack[this.__macro_stack_index].name;

              this.__macros[name].push(line);
              continue;
            }

            lines.push(line);
          }
          // remove variable registration if they have been expanded
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        if (expandVariables) {
          this.__vars = {};
        }
        return lines;
      },


      /**
       * Returns the lines for the macro of the given name. If it doesn't exist,
       * return undefined
       * @param macro_name {String}
       * @param args {Array}
       * @return {Array|undefined}
       * @private
       */
      _getMacro: function _getMacro(macro_name, args) {
        var macro_lines = this.__macros[macro_name];
        if (macro_lines !== undefined) {
          var _loop = function _loop(i) {
            macro_lines = macro_lines.map(function (l) {
              return l.replace(new RegExp("\\$" + (i + 1), "g"), JSON.stringify(args[i]));
            });
          };

          // argument placeholders
          for (var i = 0; i < args.length; i++) {
            _loop(i);
          }
          return macro_lines;
        }
        return undefined;
      },


      /**
       * Returns an array of lines containing variable declarations
       * @return {string[]}
       * @private
       */
      _defineVariables: function _defineVariables() {
        var _this2 = this;

        return Object.getOwnPropertyNames(this.__vars).map(function (key) {
          return "const " + key + " =\"" + _this2.__vars[key] + "\";";
        });
      },


      /**
       * Translates variables in a line
       * @param line {String}
       * @private
       * @return {String}
       */
      _translateVariables: function _translateVariables(line) {
        var _this3 = this;

        if (line.match(/\$([^\s\d\/]+)/)) {
          line = line.replace(/\$([^\s\d\/]+)/g, function () {
            var var_name = arguments.length <= 1 ? undefined : arguments[1];
            var var_content = _this3.__vars[var_name];
            if (var_content === undefined) {
              throw new Error("Variable '" + var_name + "' has not been defined.");
            }
            return var_content;
          });
        }
        return line;
      },


      /**
       * Returns the code of utility functions needed for the command implementations.
       * @param script {String} Optional script code to be searched for the function name.
       * If given, omit function if not present in the script code
       * @return {string[]}
       * @private
       */
      _generateUtilityFunctionsCode: function _generateUtilityFunctionsCode(script) {
        return Object.entries(cboulanger.eventrecorder.player.Abstract.utilityFunctions).filter(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1),
              name = _ref6[0];

          return script ? script.match(new RegExp(name)) : true;
        }).map(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              name = _ref8[0],
              fn = _ref8[1];

          return fn.toString().replace(/function \(/, "function " + name + "(")
          // remove comments, see https://stackoverflow.com/questions/5989315/regex-for-match-replacing-javascript-comments-both-multiline-and-inline
          .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1").split(/\n/).map(function (line) {
            return line.trim();
          }).filter(function (line) {
            return Boolean(line);
          }).join("");
        });
      },


      /**
       * Replays a number of script lines
       * @param lines {String[]}
       * @param steps {Integer?}
       * @param step {Integer?}
       * @return {Promise<boolean>}
       * @private
       */
      _play: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(lines) {
          var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, line, _tokenize4, _tokenize5, command, args, macro_lines, code, result;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _iteratorNormalCompletion5 = true;
                  _didIteratorError5 = false;
                  _iteratorError5 = undefined;
                  _context.prev = 3;
                  _iterator5 = lines[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                    _context.next = 39;
                    break;
                  }

                  line = _step5.value;

                  if (this.getRunning()) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", false);

                case 9:
                  if (!line.startsWith("#")) {
                    _context.next = 11;
                    break;
                  }

                  return _context.abrupt("continue", 36);

                case 11:

                  // variables
                  line = this._translateVariables(line);

                  // play macros recursively
                  _tokenize4 = this._tokenize(line), _tokenize5 = _toArray(_tokenize4), command = _tokenize5[0], args = _tokenize5.slice(1);
                  macro_lines = this._getMacro(command, args);

                  if (!(macro_lines !== undefined)) {
                    _context.next = 19;
                    break;
                  }

                  if (steps) {
                    step++;
                    this.debug("\n===== Step " + step + " / " + steps + ", executing macro " + command + " =====");
                  }
                  _context.next = 18;
                  return this._play(macro_lines);

                case 18:
                  return _context.abrupt("continue", 36);

                case 19:

                  // count steps if given, wait doesn't count as a step
                  if (steps && !line.startsWith("wait") && !line.startsWith("delay")) {
                    step++;
                    // inform listeners
                    this.fireDataEvent("progress", [step, steps]);
                    this.debug("\n===== Step " + step + " / " + steps + " ====");
                  }
                  // ignore delay in test mode

                  if (!(this.getMode() === "test" && line.startsWith("delay"))) {
                    _context.next = 22;
                    break;
                  }

                  return _context.abrupt("continue", 36);

                case 22:

                  // translate
                  code = this._translateLine(line);
                  // skip empty lines

                  if (code) {
                    _context.next = 25;
                    break;
                  }

                  return _context.abrupt("continue", 36);

                case 25:
                  this.debug(line + "\n" + "-".repeat(40) + "\n" + code);
                  // execute
                  result = window.eval(code);

                  if (!(result instanceof Promise)) {
                    _context.next = 36;
                    break;
                  }

                  _context.prev = 28;
                  _context.next = 31;
                  return result;

                case 31:
                  _context.next = 36;
                  break;

                case 33:
                  _context.prev = 33;
                  _context.t0 = _context["catch"](28);
                  throw _context.t0;

                case 36:
                  _iteratorNormalCompletion5 = true;
                  _context.next = 5;
                  break;

                case 39:
                  _context.next = 45;
                  break;

                case 41:
                  _context.prev = 41;
                  _context.t1 = _context["catch"](3);
                  _didIteratorError5 = true;
                  _iteratorError5 = _context.t1;

                case 45:
                  _context.prev = 45;
                  _context.prev = 46;

                  if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                  }

                case 48:
                  _context.prev = 48;

                  if (!_didIteratorError5) {
                    _context.next = 51;
                    break;
                  }

                  throw _iteratorError5;

                case 51:
                  return _context.finish(48);

                case 52:
                  return _context.finish(45);

                case 53:
                  return _context.abrupt("return", true);

                case 54:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 41, 45, 53], [28, 33], [46,, 48, 52]]);
        }));

        function _play(_x6) {
          return _ref9.apply(this, arguments);
        }

        return _play;
      }(),


      /**
       * Replays the given script of intermediate code
       * @param script {String} The script to replay
       * @return {Promise} Promise which resolves when the script has been replayed, or
       * rejects with an error
       * @todo implement pausing
       */
      replay: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(script) {
          var lines, steps, await_block, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, line;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  this.setRunning(true);
                  lines = this._handleMeta(script);
                  steps = 0;
                  await_block = false;
                  _iteratorNormalCompletion6 = true;
                  _didIteratorError6 = false;
                  _iteratorError6 = undefined;
                  _context2.prev = 7;
                  _iterator6 = lines[Symbol.iterator]();

                case 9:
                  if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                    _context2.next = 21;
                    break;
                  }

                  line = _step6.value;

                  if (!line.startsWith("await-")) {
                    _context2.next = 14;
                    break;
                  }

                  await_block = true;
                  return _context2.abrupt("continue", 18);

                case 14:
                  if (!line.startsWith("end")) {
                    _context2.next = 17;
                    break;
                  }

                  await_block = false;
                  return _context2.abrupt("continue", 18);

                case 17:
                  if (!await_block && !line.startsWith("wait ") && !line.startsWith("#") && !line.startsWith("delay")) {
                    steps++;
                  }

                case 18:
                  _iteratorNormalCompletion6 = true;
                  _context2.next = 9;
                  break;

                case 21:
                  _context2.next = 27;
                  break;

                case 23:
                  _context2.prev = 23;
                  _context2.t0 = _context2["catch"](7);
                  _didIteratorError6 = true;
                  _iteratorError6 = _context2.t0;

                case 27:
                  _context2.prev = 27;
                  _context2.prev = 28;

                  if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                  }

                case 30:
                  _context2.prev = 30;

                  if (!_didIteratorError6) {
                    _context2.next = 33;
                    break;
                  }

                  throw _iteratorError6;

                case 33:
                  return _context2.finish(30);

                case 34:
                  return _context2.finish(27);

                case 35:
                  _context2.prev = 35;
                  _context2.next = 38;
                  return this._play(lines, steps, 0);

                case 38:
                  _context2.next = 47;
                  break;

                case 40:
                  _context2.prev = 40;
                  _context2.t1 = _context2["catch"](35);
                  _context2.t2 = this.getMode();
                  _context2.next = _context2.t2 === "test" ? 45 : _context2.t2 === "presentation" ? 46 : 47;
                  break;

                case 45:
                  throw _context2.t1;

                case 46:
                  this.warn(_context2.t1);

                case 47:
                  this.setRunning(false);
                  this.cmd_hide_info();

                case 49:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[7, 23, 27, 35], [28,, 30, 34], [35, 40]]);
        }));

        function replay(_x7) {
          return _ref10.apply(this, arguments);
        }

        return replay;
      }(),


      /**
       * Translates the intermediate code into the target language
       * @param script
       * @return {string} executable code
       */
      translate: function translate(script) {
        return this._translate(script);
      },


      /**
       * Implementation for #translate()
       * @param script
       * @return {string}
       * @private
       */
      _translate: function _translate(script) {
        var _this4 = this;

        var lines = this._handleMeta(script);
        var translatedLines = this._defineVariables();
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = lines[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var line = _step7.value;

            line = line.trim();

            var _tokenize6 = this._tokenize(line),
                _tokenize7 = _toArray(_tokenize6),
                command = _tokenize7[0],
                args = _tokenize7.slice(1);

            var macro_lines = this._getMacro(command, args);
            var new_lines = (macro_lines || [line]).map(function (l) {
              return _this4._translateLine(l);
            }).filter(function (l) {
              return Boolean(l);
            });
            translatedLines = translatedLines.concat(new_lines);
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        var translation = translatedLines.join("\n");
        return this._generateUtilityFunctionsCode(translation).concat(translatedLines).join("\n");
      },


      /**
       * Given an async piece of code which checks for a condition or an application state,
       * return code that checks for this condition, throwing an error if the
       * condition hasn't been fulfilled within the set timeout.
       * @param condition {String} The condition expression as a string
       * @param timeoutmsg {String|undefined} An optional message to be shown if the condition hasn't been met before the timeout.
       */
      generateWaitForConditionCode: function generateWaitForConditionCode(condition, timeoutmsg) {
        qx.core.Assert.assertString(condition);
        timeoutmsg = timeoutmsg || "Timeout waiting for condition '" + condition + "' to fulfil.\"";
        return "(waitForCondition(() => " + condition + ", " + this.getInterval() + ", " + this.getTimeout() + ", \"" + timeoutmsg + "\"))";
      },


      /**
       * Generates code that returns a promise which will resolve (with any potential event data) if the given object fires
       * an event with the given type and data (if applicable) and will reject if the timeout is reached before that happens.
       * @param id {String} The id of the object to monitor
       * @param type {String} The type of the event to wait for
       * @param data {*|undefined} The data to expect. Must be serializable to JSON. Exception: if the data is a string that
       * starts with "{verbatim}", the unquoted string is used
       * @param timeoutmsg {String|undefined} An optional message to be shown if the event hasn't been fired before the timeout.
       * @return {String}
       */
      generateWaitForEventCode: function generateWaitForEventCode(id, type, data, timeoutmsg) {
        qx.core.Assert.assertString(id);
        qx.core.Assert.assertString(type);
        if (qx.lang.Type.isString(data) && data.startsWith("{verbatim}")) {
          data = data.substr(10);
        } else {
          data = JSON.stringify(data);
        }
        if (!timeoutmsg) {
          timeoutmsg = "Timeout waiting for event '" + type + "' on '" + id + "'";
        }

        return "(waitForEvent(\"" + id + "\", \"" + type + "\"," + data + ", " + this.getTimeout() + ", \"" + timeoutmsg + "\"))";
      },


      /**
       * Generates code that returns a promise which will resolve (with any
       * potential event data) if the given object fires an event with the given
       * type and data (if applicable). After the timeout, it will execute the
       * given code and restart the timeout.
       *
       * @param id {String} The id of the object to monitor
       * @param type {String} The type of the event to wait for
       * @param data {*|null} The data to expect. Must be serializable to JSON. In case
       * of events that do not have data, you MUST explicitly pass 'undefined' as
       * argument if you use the following arguments
       * @param code {String} The code to execute after the timeout
       * @return {String}
       */
      generateWaitForEventTimoutFunction: function generateWaitForEventTimoutFunction(id, type, data, code) {
        qx.core.Assert.assertString(id);
        qx.core.Assert.assertString(type);
        return ("(new Promise(async (resolve, reject) => { \n        while (true){\n          try {\n            await waitForEvent(qx.core.Id.getQxObject(\"" + id + "\"), \"" + type + "\", " + (data === undefined ? "undefined" : JSON.stringify(data)) + ", " + this.getTimeout() + ");\n            return resolve(); \n          } catch (e) {\n            console.debug(e.message);\n            " + code + ";\n          }\n        }\n      }))").split(/\n/).map(function (l) {
          return l.trim();
        }).join("");
      },


      /**
       * Adds a line comment to the target script
       * @param comment {String}
       * @return {string}
       */
      addComment: function addComment(comment) {
        return "// " + comment;
      },


      /**
       * Escapes all characters in a string that are special characters in a regular expression
       * @param s {String} The string to escape
       * @return {String}
       */
      escapeRegexpChars: function escapeRegexpChars(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      },


      /**
       * Creates a regular expression that matches a json string. In this string, you can use a regular expression
       * enclosed by "<!" and "!>" to replace data that cannot be known in advance, such as tokens or session ids.
       * Example: '{token:"<![A-Za-z0-9]{32}!>",user:"admin">' will match '{"token":"OnBHqQd59VHZYcphVADPhX74q0Sc6ERR","user":"admin"}'
       * @param s {string}
       */
      createRegexpForJsonComparison: function createRegexpForJsonComparison(s) {
        var _this5 = this;

        var searchExp = /<![^<][^!]+!>/g;
        var foundRegExps = s.match(searchExp);
        if (foundRegExps && foundRegExps.length) {
          var _ret2 = function () {
            var index = 0;
            // remove escape sequence
            foundRegExps = foundRegExps.map(function (m) {
              return m.slice(2, -2);
            });
            // replace placeholders
            return {
              v: _this5.escapeRegexpChars(s).replace(searchExp, function () {
                return foundRegExps[index++];
              })
            };
          }();

          if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
        }
        return this.escapeRegexpChars(s);
      },


      /**
       * Adds promise code to a list of promises that need to resolve before the
       * script proceeds
       * @param promiseCode
       */
      _addPromiseToAwaitStack: function _addPromiseToAwaitStack(promiseCode) {
        if (!qx.lang.Type.isArray(this.__promises)) {
          throw new Error("Cannot add promise since no await block has been opened.");
        }
        this.__promises.push(promiseCode);
      },


      /**
       * Returns the file extension of the downloaded file in the target language
       * @return {string}
       */
      getExportFileExtension: function getExportFileExtension() {
        throw new Error("Method getExportFileExtension must be impemented in subclass");
      },


      /**
       * Whether the player is in an await block
       * @return {Boolean}
       */
      isInAwaitBlock: function isInAwaitBlock() {
        return qx.lang.Type.isArray(this.__promises);
      },


      /*
      ============================================================================
         COMMANDS
      ============================================================================
      */

      /**
       * Asserts that the current url matches the given value (RegExp)
       * @param uri {String}
       */
      cmd_assert_uri: function cmd_assert_uri(uri) {
        return "qx.core.Assert.assertEquals(window.location.href, \"" + uri + "\", \"Script is valid on '" + uri + "' only'\")";
      },


      /**
       * Asserts that the current url matches the given value (RegExp)
       * @param uri_regexp {String} A string containing a regular expression
       */
      cmd_assert_match_uri: function cmd_assert_match_uri(uri_regexp) {
        if (this.getMode() === "presentation") {
          return "if(!window.location.href.match(new RegExp(\"" + uri_regexp + "\"))){alert(\"The eventrecorder script is meant to be played on a website that matches '" + uri_regexp + "'.\");window[\"" + this._globalRef + "\"].stop();}";
        }
        return "qx.core.Assert.assertMatch(window.location.href, \"" + uri_regexp + "\", \"Current URL does not match '" + uri_regexp + "'\")";
      },


      /**
       * Sets the player mode
       * @param mode
       * @return {string}
       */
      cmd_config_set_mode: function cmd_config_set_mode(mode) {
        return "window[\"" + this._globalRef + "\"].setMode(\"" + mode + "\");";
      },


      /**
       * Starts the definition of a macro
       * @param macro_name
       * @return {null}
       */
      cmd_define: function cmd_define(macro_name) {
        if (this.__macros[macro_name] !== undefined) {
          throw new Error("Cannot define macro '" + macro_name + "' since a macro of that name already exists.");
        }
        var index = ++this.__macro_stack_index;
        this.__macro_stack[index] = { name: macro_name };
        this.__macros[macro_name] = [];
        return null;
      },


      /**
       * Ends the definition of a macro or a block of awaitable statements
       * @return {null}
       */
      cmd_end: function cmd_end() {
        if (this.__promises) {
          var line = this.__promises.length ? "(Promise.all([" + this.__promises.join(",") + "]))" : null;
          this.__promises = null;
          return line;
        }
        if (this.__macro_stack_index < 0) {
          throw new Error("Unexpected 'end'.");
        }
        this.__macro_stack_index--;
        return null;
      },


      /**
       * Starts a block of statements that return promises. The player will wait for
       * all of the promises to resolve before proceeding.
       */
      cmd_await_all: function cmd_await_all() {
        this.__promises = [];
        return null;
      }
    }
  });
  cboulanger.eventrecorder.player.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1552484219972