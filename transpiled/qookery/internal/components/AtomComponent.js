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
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.AtomComponent", {

		type: "abstract",
		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "center":
						return "Boolean";
					case "gap":
						return "Number";
					case "rich":
						return "Boolean";
					case "show":
						return "String";
				}
				return qookery.internal.components.AtomComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			_createWidgets: function _createWidgets() {
				var atom = this._createAtomWidget();
				return [atom];
			},

			_createAtomWidget: function _createAtomWidget() {
				throw new Error("Override _createAtomWidget() to provide implementation specific code");
			},

			_applyAtomAttributes: function _applyAtomAttributes(atom) {
				this._applyAttribute("center", atom, "center");
				this._applyAttribute("gap", atom, "gap");
				this._applyAttribute("icon", atom, "icon");
				this._applyAttribute("icon-position", atom, "iconPosition");
				this._applyAttribute("label", atom, "label");
				this._applyAttribute("rich", atom, "rich");
				this._applyAttribute("show", atom, "show");
				this._applyAttribute("text-align", this, function (textAlign) {
					atom.getChildControl("label").setAllowGrowX(true);
					atom.getChildControl("label").setTextAlign(textAlign);
				});
				this._applyWidgetAttributes(atom);
			},

			getLabel: function getLabel() {
				return this.getMainWidget().getLabel();
			},

			setLabel: function setLabel(label) {
				this.getMainWidget().setLabel(label);
			},

			getIcon: function getIcon() {
				return this.getMainWidget().getIcon();
			},

			setIcon: function setIcon(icon) {
				this.getMainWidget().setIcon(icon);
			}
		}
	});
	qookery.internal.components.AtomComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AtomComponent.js.map?dt=1552484191592