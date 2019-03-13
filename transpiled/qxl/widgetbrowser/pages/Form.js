(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.widgetbrowser.pages.AbstractPage": {
        "construct": true,
        "require": true
      },
      "qxl.formdemo.FormItems": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.widgetbrowser.pages.Form", {
    extend: qxl.widgetbrowser.pages.AbstractPage,

    statics: {
      ITEM_SIZE: 3
    },

    construct: function construct() {
      qxl.widgetbrowser.pages.AbstractPage.constructor.call(this);

      var formItems = new qxl.formdemo.FormItems();
      this._widgets = formItems.getWidgets();
      this.add(formItems);
    }
  });
  qxl.widgetbrowser.pages.Form.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Form.js.map?dt=1552484220662