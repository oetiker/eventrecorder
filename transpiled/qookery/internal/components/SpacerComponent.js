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
			"qx.ui.core.Spacer": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.SpacerComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			_createWidgets: function _createWidgets() {
				var spacer = new qx.ui.core.Spacer();
				this._applyWidgetAttributes(spacer);
				return [spacer];
			},

			_applyEnabled: function _applyEnabled(enabled) {
				// Not supported
			}
		}
	});
	qookery.internal.components.SpacerComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SpacerComponent.js.map?dt=1552484192354