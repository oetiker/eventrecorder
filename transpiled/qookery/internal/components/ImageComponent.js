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
			"qx.ui.basic.Image": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.ImageComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "scale":
						return "Boolean";
					case "source":
						return "ReplaceableString";
					default:
						return qookery.internal.components.ImageComponent.prototype.getAttributeType.base.call(this, attributeName);
				}
			},

			// Creation

			_createWidgets: function _createWidgets() {
				var image = new qx.ui.basic.Image(this.getAttribute("source", null));
				this._applyAttribute("scale", image, "scale");
				this._applyWidgetAttributes(image);
				return [image];
			},

			getSource: function getSource() {
				return this.getMainWidget().getSource();
			},

			setSource: function setSource(source) {
				this.getMainWidget().setSource(source);
			},

			getScale: function getScale() {
				return this.getMainWidget().getScale();
			},

			setScale: function setScale(scale) {
				this.getMainWidget().setScale(scale);
			}
		}
	});
	qookery.internal.components.ImageComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ImageComponent.js.map?dt=1552484192171