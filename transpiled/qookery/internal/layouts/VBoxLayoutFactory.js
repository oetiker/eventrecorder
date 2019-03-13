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
			"qx.ui.layout.VBox": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.layouts.VBoxLayoutFactory", {

		extend: qx.core.Object,
		implement: [qookery.ILayoutFactory],
		type: "singleton",

		members: {

			createLayout: function createLayout(attributes) {
				var defaultSpacingY = qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_LAYOUT_SPACING_Y, 0);
				var layout = new qx.ui.layout.VBox(defaultSpacingY);
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
	qookery.internal.layouts.VBoxLayoutFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VBoxLayoutFactory.js.map?dt=1552484192661