(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cboulanger.eventrecorder.MHelperMethods": {
        "require": true
      },
      "qx.event.Timer": {},
      "qx.core.Init": {},
      "qx.core.Id": {},
      "qx.ui.popup.Popup": {},
      "qx.bom.Lifecycle": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("cboulanger.eventrecorder.ObjectIdGenerator", {
    type: "singleton",
    extend: qx.core.Object,
    include: [cboulanger.eventrecorder.MHelperMethods],
    events: {
      "done": "qx.event.type.Event"
    },
    members: {

      /**
       * Start automatically assigning ids.
       */
      init: function init() {
        var _this = this;

        // start generating ids with a delay because rendering widgets is asynchrous
        qx.event.Timer.once(function () {
          _this.assignObjectIdsToChildren(qx.core.Init.getApplication().getRoot());
          _this.fireEvent("done");
        }, null, 2000);
        this.addGlobalEventListener(function (target, event) {
          if (event.getType() === "appear") {
            _this.assignObjectIdsToChildren(qx.core.Init.getApplication().getRoot());
          }
        });
      },

      /**
       * Given a {@link qx.core.Object}, return an id for it, which is the last
       * part of the class name
       * @param qxObj {qx.core.Object}
       * @return {String}
       */
      generateId: function generateId(qxObj) {
        var clazz = qxObj.classname;
        return clazz.substr(clazz.lastIndexOf(".") + 1);
      },

      /**
       * Given an object and its parent, set its object id and add it to the
       * parent's owned objects. If the object doesn't have a parent or the
       * parent has no object id, register the object as a global id root.
       * @param obj The object to assign an object id to
       * @param owner The owning parent object
       * @param id {String|undefined} Optional id. If not given, generate an id from
       * the class name
       */
      generateQxObjectId: function generateQxObjectId(obj, owner, id) {
        if (!obj || typeof obj.getQxObjectId != "function" || obj.getQxObjectId()) {
          return;
        }
        id = id || this.generateId(obj);
        obj.setQxObjectId(id);
        if (owner && owner.getQxObjectId()) {
          // if the parent has an id, we add the child as an owned object
          var siblingWithSameName = false;
          var postfix = 1;
          do {
            try {
              owner.addOwnedQxObject(obj);
              siblingWithSameName = false;
              // console.log(`Adding ${obj} to ${parent} with id '${id}'`);
            } catch (e) {
              // name already exists, append a number
              siblingWithSameName = true;
              postfix++;
              obj.setQxObjectId(id + postfix);
            }
          } while (siblingWithSameName);
        } else {
          // otherwise, we register it as a top-level object
          //console.log(`Registering ${obj} as global id root with id '${id}'`);
          qx.core.Id.getInstance().register(obj, id);
        }
      },

      /**
       * Recursively assigns object ids to the children of the given parent widget.
       * @param parent {qx.ui.core.Widget|qx.ui.core.MChildrenHandling} An object that must include
       * the qx.ui.core.MChildrenHandling mixin.
       * @param level {Number}
       */
      assignObjectIdsToChildren: function assignObjectIdsToChildren(parent) {
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!parent) {
          return;
        }
        var children = typeof parent.getChildren == "function" ? parent.getChildren() : typeof parent.getLayoutChildren == "function" ? parent.getLayoutChildren() : null;
        // let msg = "    ".repeat(level) + parent.classname;
        // if ( !children || ! children.length) {
        //   console.log(msg + " (no children)");
        //   return;
        // }
        // console.log(msg);
        if (!children || !children.length) {
          return;
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            // ignore popups
            if (child instanceof qx.ui.popup.Popup) {
              continue;
            }
            // assign object id and add to parent if neccessary
            this.generateQxObjectId(child, parent);
            // recurse into children
            var realChild = child;
            var id = void 0;
            switch (child.classname) {
              case "qx.ui.form.ComboBox":
                realChild = child.getChildControl("textfield");
                break;
              case "qx.ui.form.VirtualSelectBox":
                realChild = child.getSelection();
                break;
              case "qx.ui.groupbox.GroupBox":
                realChild = child.getChildControl("frame");
                break;
              case "qx.ui.form.MenuButton":
              case "qx.ui.toolbar.MenuButton":
              case "qx.ui.menubar.Button":
                realChild = child.getMenu();
                break;
              case "qx.ui.treevirtual.TreeVirtual":
                child.addListener("treeClose", function () {});
                child.addListener("treeOpenWithContent", function () {});
                child.addListener("treeOpenWhileEmpty", function () {});
              // fallthrough
              case "qx.ui.table.Table":
                realChild = child.getSelectionModel();
                id = "Selection";
                break;
              case "qx.ui.list.List":
                realChild = child.getSelection();
                id = "Selection";
                break;
              case "qx.ui.tabview.Page":
                this.generateQxObjectId(child.getChildControl("button"), child);
                break;
              case "qx.ui.tree.VirtualTree":
                child.addListener("open", function () {});
                child.addListener("close", function () {});
                this.generateQxObjectId(child._manager, child);
                continue;
            }
            if (realChild !== child) {
              this.generateQxObjectId(realChild, child, id);
            }
            this.assignObjectIdsToChildren(realChild, level + 1);
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
      }
    },

    /**
    * Will be called after class has been loaded, before application startup
    */
    defer: function defer() {
      {
        qx.bom.Lifecycle.onReady(function () {
          return cboulanger.eventrecorder.ObjectIdGenerator.getInstance().init();
        });
      }
    }
  });
  cboulanger.eventrecorder.ObjectIdGenerator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ObjectIdGenerator.js.map?dt=1552484193020