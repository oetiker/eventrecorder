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
			"qx.ui.container.Composite": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.CompositeComponent", {

		extend: qookery.internal.components.ContainerComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.ContainerComponent.constructor.call(this, parentComponent);
		},

		members: {

			_createContainerWidget: function _createContainerWidget() {
				var container = new qx.ui.container.Composite();
				this._applyWidgetAttributes(container);
				return container;
			}
		}
	});
	qookery.internal.components.CompositeComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CompositeComponent.js.map?dt=1552484191725