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
			"qx.ui.embed.Iframe": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.IframeComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			_createWidgets: function _createWidgets() {
				var source = this.getAttribute("source", "about:blank");
				var iframe = new qx.ui.embed.Iframe(source);
				this._applyWidgetAttributes(iframe);
				return [iframe];
			},

			setSource: function setSource(source) {
				this.getMainWidget().setSource(source);
			},

			getSource: function getSource() {
				return this.getMainWidget().getSource();
			},

			getDocument: function getDocument() {
				return this.getMainWidget().getDocument();
			},

			getWindow: function getWindow() {
				return this.getMainWidget().getWindow();
			}
		}
	});
	qookery.internal.components.IframeComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IframeComponent.js.map?dt=1552484192162