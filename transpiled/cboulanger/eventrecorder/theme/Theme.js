(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "cboulanger.eventrecorder.theme.Color": {
        "require": true
      },
      "cboulanger.eventrecorder.theme.Decoration": {
        "require": true
      },
      "cboulanger.eventrecorder.theme.Font": {
        "require": true
      },
      "dialog.theme.icon.Tango": {
        "require": true
      },
      "cboulanger.eventrecorder.theme.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("cboulanger.eventrecorder.theme.Theme", {
    meta: {
      color: cboulanger.eventrecorder.theme.Color,
      decoration: cboulanger.eventrecorder.theme.Decoration,
      font: cboulanger.eventrecorder.theme.Font,
      icon: dialog.theme.icon.Tango,
      appearance: cboulanger.eventrecorder.theme.Appearance
    }
  });
  cboulanger.eventrecorder.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1552484192925