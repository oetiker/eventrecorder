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
      "cboulanger.eventrecorder.MState": {
        "require": true
      },
      "qx.core.Id": {
        "construct": true
      },
      "qx.lang.Type": {},
      "qx.core.Assert": {},
      "qx.ui.form.DateField": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.form.VirtualComboBox": {},
      "qx.ui.tree.core.FolderOpenButton": {},
      "qx.ui.core.FocusHandler": {},
      "qx.data.Array": {},
      "qx.ui.tree.VirtualTree": {},
      "qx.ui.treevirtual.TreeVirtual": {},
      "qx.ui.virtual.selection.Row": {},
      "qx.ui.table.selection.Model": {},
      "qx.lang.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("cboulanger.eventrecorder.Recorder", {
    extend: qx.core.Object,
    include: [cboulanger.eventrecorder.MHelperMethods, cboulanger.eventrecorder.MState],

    /**
     * Constructor
     */
    construct: function construct() {
      var _this = this;

      qx.core.Object.constructor.call(this);

      this.__excludeIds = [];
      this.__lines = [];

      this.addGlobalEventListener(function (target, event) {
        if (!_this.isRunning()) {
          return;
        }
        var id = void 0;
        if (typeof target.getAttribute == "function") {
          id = target.getAttribute("data-qx-object-id");
        } else if (target instanceof qx.core.Object) {
          id = qx.core.Id.getAbsoluteIdOf(target, true);
        } else {
          return;
        }
        if (id) {
          _this.recordEvent(id, event, target);
        }
      });
    },

    properties: {
      mode: {
        check: ["overwrite", "append"],
        nullable: false,
        init: "overwrite"
      }
    },

    /**
     * The methods and simple properties of this class
     */
    members: {
      __lines: null,
      __excludeIds: null,
      __lastEventTimestamp: null,
      __latInput: null,

      /**
       * Exclude the given id(s) from recording
       * @param ids {Array|String}
       */
      excludeIds: function excludeIds(ids) {
        // normalize to array
        ids = qx.lang.Type.isArray(ids) ? ids : [ids];
        // add ids that are not yet included by path
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var id = _step.value;

            var found = false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.__excludeIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var excluded = _step2.value;

                if (id.substr(0, excluded.length) === excluded) {
                  found = true;
                }
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

            if (!found) {
              this.debug("Excluding " + id + " from event recording.");
              this.__excludeIds.push(id);
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
      },


      /**
       * Returns the list of excluded ids.
       * @return {String[]}
       */
      getExcludedIds: function getExcludedIds() {
        return this.__excludeIds;
      },


      /**
       * Returns the recorded script
       * @return {String}
       */
      getScript: function getScript() {
        return this.__lines.join("\n");
      },


      /**
       * Sets the script to which the recorder should append new events
       * @param script {String}
       */
      setScript: function setScript(script) {
        if (script) {
          qx.core.Assert.assertString(script);
          this.__lines = script.split(/\n/);
        } else {
          this.__lines = [];
        }
      },


      /**
       * Called by start()
       */
      beforeStart: function beforeStart() {
        switch (this.getMode()) {
          case "overwrite":
            this.__lines = ["config-set-mode presentation", "assert-match-uri " + (document.location.host + document.location.pathname), ""];
            break;
          case "append":
            this.__lines = this.__lines.concat(["", "# appended at " + new Date().toLocaleString(), ""]);
            break;
        }
        this.__lastEventTimestamp = 0;
      },


      /**
       * Called by the global event listener
       * @param id {String}
       * @param event {qx.event.type.Event}
       * @param target {qx.bom.Element}
       * @private
       * @return {boolean} returns true if the event was recorded, false if
       * it was ignored because of the list of excluded ids.
       */
      recordEvent: function recordEvent(id, event, target) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.__excludeIds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var excluded = _step3.value;

            if (id.substr(0, excluded.length) === excluded) {
              return false;
            }
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

        this.__lines = this.__lines.concat(this.createIntermediateCodeFromEvent(id, event, target));
        return true;
      },


      /**
       * Executed after stop()
       */
      afterStop: function afterStop() {
        this.__lastEventTimestamp = 0;
      },


      /**
       * Given an object id, the event name and the even target, return one or more
       * pieces of intermediate code from which a player can replay the user action
       * that lead to this event. Return an array, each element is one line of code
       * @param {String} id The id of the qooxdoo object
       * @param {qx.event.Event} event The event that was fired
       * @param {qx.bom.Element|qx.core.Object} target The event target
       * @return {String[]} An array of script lines
       */
      createIntermediateCodeFromEvent: function createIntermediateCodeFromEvent(id, event, target) {
        // opt out of recording
        if (typeof target.getTrackEvents == "function" && !target.getTrackEvents()) {
          return [];
        }
        var lines = [];
        var type = event.getType();
        var data = typeof event.getData == "function" ? event.getData() : null;
        var owner = typeof target.getQxOwner == "function" ? target.getQxOwner() : null;
        switch (type) {
          case "execute":
            switch (true) {
              case owner instanceof qx.ui.form.DateField:
              case owner instanceof qx.ui.form.ComboBox:
              case owner instanceof qx.ui.form.VirtualComboBox:
              case target instanceof qx.ui.tree.core.FolderOpenButton:
                return [];
            }
            lines.push("execute " + id);
            break;
          case "appear":
          case "disappear":
            if (qx.ui.core.FocusHandler.getInstance().isFocusRoot(qx.core.Id.getQxObject(id))) {
              return ["assert-" + type + "ed " + id];
            }
            return [];

          case "input":
            this.__lastInput = data;
            return [];

          case "change":
            {
              // model selection
              var isModelSelection = target instanceof qx.data.Array && target.getQxOwner() && typeof target.getQxOwner().getModel == "function";
              if (isModelSelection) {
                var _ret = function () {
                  var owner = target.getQxOwner();
                  var ownerId = qx.core.Id.getAbsoluteIdOf(owner);
                  var model = owner.getModel();
                  var indexes = target.toArray().map(function (item) {
                    return model.indexOf(item);
                  });
                  lines.push("set-model-selection " + ownerId + " " + JSON.stringify(indexes));
                  return "break";
                }();

                if (_ret === "break") break;
              }
              // form fields
              if (qx.lang.Type.isString(data) && data === this.__lastInput) {
                lines.push("set-value " + id + " \"" + data + "\"");
              }
              break;
            }

          case "open":
          case "close":
            {
              if (target instanceof qx.ui.tree.VirtualTree) {
                var row = target.getLookupTable().indexOf(data);
                if (row < 0) {
                  return [];
                }
                lines.push(type + "-tree-node " + id + " " + row);
              }
              break;
            }
          // qx.ui.treevirtual.TreeVirtual
          case "treeClose":
          case "treeOpenWithContent":
          case "treeOpenWhileEmpty":
            lines.push((type === "treeClose" ? "close-tree-node-treevirtual" : "open-tree-node-treevirtual") + " " + id + " " + data.nodeId);
            break;

          case "changeSelection":
            {
              if (target instanceof qx.ui.treevirtual.TreeVirtual) {
                var selection = event.getData();
                if (!selection.length) {
                  return [];
                }
                var _row = target.getDataModel().getRowFromNodeId(selection[0].nodeId);
                lines.push("set-table-selection " + id + " " + _row + "," + _row);
              }
              if (target instanceof qx.ui.virtual.selection.Row) {
                lines.push("set-row-selection " + id + " " + data);
                break;
              }
              if (target instanceof qx.ui.table.selection.Model) {
                lines.push("reset-selection " + id);
                var ranges = target.getSelectedRanges();
                if (ranges.length) {
                  lines.push("set-table-selection " + id + " " + ranges[0].minIndex + "," + ranges[0].maxIndex);
                }
                break;
              }
              if (data && data.length && qx.lang.Type.isArray(data)) {
                var selected = data[0];
                if (selected instanceof qx.core.Object && selected.getQxObjectId()) {
                  var selectedId = qx.core.Id.getAbsoluteIdOf(selected);
                  lines.push("set-selection " + id + " " + selectedId);
                } else if (typeof target.getSelectables == "function") {
                  var index = target.getSelectables().indexOf(selected);
                  lines.push("set-selection-from-selectables " + id + " " + index);
                }
                break;
              }
              return [];
            }
          default:
            // record change events if explicitly requested
            if (type.startsWith("change") && typeof target.getTrackPropertyChanges == "function") {
              if (target.getTrackPropertyChanges()) {
                var property = qx.lang.String.firstLow(type.substr(6));
                lines.push("await-match-json " + id + " " + property + " " + JSON.stringify(data));
                break;
              }
            }
            // ignore all others
            return [];
        }
        // prepend a wait command to replay delays in user action
        var now = Date.now();
        var msSinceLastEvent = now - (this.__lastEventTimestamp || now);
        this.__lastEventTimestamp = now;
        if (msSinceLastEvent) {
          lines.unshift("delay " + msSinceLastEvent);
        }
        return lines;
      }
    }
  });
  cboulanger.eventrecorder.Recorder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Recorder.js.map?dt=1552484218473