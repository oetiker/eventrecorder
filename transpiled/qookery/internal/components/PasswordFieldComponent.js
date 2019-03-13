(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.TextFieldComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.form.PasswordField": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.PasswordFieldComponent", {

		extend: qookery.internal.components.TextFieldComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.TextFieldComponent.constructor.call(this, parentComponent);
		},

		members: {

			_createMainWidget: function _createMainWidget() {
				var widget = new qx.ui.form.PasswordField();
				this._setupTextField(widget);
				this._applyWidgetAttributes(widget);
				return widget;
			}
		}
	});
	qookery.internal.components.PasswordFieldComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PasswordFieldComponent.js.map?dt=1552484192233