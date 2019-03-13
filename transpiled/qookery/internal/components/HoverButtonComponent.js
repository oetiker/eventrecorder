(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.AtomComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.form.HoverButton": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.HoverButtonComponent", {

		extend: qookery.internal.components.AtomComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.AtomComponent.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "interval":
						return "Integer";
				}
				return qookery.internal.components.HoverButtonComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			_createAtomWidget: function _createAtomWidget() {
				var button = new qx.ui.form.HoverButton();
				this._applyAttribute("interval", button, "interval");
				this._applyAtomAttributes(button);
				return button;
			},

			// Public methods

			getCommand: function getCommand() {
				return this.getMainWidget().getCommand();
			},

			setCommand: function setCommand(command) {
				this.getMainWidget().setCommand(command);
			},

			execute: function execute() {
				this.getMainWidget().execute();
			}
		}
	});
	qookery.internal.components.HoverButtonComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HoverButtonComponent.js.map?dt=1552484192137