(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.EditableComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.form.CheckBox": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.CheckFieldComponent", {

		extend: qookery.internal.components.EditableComponent,

		properties: {
			triState: { init: false, inheritable: true, check: "Boolean", nullable: true, apply: "__applyTriState" }
		},

		construct: function construct(parentComponent) {
			qookery.internal.components.EditableComponent.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "check-box-label":
						return "ReplaceableString";
					case "tri-state":
						return "Boolean";
				}
				return qookery.internal.components.CheckFieldComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Creation

			create: function create(attributes) {
				qookery.internal.components.CheckFieldComponent.prototype.create.base.call(this, attributes);
				this._applyAttribute("tri-state", this, "triState");
			},

			_createMainWidget: function _createMainWidget() {
				var checkBox = new qx.ui.form.CheckBox();
				var label = this.getAttribute("check-box-label");
				if (label !== undefined) checkBox.setLabel(label);
				checkBox.addListener("changeValue", function (event) {
					if (this._disableValueEvents) return;
					this.setValue(event.getData());
				}, this);
				// Below hack works around chechbox shortcomings with triple state values
				if (this.getAttribute("tri-state", false)) {
					checkBox.__availableStates = [true, false, null];
					checkBox.toggleValue = function () {
						this.__currentState = this.__availableStates.indexOf(this.getValue());
						this.__currentState = this.__currentState >= 2 ? 0 : this.__currentState + 1;
						this.setValue(this.__availableStates[this.__currentState]);
					}.bind(checkBox);
				}
				this._applyWidgetAttributes(checkBox);
				return checkBox;
			},

			// Component implementation

			_updateUI: function _updateUI(value) {
				this.getMainWidget().setValue(value);
			},

			_applyEnabled: function _applyEnabled(enabled) {
				var labelWidget = this.getLabelWidget();
				if (labelWidget != null) labelWidget.setEnabled(enabled);
				this.__updateEnabled();
			},

			_applyReadOnly: function _applyReadOnly(readOnly) {
				qookery.internal.components.CheckFieldComponent.prototype._applyReadOnly.base.call(this, readOnly);
				this.__updateEnabled();
			},

			__updateEnabled: function __updateEnabled() {
				var isEnabled = this.getEnabled();
				var isReadOnly = this.getReadOnly();
				this.getMainWidget().setEnabled(isEnabled && !isReadOnly);
			},

			// Internals

			__applyTriState: function __applyTriState(triState) {
				this.getMainWidget().setTriState(triState);
				this.getMainWidget().setValue(null);
			}
		}
	});
	qookery.internal.components.CheckFieldComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckFieldComponent.js.map?dt=1552484191651