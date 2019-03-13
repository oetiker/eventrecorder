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
			"qookery.Qookery": {},
			"qx.bom.Event": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.FieldComponent", {

		type: "abstract",
		extend: qookery.internal.components.EditableComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.EditableComponent.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "filter":
						return "RegularExpression";
					case "max-length":
						return "Integer";
					case "placeholder":
						return "ReplaceableString";
					case "text-align":
						return "String";
				}
				return qookery.internal.components.FieldComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			create: function create(attributes) {
				qookery.internal.components.FieldComponent.prototype.create.base.call(this, attributes);
			},

			_setupTextField: function _setupTextField(widget) {
				this._applyAttribute("native-context-menu", widget, "nativeContextMenu", qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_NATIVE_CONTEXT_MENU));
				widget.addListener("changeValue", function (event) {
					if (this._disableValueEvents) return;
					var text = event.getData();
					if (text != null && text.trim().length === 0) text = null;
					var format = this.getFormat();
					var value = format != null ? format.parse(text) : text;
					this.getEditableWidget().setValue(this._getLabelOf(value));
					this._setValueSilently(value);
				}, this);
				widget.addListener("keypress", function (event) {
					if (this.isReadOnly() || !event.isShiftPressed() || event.isAltPressed() || event.isCtrlPressed()) return;
					switch (event.getKeyIdentifier()) {
						case "Delete":
						case "Backspace":
							this.setValue(null);
							return;
					}
				}, this);
				var liveUpdate = this.getAttribute("live-update", qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_LIVE_UPDATE));
				if (liveUpdate) {
					widget.addListenerOnce("appear", function () {
						var component = this;
						qx.bom.Event.addNativeListener(widget.getContentElement().getDomElement(), "paste", function () {
							component.setValue(this.value);
						});
					}, this);
					widget.addListener("blur", function (event) {
						if (this._disableValueEvents) return;
						var format = this.getFormat();
						if (format == null) return;
						var text = this.getEditableWidget().getValue();
						var value = format.parse(text);
						text = format.format(value);
						this.getEditableWidget().setValue(text);
					}, this);
					widget.setLiveUpdate(true);
				}
				this._applyAttribute("filter", widget, "filter");
				this._applyAttribute("max-length", widget, "maxLength");
				this._applyAttribute("placeholder", widget, "placeholder");
				this._applyAttribute("text-align", widget, "textAlign");
				return widget;
			},

			_updateUI: function _updateUI(value) {
				this.getEditableWidget().setValue(this._getLabelOf(value));
			},

			_applyReadOnly: function _applyReadOnly(readOnly) {
				qookery.internal.components.FieldComponent.prototype._applyReadOnly.base.call(this, readOnly);
				var editableWidget = this.getEditableWidget();
				if (editableWidget != null) editableWidget.setReadOnly(readOnly);
			}
		}
	});
	qookery.internal.components.FieldComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FieldComponent.js.map?dt=1552484191931