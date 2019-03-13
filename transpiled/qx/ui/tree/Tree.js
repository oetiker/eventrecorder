(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.AbstractScrollArea": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.IMultiSelection": {
        "require": true
      },
      "qx.ui.form.IModelSelection": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.core.MMultiSelectionHandling": {
        "require": true
      },
      "qx.ui.core.MContentPadding": {
        "require": true
      },
      "qx.ui.form.MModelSelection": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.tree.selection.SelectionManager": {
        "require": true
      },
      "qx.ui.tree.core.AbstractTreeItem": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.tree.Tree", {
    extend: qx.ui.core.scroll.AbstractScrollArea,
    implement: [qx.ui.core.IMultiSelection, qx.ui.form.IModelSelection, qx.ui.form.IField, qx.ui.form.IForm],
    include: [qx.ui.core.MMultiSelectionHandling, qx.ui.core.MContentPadding, qx.ui.form.MModelSelection, qx.ui.form.MForm],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.ui.core.scroll.AbstractScrollArea.constructor.call(this);

      this.__content = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
        allowShrinkY: false,
        allowGrowX: true
      });

      this.getChildControl("pane").add(this.__content);

      this.initOpenMode();
      this.initRootOpenClose();

      this.addListener("changeSelection", this._onChangeSelection, this);
      this.addListener("keypress", this._onKeyPress, this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * This event is fired after a tree item was added to the tree. The
       * {@link qx.event.type.Data#getData} method of the event returns the
       * added item.
       */
      addItem: "qx.event.type.Data",

      /**
       * This event is fired after a tree item has been removed from the tree.
       * The {@link qx.event.type.Data#getData} method of the event returns the
       * removed item.
       */
      removeItem: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Control whether tap or double tap should open or close the tapped
       * folder.
       */
      openMode: {
        check: ["tap", "dbltap", "none"],
        init: "dbltap",
        apply: "_applyOpenMode",
        event: "changeOpenMode",
        themeable: true
      },

      /**
       * The root tree item of the tree to display
       */
      root: {
        check: "qx.ui.tree.core.AbstractTreeItem",
        init: null,
        nullable: true,
        event: "changeRoot",
        apply: "_applyRoot"
      },

      /**
       * Hide the root (Tree) node.  This differs from the visibility property in
       * that this property hides *only* the root node, not the node's children.
       */
      hideRoot: {
        check: "Boolean",
        init: false,
        apply: "_applyHideRoot"
      },

      /**
       * Whether the Root should have an open/close button.  This may also be
       * used in conjunction with the hideNode property to provide for virtual root
       * nodes.  In the latter case, be very sure that the virtual root nodes are
       * expanded programmatically, since there will be no open/close button for the
       * user to open them.
       */
      rootOpenClose: {
        check: "Boolean",
        init: false,
        apply: "_applyRootOpenClose"
      },

      // overridden
      appearance: {
        refine: true,
        init: "tree"
      },

      // overridden
      focusable: {
        refine: true,
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __content: null,

      /** @type {Class} Pointer to the selection manager to use */
      SELECTION_MANAGER: qx.ui.tree.selection.SelectionManager,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */

      /**
       * Get the widget, which contains the root tree item. This widget must
       * have a vertical box layout.
       *
       * @return {qx.ui.core.Widget} the children container
       */
      getChildrenContainer: function getChildrenContainer() {
        return this.__content;
      },

      // property apply
      _applyRoot: function _applyRoot(value, old) {
        var container = this.getChildrenContainer();

        if (old && !old.isDisposed()) {
          container.remove(old);
          if (old.hasChildren()) {
            container.remove(old.getChildrenContainer());
          }
        }

        if (value) {
          container.add(value);
          if (value.hasChildren()) {
            container.add(value.getChildrenContainer());
          }

          value.setVisibility(this.getHideRoot() ? "excluded" : "visible");
          value.recursiveAddToWidgetQueue();
        }
      },

      // property apply
      _applyHideRoot: function _applyHideRoot(value, old) {
        var root = this.getRoot();
        if (!root) {
          return;
        }

        root.setVisibility(value ? "excluded" : "visible");
        root.recursiveAddToWidgetQueue();
      },

      // property apply
      _applyRootOpenClose: function _applyRootOpenClose(value, old) {
        var root = this.getRoot();
        if (!root) {
          return;
        }
        root.recursiveAddToWidgetQueue();
      },

      /**
       * Returns the element, to which the content padding should be applied.
       *
       * @return {qx.ui.core.Widget} The content padding target.
       */
      _getContentPaddingTarget: function _getContentPaddingTarget() {
        return this.__content;
      },

      /*
      ---------------------------------------------------------------------------
        SELECTION MANAGER API
      ---------------------------------------------------------------------------
      */

      /**
       * Get the tree item following the given item in the tree hierarchy.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} The tree item to get the item after
       * @param invisible {Boolean?true} Whether invisible/closed tree items
       *     should be returned as well.
       *
       * @return {qx.ui.tree.core.AbstractTreeItem?null} The item after the given item. May be
       *     <code>null</code> if the item is the last item.
       */
      getNextNodeOf: function getNextNodeOf(treeItem, invisible) {
        if ((invisible !== false || treeItem.isOpen()) && treeItem.hasChildren()) {
          return treeItem.getChildren()[0];
        }

        while (treeItem) {
          var parent = treeItem.getParent();
          if (!parent) {
            return null;
          }

          var parentChildren = parent.getChildren();
          var index = parentChildren.indexOf(treeItem);
          if (index > -1 && index < parentChildren.length - 1) {
            return parentChildren[index + 1];
          }

          treeItem = parent;
        }
        return null;
      },

      /**
       * Get the tree item preceding the given item in the tree hierarchy.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} The tree item to get the item before
       * @param invisible {Boolean?true} Whether invisible/closed tree items
       *     should be returned as well.
       *
       * @return {qx.ui.tree.core.AbstractTreeItem?null} The item before the given item. May be
       *     <code>null</code> if the given item is the tree's root.
       */
      getPreviousNodeOf: function getPreviousNodeOf(treeItem, invisible) {
        var parent = treeItem.getParent();
        if (!parent) {
          return null;
        }

        if (this.getHideRoot()) {
          if (parent == this.getRoot()) {
            if (parent.getChildren()[0] == treeItem) {
              return null;
            }
          }
        } else {
          if (treeItem == this.getRoot()) {
            return null;
          }
        }

        var parentChildren = parent.getChildren();
        var index = parentChildren.indexOf(treeItem);
        if (index > 0) {
          var folder = parentChildren[index - 1];
          while ((invisible !== false || folder.isOpen()) && folder.hasChildren()) {
            var children = folder.getChildren();
            folder = children[children.length - 1];
          }
          return folder;
        } else {
          return parent;
        }
      },

      /**
       * Get the tree item's next sibling.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} The tree item to get the following
       * sibling of.
       *
       * @return {qx.ui.tree.core.AbstractTreeItem?null} The item following the given item. May be
       *     <code>null</code> if the given item is the last in it's nesting
       *     level.
       */
      getNextSiblingOf: function getNextSiblingOf(treeItem) {
        if (treeItem == this.getRoot()) {
          return null;
        }

        var parent = treeItem.getParent();
        var siblings = parent.getChildren();
        var index = siblings.indexOf(treeItem);

        if (index < siblings.length - 1) {
          return siblings[index + 1];
        }

        return null;
      },

      /**
       * Get the tree item's previous sibling.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} The tree item to get the previous
       * sibling of.
       *
       * @return {qx.ui.tree.core.AbstractTreeItem?null} The item preceding the given item. May be
       *     <code>null</code> if the given item is the first in it's nesting
       *     level.
       */
      getPreviousSiblingOf: function getPreviousSiblingOf(treeItem) {
        if (treeItem == this.getRoot()) {
          return null;
        }

        var parent = treeItem.getParent();
        var siblings = parent.getChildren();
        var index = siblings.indexOf(treeItem);

        if (index > 0) {
          return siblings[index - 1];
        }

        return null;
      },

      /**
       * Returns all children of the tree.
       *
       * @param recursive {Boolean ? false} whether children of subfolder should be
       *     included
       * @param invisible {Boolean ? true} whether invisible children should be
       *     included
       * @return {qx.ui.tree.core.AbstractTreeItem[]} list of children
       */
      getItems: function getItems(recursive, invisible) {
        if (this.getRoot() != null) {
          return this.getRoot().getItems(recursive, invisible, this.getHideRoot());
        } else {
          return [];
        }
      },

      /**
       * Returns the tree's only "external" child, namely the root node.
       *
       * @return {qx.ui.tree.core.AbstractTreeItem[]} Array containing the root node
       */
      getChildren: function getChildren() {
        if (this.getRoot() != null) {
          return [this.getRoot()];
        } else {
          return [];
        }
      },

      /*
      ---------------------------------------------------------------------------
        POINTER EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the tree item, which contains the given widget.
       *
       * @param widget {qx.ui.core.Widget} The widget to get the containing tree
       *   item for.
       * @return {qx.ui.tree.core.AbstractTreeItem|null} The tree item containing the widget. If the
       *     widget is not inside of any tree item <code>null</code> is returned.
       */
      getTreeItem: function getTreeItem(widget) {
        while (widget) {
          if (widget == this) {
            return null;
          }

          if (widget instanceof qx.ui.tree.core.AbstractTreeItem) {
            return widget;
          }

          widget = widget.getLayoutParent();
        }

        return null;
      },

      // property apply
      _applyOpenMode: function _applyOpenMode(value, old) {
        if (old == "tap") {
          this.removeListener("tap", this._onOpen, this);
        } else if (old == "dbltap") {
          this.removeListener("dbltap", this._onOpen, this);
        }

        if (value == "tap") {
          this.addListener("tap", this._onOpen, this);
        } else if (value == "dbltap") {
          this.addListener("dbltap", this._onOpen, this);
        }
      },

      /**
       * Event handler for tap events, which could change a tree item's open
       * state.
       *
       * @param e {qx.event.type.Pointer} The tap event object
       */
      _onOpen: function _onOpen(e) {
        var treeItem = this.getTreeItem(e.getTarget());
        if (!treeItem || !treeItem.isOpenable()) {
          return;
        }

        treeItem.setOpen(!treeItem.isOpen());
        e.stopPropagation();
      },

      /**
       * Event handler for changeSelection events, which opens all parent folders
       * of the selected folders.
       *
       * @param e {qx.event.type.Data} The selection data event.
       */
      _onChangeSelection: function _onChangeSelection(e) {
        var selection = e.getData();
        // for every selected folder
        for (var i = 0; i < selection.length; i++) {
          var folder = selection[i];
          // go up all parents and open them
          while (folder.getParent() != null) {
            folder = folder.getParent();
            folder.setOpen(true);
          }
        }
      },

      /**
       * Event handler for key press events. Open and close the current selected
       * item on key left and right press. Jump to parent on key left if already
       * closed.
       *
       * @param e {qx.event.type.KeySequence} key event.
       */
      _onKeyPress: function _onKeyPress(e) {
        var item = this._getLeadItem();

        if (item !== null) {
          switch (e.getKeyIdentifier()) {
            case "Left":
              if (item.isOpenable() && item.isOpen()) {
                item.setOpen(false);
              } else if (item.getParent()) {
                this.setSelection([item.getParent()]);
              }
              break;

            case "Right":
              if (item.isOpenable() && !item.isOpen()) {
                item.setOpen(true);
              }
              break;

            case "Enter":
            case "Space":
              if (item.isOpenable()) {
                item.toggleOpen();
              }
              break;
          }
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */

    destruct: function destruct() {
      this._disposeObjects("__content");
    }
  });
  qx.ui.tree.Tree.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tree.js.map?dt=1552484214936