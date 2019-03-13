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
			"qx.ui.layout.Flow": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.layouts.FlowLayoutFactory", {

		extend: qx.core.Object,
		implement: [qookery.ILayoutFactory],
		type: "singleton",

		members: {

			createLayout: function createLayout(attributes) {
				var defaultSpacingX = qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_LAYOUT_SPACING_X, 0);
				var defaultSpacingY = qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_LAYOUT_SPACING_Y, 0);
				var layout = new qx.ui.layout.Flow(defaultSpacingX, defaultSpacingY, "left");
				var alignX = attributes.getAttribute("layout-align-x");
				if (alignX != null) layout.setAlignX(alignX);
				var alignY = attributes.getAttribute("layout-align-y");
				if (alignY != null) layout.setAlignY(alignY);
				var reversed = attributes.getAttribute("reversed");
				if (reversed != null) layout.setReversed(reversed);
				var spacing = attributes.getAttribute("spacing");
				if (spacing != null) {
					layout.setSpacingX(spacing);
					layout.setSpacingY(spacing);
				}
				var spacingX = attributes.getAttribute("spacing-x");
				if (spacingX != null) layout.setSpacingX(spacingX);
				var spacingY = attributes.getAttribute("spacing-y");
				if (spacingY != null) layout.setSpacingY(spacingY);
				return layout;
			}
		}
	});
	qookery.internal.layouts.FlowLayoutFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FlowLayoutFactory.js.map?dt=1552484192623