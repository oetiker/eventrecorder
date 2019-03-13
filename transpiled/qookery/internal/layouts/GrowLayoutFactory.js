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
			"qx.ui.layout.Grow": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.layouts.GrowLayoutFactory", {

		extend: qx.core.Object,
		implement: [qookery.ILayoutFactory],
		type: "singleton",

		members: {

			createLayout: function createLayout(attributes) {
				var layout = new qx.ui.layout.Grow();
				return layout;
			}
		}
	});
	qookery.internal.layouts.GrowLayoutFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GrowLayoutFactory.js.map?dt=1552484192646