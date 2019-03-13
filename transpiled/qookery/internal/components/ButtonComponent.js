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
			"qookery.Qookery": {},
			"qx.ui.form.Button": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.ButtonComponent", {

		extend: qookery.internal.components.AtomComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.AtomComponent.constructor.call(this, parentComponent);
		},

		members: {

			_createAtomWidget: function _createAtomWidget() {
				var button = this._createButton();
				this._applyAttribute("command", this, function (commandName) {
					var command = qookery.Qookery.getRegistry().getCommand(commandName);
					if (command == null) throw new Error("Undefined command " + commandName);
					button.setCommand(command);
				});
				this._applyAtomAttributes(button);
				return button;
			},

			_createButton: function _createButton() {
				return new qx.ui.form.Button();
			},

			setValue: function setValue(buttonLabelValue) {
				// BCC Qookery: Method kept for compatibilty with former way of setting label
				this.getMainWidget().setLabel(buttonLabelValue);
			},

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
	qookery.internal.components.ButtonComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ButtonComponent.js.map?dt=1552484191609