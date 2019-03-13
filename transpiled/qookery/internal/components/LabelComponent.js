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
			"qx.ui.basic.Label": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.LabelComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "rich":
						return "Boolean";
					case "wrap":
						return "Boolean";
				}
				return qookery.internal.components.LabelComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			_createWidgets: function _createWidgets() {
				var label = new qx.ui.basic.Label(this.getAttribute("label", ""));
				this._applyAttribute("rich", label, "rich");
				this._applyAttribute("wrap", label, "wrap");
				this._applyAttribute("text-align", label, "textAlign");
				this._applyWidgetAttributes(label);
				return [label];
			},

			getValue: function getValue() {
				return this.getMainWidget().getValue();
			},

			setValue: function setValue(value) {
				this.getMainWidget().setValue(value);
			},

			getRich: function getRich() {
				return this.getMainWidget().getRich();
			},

			setRich: function setRich(value) {
				this.getMainWidget().setRich(value);
			}
		}
	});
	qookery.internal.components.LabelComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LabelComponent.js.map?dt=1552484192183