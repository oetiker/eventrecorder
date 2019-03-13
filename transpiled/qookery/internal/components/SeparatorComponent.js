(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.Component": {
				"construct": true,
				"require": true
			},
			"qx.ui.core.Widget": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.SeparatorComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			_createWidgets: function _createWidgets() {
				var separator = new qx.ui.core.Widget();
				separator.setBackgroundColor("border-separator");
				switch (this.getAttribute("variant", "horizontal")) {
					case "horizontal":
						separator.set({ decorator: "separator-horizontal", width: 10, height: 1, allowStretchX: true, allowStretchY: false });
						break;
					case "vertical":
						separator.set({ decorator: "separator-vertical", width: 1, height: 10, allowStretchX: false, allowStretchY: true });
						break;
					default:
						throw new Error("Unknown separator variant");
				}
				this._applyWidgetAttributes(separator);
				return [separator];
			}
		}
	});
	qookery.internal.components.SeparatorComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SeparatorComponent.js.map?dt=1552484192339