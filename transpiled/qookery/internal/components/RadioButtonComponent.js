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
			"qx.ui.form.RadioButton": {},
			"qookery.util.Xml": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.RadioButtonComponent", {

		extend: qookery.internal.components.ButtonComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.ButtonComponent.constructor.call(this, parentComponent);
		},

		members: {

			_createAtomWidget: function _createAtomWidget() {
				var radioButton = new qx.ui.form.RadioButton();
				this._applyAtomAttributes(radioButton);
				return radioButton;
			},

			setup: function setup() {
				var model = this.getAttribute("model");
				if (model != null) {
					var type = this.getAttribute("model-type", "String");
					this.setModel(qookery.util.Xml.parseValue(this, type, model));
				}
				return qookery.internal.components.RadioButtonComponent.prototype.setup.base.call(this);
			},

			getModel: function getModel() {
				return this.getMainWidget().getModel();
			},

			setModel: function setModel(model) {
				this.getMainWidget().setModel(model);
			}
		}
	});
	qookery.internal.components.RadioButtonComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RadioButtonComponent.js.map?dt=1552484192253