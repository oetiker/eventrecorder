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
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.impl.WrapperComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(widgetClass, parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
			this.__widgetClass = widgetClass;
		},

		members: {

			__widgetClass: null,

			_createWidgets: function _createWidgets() {
				var mainWidget = new this.__widgetClass(this);
				this._applyWidgetAttributes(mainWidget);
				return [mainWidget];
			}
		}
	});
	qookery.impl.WrapperComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WrapperComponent.js.map?dt=1552484191309