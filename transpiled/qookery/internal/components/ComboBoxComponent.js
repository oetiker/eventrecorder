(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.AbstractSelectBoxComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.form.ComboBox": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.ComboBoxComponent", {

		extend: qookery.internal.components.AbstractSelectBoxComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.AbstractSelectBoxComponent.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "placeholder":
						return "ReplaceableString";
					case "text-align":
						return "String";
				}
				return qookery.internal.components.ComboBoxComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			_createMainWidget: function _createMainWidget() {
				var comboBox = new qx.ui.form.ComboBox();
				this._applySelectBoxAttributes(comboBox);
				this._applyAttribute("placeholder", comboBox, "placeholder");
				var textField = comboBox.getChildControl("textfield");
				textField.addListener("changeValue", function (event) {
					if (this._disableValueEvents) return;
					var text = event.getData();
					if (text != null && text.trim().length === 0) text = null;
					var format = this.getFormat();
					var value = format != null ? format.parse(text) : text;
					this.getEditableWidget().setValue(this._getLabelOf(value));
					this._setValueSilently(value);
				}, this);
				this._applyAttribute("text-align", textField, "textAlign");
				return comboBox;
			},

			// Behavior

			_updateUI: function _updateUI(value) {
				this.getEditableWidget().setValue(this._getLabelOf(value));
			}
		}
	});
	qookery.internal.components.ComboBoxComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ComboBoxComponent.js.map?dt=1552484191661