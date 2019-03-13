(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.popup.Popup": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.ui.basic.Atom": {
        "construct": true
      },
      "qx.bom.Document": {},
      "qx.event.Timer": {},
      "qx.bom.element.Animation": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("cboulanger.eventrecorder.InfoPane", {
    type: "singleton",
    extend: qx.ui.popup.Popup,
    statics: {
      icon: {
        "waiting": "cboulanger/eventrecorder/ajax-loader.gif",
        "info": "icon/32/status/dialog-information.png"
      }
    },
    construct: function construct() {
      qx.ui.popup.Popup.constructor.call(this, new qx.ui.layout.Canvas());
      this.set({
        decorator: "window",
        minWidth: 100,
        minHeight: 30,
        padding: 10,
        backgroundColor: "#f0f0f0",
        autoHide: false
      });
      this.__atom = new qx.ui.basic.Atom();
      this.__atom.getChildControl("label").set({
        rich: true,
        wrap: true
      });
      this.add(this.__atom);
      this.addListenerOnce("appear", this.center, this);
    },
    members: {

      __atom: null,

      /**
       * Center the widget
       * @return {cboulanger.eventrecorder.InfoPane}
       */
      center: function center() {
        if (!this.isVisible()) {
          this.addListenerOnce("appear", this.center, this);
          return this;
        }
        var bounds = this.getBounds();
        this.set({
          marginTop: Math.round((qx.bom.Document.getHeight() - bounds.height) / 2),
          marginLeft: Math.round((qx.bom.Document.getWidth() - bounds.width) / 2)
        });
        return this;
      },


      /**
       * Displays the given text. Can optionally be placed next to a widget
       * @param text {String|false} The text to display. If false, hide the widget
       * @param widgetToPlaceTo {qx.ui.core.Widget|undefined} If given, place the
       * info panel next to this widget
       * @return {cboulanger.eventrecorder.InfoPane}
       */
      display: function display(text) {
        var _this = this;

        var widgetToPlaceTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!text) {
          this.hide();
        }
        this.__atom.setLabel(text);
        this.show();
        if (widgetToPlaceTo) {
          this.set({
            marginTop: 0,
            marginLeft: 0
          });
          if (widgetToPlaceTo.isVisible()) {
            this.placeToWidget(widgetToPlaceTo, true);
          } else {
            widgetToPlaceTo.addListenerOnce("appear", function () {
              _this.placeToWidget(widgetToPlaceTo, true);
            });
          }
        } else {
          qx.event.Timer.once(this.center, this, 100);
        }
        return this;
      },


      /**
       * Return the content of the text label
       * @return {String}
       */
      getDisplayedText: function getDisplayedText() {
        return this.__atom.getLabel();
      },


      /**
       * When displaying the info, show the icon associated with the given alias
       * @param alias
       * @return {cboulanger.eventrecorder.InfoPane}
       */
      useIcon: function useIcon(alias) {
        var iconpath = cboulanger.eventrecorder.InfoPane.icon[alias];
        if (!iconpath) {
          throw new Error("Icon alias \"" + alias + "\" is invalid.");
        }
        this.__atom.setIcon(iconpath);
        return this;
      },


      /**
       * Animate the info pane to draw attention from the user
       * @return {cboulanger.eventrecorder.InfoPane}
       */
      animate: function animate() {
        if (!this.isVisible()) {
          this.addListenerOnce("appear", this.animate, this);
          return this.show();
        }
        var animation = { duration: 1000, keyFrames: {
            0: { scale: 1, rotate: "0deg" },
            10: { scale: 0.9, rotate: "-3deg" },
            20: { scale: 0.9, rotate: "-3deg" },
            30: { scale: 1.1, rotate: "3deg" },
            40: { scale: 1.1, rotate: "-3deg" },
            50: { scale: 1.1, rotate: "3deg" },
            60: { scale: 1.1, rotate: "-3deg" },
            70: { scale: 1.1, rotate: "3deg" },
            80: { scale: 1.1, rotate: "-3deg" },
            90: { scale: 1.1, rotate: "3deg" },
            100: { scale: 1, rotate: "0deg" }
          } };
        qx.bom.element.Animation.animate(this.getContentElement().getDomElement(), animation);
        return this;
      },


      /**
       * Show the info pane. Overridden to return instance & allow chaining method calls.
       * @return {cboulanger.eventrecorder.InfoPane}
       */
      show: function show() {
        cboulanger.eventrecorder.InfoPane.prototype.show.base.call(this);
        return this;
      }
    },

    /**
      * Destructor
      */
    destruct: function destruct() {
      this._disposeObjects("__atom");
    }
  });
  cboulanger.eventrecorder.InfoPane.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=InfoPane.js.map?dt=1552484218628