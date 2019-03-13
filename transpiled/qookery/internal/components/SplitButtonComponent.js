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
			"qx.ui.form.SplitButton": {},
			"qookery.Qookery": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.SplitButtonComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "show":
						return "String";
				}
				return qookery.internal.components.SplitButtonComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Lifecycle

			_createWidgets: function _createWidgets() {
				var button = new qx.ui.form.SplitButton();
				this._applyAttribute("command", this, function (commandName) {
					var command = qookery.Qookery.getRegistry().getCommand(commandName);
					if (command == null) throw new Error("Undefined command " + commandName);
					button.setCommand(command);
				});
				this._applyAttribute("icon", button, "icon");
				this._applyAttribute("label", button, "label");
				this._applyAttribute("show", button, "show");
				this._applyWidgetAttributes(button);
				return [button];
			}
		}
	});
	qookery.internal.components.SplitButtonComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SplitButtonComponent.js.map?dt=1552484192386