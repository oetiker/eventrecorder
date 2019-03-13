(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.core.Object": {
				"construct": true,
				"require": true
			},
			"qx.util.format.IFormat": {
				"require": true
			},
			"qookery.Qookery": {
				"construct": true
			},
			"qx.lang.String": {
				"construct": true
			},
			"qx.data.Conversion": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.formats.MapFormat", {

		extend: qx.core.Object,
		implement: [qx.util.format.IFormat],

		construct: function construct(options) {
			qx.core.Object.constructor.call(this);
			var mapName = options["map"];
			this.__map = qookery.Qookery.getRegistry().getMap(mapName);
			if (!this.__map) throw new Error(qx.lang.String.format("Map '%1' not registered", [mapName]));
			this.__fallback = options["fallback"];
		},

		members: {

			__map: null,
			__fallback: null,

			format: function format(value) {
				if (value == null) return "";
				var mappedValue = this.__map[value];
				if (mappedValue != null) value = mappedValue;else if (this.__fallback != null) value = this.__fallback;
				return qx.data.Conversion.toString(value);
			},

			parse: function parse(text) {
				return text;
			}
		}
	});
	qookery.internal.formats.MapFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MapFormat.js.map?dt=1552484192594