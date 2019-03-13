(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Manager": {},
      "qx.core.Id": {},
      "qx.ui.core.Widget": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Mixin.define("cboulanger.eventrecorder.MHelperMethods", {
    members: {
      /**
       * Add a function to the global event monitor.
       * @param fn {Function}
       */
      addGlobalEventListener: function addGlobalEventListener(fn) {
        var evtMonitor = qx.event.Manager.getGlobalEventMonitor();
        qx.event.Manager.setGlobalEventMonitor(evtMonitor ? function (target, event) {
          evtMonitor(target, event);fn(target, event);
        } : fn);
      },

      /**
       * Returns the absolute id of the owned object with that id
       * @param domNode {Element}
       * @param id {String}
       * @returns {String}
       */
      absoluteIdOf: function absoluteIdOf(domNode, id) {
        return qx.core.Id.getAbsoluteIdOf(qx.ui.core.Widget.getWidgetByElement(domNode).getQxObject(id));
      }
    }
  });
  cboulanger.eventrecorder.MHelperMethods.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MHelperMethods.js.map?dt=1552484218659