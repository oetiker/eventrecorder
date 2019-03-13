(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			},
			"qx.core.Assert": {},
			"qookery.IAttributeSet": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.ILayoutFactory", {

		members: {

			/**
    * Create a new layout
    *
    * @param attributes {qookery.IAttributeSet} set of attributes that may be of use for configuring new layout
    *
    * @return {qx.ui.layout.Abstract} created layout
    */
			createLayout: function createLayout(attributes) {
				qx.core.Assert.assertArgumentsCount(arguments, 1, 1);
				qx.core.Assert.assertInterface(attributes, qookery.IAttributeSet);
			}
		}
	});
	qookery.ILayoutFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ILayoutFactory.js.map?dt=1552484190914