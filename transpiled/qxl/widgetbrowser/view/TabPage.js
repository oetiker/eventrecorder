(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qxl.widgetbrowser.pages.Tree": {},
      "qxl.widgetbrowser.pages.List": {},
      "qxl.widgetbrowser.pages.Table": {},
      "qxl.widgetbrowser.pages.Form": {},
      "qxl.widgetbrowser.pages.ToolBar": {},
      "qxl.widgetbrowser.pages.Window": {},
      "qxl.widgetbrowser.pages.Tab": {},
      "qxl.widgetbrowser.pages.Control": {},
      "qxl.widgetbrowser.pages.Embed": {},
      "qxl.widgetbrowser.pages.EmbedFrame": {},
      "qxl.widgetbrowser.pages.Basic": {},
      "qxl.widgetbrowser.pages.Misc": {},
      "qx.Class": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.ui.tabview.Page": {
        "construct": true,
        "require": true
      },
      "qxl.widgetbrowser.MControls": {
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.ui.basic.Image": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.widgetbrowser.view.TabPage", {
    extend: qx.ui.tabview.Page,

    include: qxl.widgetbrowser.MControls,

    construct: function construct(label, classname, controls) {
      qx.ui.tabview.Page.constructor.call(this);

      this.setLabel(label);
      this.setLayout(new qx.ui.layout.Canvas());

      // Load content of tab on "appear"
      this.addListenerOnce("appear", function () {
        var clazz = qx.Class.getByName(classname);
        var pageContent = new clazz();
        // Add to page
        this.add(pageContent, { top: 40, edge: 0 });
        // Init controls for widgets of page
        this.initControls(pageContent.getWidgets(), controls);
        // Exclude loading indicator
        loading.setVisibility("excluded");
      }, this);

      // Show centered loading indicator
      var loading = new qx.ui.basic.Image("qxl/widgetbrowser/loading66.gif");
      loading.setMarginTop(-33);
      loading.setMarginLeft(-33);
      this.add(loading, { left: "50%", top: "50%" });
    },

    members: {}
  });
  qxl.widgetbrowser.view.TabPage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TabPage.js.map?dt=1552484220253