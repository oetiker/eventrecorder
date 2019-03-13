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
			"qookery.Qookery": {},
			"qx.ui.layout.HBox": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.layouts.HBoxLayoutFactory", {

		extend: qx.core.Object,
		implement: [qookery.ILayoutFactory],
		type: "singleton",

		members: {

			createLayout: function createLayout(attributes) {
				var defaultSpacingX = qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_LAYOUT_SPACING_X, 0);
				var layout = new qx.ui.layout.HBox(defaultSpacingX);
				var alignX = attributes.getAttribute("layout-align-x");
				if (alignX != null) layout.setAlignX(alignX);
				var alignY = attributes.getAttribute("layout-align-y");
				if (alignY != null) layout.setAlignY(alignY);
				var reversed = attributes.getAttribute("reversed");
				if (reversed != null) layout.setReversed(reversed);
				var separator = attributes.getAttribute("separator");
				if (separator != null) layout.setSeparator(separator);
				var spacing = attributes.getAttribute("spacing");
				if (spacing != null) layout.setSpacing(spacing);
				return layout;
			}
		}
	});
	qookery.internal.layouts.HBoxLayoutFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HBoxLayoutFactory.js.map?dt=1552484192654