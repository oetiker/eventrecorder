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
			"qx.ui.form.Slider": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.SliderComponent", {

		extend: qookery.internal.components.EditableComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.EditableComponent.constructor.call(this, parentComponent);
		},

		members: {

			_createMainWidget: function _createMainWidget() {
				var widget = new qx.ui.form.Slider();
				this._applyWidgetAttributes(widget);
				this._applyAttribute("minimum", widget, "minimum");
				this._applyAttribute("maximum", widget, "maximum");
				this._applyAttribute("page-step", widget, "pageStep");
				this._applyAttribute("single-step", widget, "singleStep");
				widget.addListener("changeValue", function (event) {
					if (this._disableValueEvents) return;
					this.setValue(event.getData());
				}, this);
				return widget;
			},

			_updateUI: function _updateUI(value) {
				if (!value) this.getMainWidget().resetValue();else this.getMainWidget().setValue(value);
			}
		}
	});
	qookery.internal.components.SliderComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SliderComponent.js.map?dt=1552484192347