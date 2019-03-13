(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.ui.core.Widget": {
				"construct": true,
				"require": true
			},
			"qx.event.Timer": {
				"construct": true
			},
			"qx.html.Element": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.ace.internal.AceWidget", {

		extend: qx.ui.core.Widget,

		construct: function construct(component) {
			qx.ui.core.Widget.constructor.call(this);
			this.__component = component;
			this.addListener("resize", function () {
				qx.event.Timer.once(function () {
					if (this.isDisposed()) return;
					var editor = this.__component.getEditor();
					if (editor == null) return;
					editor.resize();
				}, this, 0);
			}, this);
		},

		members: {

			__component: null,

			_createContentElement: function _createContentElement() {
				// Create a selectable and overflow disabled <div>
				var element = new qx.html.Element("div", {
					overflowX: "hidden",
					overflowY: "hidden"
				});
				element.setSelectable(true);
				return element;
			}
		}
	});
	qookery.ace.internal.AceWidget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AceWidget.js.map?dt=1552484191084