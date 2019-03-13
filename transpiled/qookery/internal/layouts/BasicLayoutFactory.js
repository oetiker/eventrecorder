(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.core.Object": {
				"require": true
			},
			"qookery.ILayoutFactory": {
				"require": true
			},
			"qx.ui.layout.Basic": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.layouts.BasicLayoutFactory", {

		extend: qx.core.Object,
		implement: [qookery.ILayoutFactory],
		type: "singleton",

		members: {

			createLayout: function createLayout(attributes) {
				var layout = new qx.ui.layout.Basic();
				return layout;
			}
		}
	});
	qookery.internal.layouts.BasicLayoutFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BasicLayoutFactory.js.map?dt=1552484192615