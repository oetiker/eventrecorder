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
			"qx.ui.embed.Canvas": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.CanvasComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "canvas-height":
						return "Size";
					case "canvas-width":
						return "Size";
					case "sync-dimension":
						return "Boolean";
					default:
						return qookery.internal.components.CanvasComponent.prototype.getAttributeType.base.call(this, attributeName);
				}
			},

			// Lifecycle

			_createWidgets: function _createWidgets() {
				var canvas = new qx.ui.embed.Canvas(this.getAttribute("canvas-width", 300), this.getAttribute("canvas-height", 150));
				this._applyAttribute("sync-dimension", canvas, "syncDimension");
				this._applyWidgetAttributes(canvas);
				return [canvas];
			},

			// Methods

			getContext2d: function getContext2d() {
				return this.getMainWidget().getContext2d();
			},

			update: function update() {
				this.getMainWidget().update();
			}
		}
	});
	qookery.internal.components.CanvasComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CanvasComponent.js.map?dt=1552484191622