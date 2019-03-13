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
			"qx.ui.form.TextArea": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.TextAreaComponent", {

		extend: qookery.internal.components.FieldComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.FieldComponent.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "auto-size":
						return "Boolean";
					case "minimal-line-height":
						return "Integer";
					case "single-step":
						return "Integer";
					case "wrap":
						return "Boolean";
				}
				return qookery.internal.components.TextAreaComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			_createMainWidget: function _createMainWidget() {
				var widget = new qx.ui.form.TextArea();
				this._setupTextField(widget);
				this._applyWidgetAttributes(widget);
				this._applyAttribute("auto-size", widget, "autoSize");
				this._applyAttribute("minimal-line-height", widget, "minimalLineHeight");
				this._applyAttribute("single-step", widget, "singleStep");
				this._applyAttribute("wrap", widget, "wrap");
				return widget;
			}
		}
	});
	qookery.internal.components.TextAreaComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextAreaComponent.js.map?dt=1552484192499