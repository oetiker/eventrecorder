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
			"qx.ui.tabview.Page": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.TabViewPageComponent", {

		extend: qookery.internal.components.ContainerComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.ContainerComponent.constructor.call(this, parentComponent);
		},

		members: {

			// Metadata

			getAttributeType: function getAttributeType(attributeName) {
				switch (attributeName) {
					case "show-close-button":
						return "Boolean";
				}
				return qookery.internal.components.TabViewPageComponent.prototype.getAttributeType.base.call(this, attributeName);
			},

			// Construction

			_createContainerWidget: function _createContainerWidget() {
				var page = new qx.ui.tabview.Page(this.getAttribute("label", null), this.getAttribute("icon", null));
				this._applyAttribute("show-close-button", page, "showCloseButton");
				this._applyWidgetAttributes(page);
				return page;
			}
		}
	});
	qookery.internal.components.TabViewPageComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TabViewPageComponent.js.map?dt=1552484192431