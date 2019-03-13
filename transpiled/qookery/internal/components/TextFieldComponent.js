(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.FieldComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.form.TextField": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.TextFieldComponent", {

		extend: qookery.internal.components.FieldComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.FieldComponent.constructor.call(this, parentComponent);
		},

		members: {

			_createMainWidget: function _createMainWidget() {
				var widget = new qx.ui.form.TextField();
				this._setupTextField(widget);
				this._applyWidgetAttributes(widget);
				return widget;
			}
		}
	});
	qookery.internal.components.TextFieldComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextFieldComponent.js.map?dt=1552484192505