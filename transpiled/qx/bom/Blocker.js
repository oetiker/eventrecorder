(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.bom.Element": {
        "require": true
      },
      "qx.bom.Iframe": {
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
      "qx.event.Registration": {},
      "qx.bom.element.Style": {},
      "qx.bom.element.Opacity": {},
      "qx.bom.client.Engine": {},
      "qx.dom.Element": {},
      "qx.bom.element.Attribute": {},
      "qx.bom.Document": {},
      "qx.bom.element.Dimension": {},
      "qx.bom.element.Location": {},
      "qx.event.Timer": {},
      "qx.dom.Node": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.bom.Blocker", {
    extend: qx.core.Object,

    construct: function construct() {
      qx.core.Object.constructor.call(this);

      this.__init();
    },

    members: {
      __iframeElement: null,
      __blockerElement: null,
      __blockedElement: null,
      __isActive: false,
      __defaultZIndex: 10000,
      __defaultBlockerOpacity: 0,
      __defaultBlockerColor: "transparent",

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Blocks the whole document (if no parameter is given) or acts as an
       * underlying blocker for native controls.
       *
       * @param element {element?null} If no element is given the whole document is blocked.
       */
      block: function block(element) {
        if (!this.__isActive) {
          qx.event.Registration.addListener(window, "resize", this.__onResize, this);

          this.__blockedElement = element;

          var styles = this.__calculateStyles();
          this.__styleAndInsertBlocker(styles);
          this.__isActive = true;
        }
      },

      /**
       * Releases the blocking
       */
      unblock: function unblock() {
        if (this.__isActive) {
          this.__removeBlocker();
          qx.event.Registration.removeListener(window, "resize", this.__onResize, this);
          this.__isActive = false;
        }
      },

      /**
       * Whether the blocker is already active.
       *
       * @return {Boolean} Blocker active
       */
      isBlocked: function isBlocked() {
        return this.__isActive;
      },

      /**
       * Returns the blocker element. Useful if the element should be animated.
       *
       * @return {Element} DOM element
       */
      getBlockerElement: function getBlockerElement() {
        return this.__blockerElement;
      },

      /**
       * Sets the color of the blocker element. Be sure to set also a suitable
       * opacity value to get the desired result.
       *
       * @param color {String} CSS color value
       * @see #setBlockerOpacity
       */
      setBlockerColor: function setBlockerColor(color) {
        qx.bom.element.Style.set(this.__blockerElement, "backgroundColor", color);
      },

      /**
       * Returns the current blocker color.
       *
       * @return {String} CSS color value
       */
      getBlockerColor: function getBlockerColor() {
        return qx.bom.element.Style.get(this.__blockerElement, "backgroundColor");
      },

      /**
       * Sets the blocker opacity. Be sure to set also a suitable blocker color
       * value to get the desired result.
       *
       * @param opacity {String} CSS opacity value
       * @see #setBlockerColor
       */
      setBlockerOpacity: function setBlockerOpacity(opacity) {
        qx.bom.element.Opacity.set(this.__blockerElement, opacity);
      },

      /**
       * Returns the blocker opacity value.
       *
       * @return {Integer} CSS opacity value
       */
      getBlockerOpacity: function getBlockerOpacity() {
        return qx.bom.element.Opacity.get(this.__blockerElement);
      },

      /**
       * Set the zIndex of the blocker element. For most use cases you do not need
       * to manipulate this value.
       *
       * @param zIndex {Integer} CSS zIndex value
       */
      setBlockerZIndex: function setBlockerZIndex(zIndex) {
        qx.bom.element.Style.set(this.__blockerElement, "zIndex", zIndex);
      },

      /**
       * Returns the blocker zIndex value
       *
       * @return {Integer} CSS zIndex value
       */
      getBlockerZIndex: function getBlockerZIndex() {
        return qx.bom.element.Style.get(this.__blockerElement, "zIndex");
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE API
      ---------------------------------------------------------------------------
      */

      /**
       * Setups the elements and registers a "resize" event.
       */
      __init: function __init() {
        this.__setupBlockerElement();

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          this.__setupIframeElement();
        }
      },

      /**
       * Create blocker element and set initial styles.
       */
      __setupBlockerElement: function __setupBlockerElement() {
        this.__blockerElement = qx.dom.Element.create("div");
        qx.bom.element.Style.setStyles(this.__blockerElement, {
          display: "block",
          opacity: this.__defaultBlockerOpacity,
          backgroundColor: this.__defaultBlockerColor
        });
        this.setBlockerZIndex(this.__defaultZIndex);
      },

      /**
       * Create iframe blocker element and set initial styles.
       *
       * Needed to block native form elements
       * // see: http://www.macridesweb.com/oltest/IframeShim.html
       */
      __setupIframeElement: function __setupIframeElement() {
        this.__iframeElement = qx.bom.Iframe.create();

        qx.bom.element.Attribute.set(this.__iframeElement, "allowTransparency", false);
        qx.bom.element.Attribute.set(this.__iframeElement, "src", "javascript:false;");
        qx.bom.element.Style.setStyles(this.__iframeElement, {
          display: "block",
          opacity: this.__defaultBlockerOpacity
        });
      },

      /**
       * Calculates the necessary styles for the blocker element.
       * Either the values of the document or of the element to block are used.
       *
       * @return {Map} Object with necessary style infos
       */
      __calculateStyles: function __calculateStyles() {
        var styles = { position: "absolute" };

        if (this.__isWholeDocumentBlockTarget()) {
          styles.left = "0px";
          styles.top = "0px";
          styles.right = null;
          styles.bottom = null;
          styles.width = qx.bom.Document.getWidth() + "px";
          styles.height = qx.bom.Document.getHeight() + "px";
        } else {
          styles.width = qx.bom.element.Dimension.getWidth(this.__blockedElement) + "px";
          styles.height = qx.bom.element.Dimension.getHeight(this.__blockedElement) + "px";
          styles.left = qx.bom.element.Location.getLeft(this.__blockedElement) + "px";
          styles.top = qx.bom.element.Location.getTop(this.__blockedElement) + "px";
        }

        return styles;
      },

      /**
       * Apply the given styles and inserts the blocker.
       *
       * @param styles {Object} styles to apply
       */
      __styleAndInsertBlocker: function __styleAndInsertBlocker(styles) {
        var target = document.body;

        qx.bom.element.Style.setStyles(this.__blockerElement, styles);
        qx.dom.Element.insertEnd(this.__blockerElement, target);

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          styles.zIndex = this.getBlockerZIndex() - 1;

          qx.bom.element.Style.setStyles(this.__iframeElement, styles);
          qx.dom.Element.insertEnd(this.__iframeElement, document.body);
        }
      },

      /**
       * Remove the blocker elements.
       */
      __removeBlocker: function __removeBlocker() {
        qx.dom.Element.remove(this.__blockerElement);

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          qx.dom.Element.remove(this.__iframeElement);
        }
      },

      /**
       * Reacts on window resize and adapts the new size for the blocker element
       * if the whole document is blocked.
       *
       * @param e {qx.event.type.Event} event instance
       */
      __onResize: function __onResize(e) {
        if (this.__isWholeDocumentBlockTarget()) {
          // reset the blocker to get the right calculated document dimension
          this.__resizeBlocker({ width: "0px", height: "0px" });

          // If the HTML document is very large, the getWidth() and getHeight()
          // returns the old size (it seems that the rendering engine is to slow).
          qx.event.Timer.once(function () {
            var dimension = { width: qx.bom.Document.getWidth() + "px",
              height: qx.bom.Document.getHeight() + "px" };
            this.__resizeBlocker(dimension);
          }, this, 0);
        }
      },

      /**
       * Does the resizing for blocker element and blocker iframe element (IE)
       *
       * @param dimension {Object} Map with width and height as keys
       */
      __resizeBlocker: function __resizeBlocker(dimension) {
        qx.bom.element.Style.setStyles(this.__blockerElement, dimension);

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          qx.bom.element.Style.setStyles(this.__iframeElement, dimension);
        }
      },

      /**
       * Checks whether the whole document is be blocked.
       *
       * @return {Boolean} block mode
       */
      __isWholeDocumentBlockTarget: function __isWholeDocumentBlockTarget() {
        return this.__blockedElement == null || qx.dom.Node.isWindow(this.__blockedElement) || qx.dom.Node.isDocument(this.__blockedElement);
      }
    }
  });
  qx.bom.Blocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Blocker.js.map?dt=1552484195215