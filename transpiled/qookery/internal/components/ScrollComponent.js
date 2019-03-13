(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.ContainerComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.container.Scroll": {},
			"qx.ui.container.Composite": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.ScrollComponent", {

		extend: qookery.internal.components.ContainerComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.ContainerComponent.constructor.call(this, parentComponent);
		},

		members: {

			__composite: null,

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "content-padding":
						return "IntegerList";
					case "content-padding-bottom":
						return "Integer";
					case "content-padding-left":
						return "Integer";
					case "content-padding-right":
						return "Integer";
					case "content-padding-top":
						return "Integer";
					case "scrollbar-x":
						return "String";
					case "scrollbar-y":
						return "String";
				}
				return qookery.internal.components.ScrollComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			_createContainerWidget: function _createContainerWidget() {
				var scroll = new qx.ui.container.Scroll();
				this.__composite = new qx.ui.container.Composite();
				scroll.add(this.__composite);
				this._applyAttribute("content-padding", scroll, "contentPadding");
				this._applyAttribute("content-padding-top", scroll, "contentPaddingTop");
				this._applyAttribute("content-padding-right", scroll, "contentPaddingRight");
				this._applyAttribute("content-padding-bottom", scroll, "contentPaddingBottom");
				this._applyAttribute("content-padding-left", scroll, "contentPaddingLeft");
				this._applyAttribute("scrollbar-x", scroll, "scrollbarX");
				this._applyAttribute("scrollbar-y", scroll, "scrollbarY");
				this._applyWidgetAttributes(scroll);
				return scroll;
			},

			getAttribute: function getAttribute(attributeName, defaultValue) {
				if (attributeName === "layout") return "none";
				return qookery.internal.components.ScrollComponent.prototype.getAttribute.base.call(this, attributeName, defaultValue);
			},

			getMainWidget: function getMainWidget() {
				return this.__composite;
			}
		}
	});
	qookery.internal.components.ScrollComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScrollComponent.js.map?dt=1552484192304