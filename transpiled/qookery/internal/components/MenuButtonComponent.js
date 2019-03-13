(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.ButtonComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.form.MenuButton": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.MenuButtonComponent", {

		extend: qookery.internal.components.ButtonComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.ButtonComponent.constructor.call(this, parentComponent);
		},

		members: {

			// Creation

			_createButton: function _createButton() {
				return new qx.ui.form.MenuButton();
			}
		}
	});
	qookery.internal.components.MenuButtonComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MenuButtonComponent.js.map?dt=1552484192224