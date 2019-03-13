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
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.formats.CustomFormat", {

		extend: qx.core.Object,
		implement: [qx.util.format.IFormat],

		construct: function construct(options) {
			qx.core.Object.constructor.call(this);
			var expression = options["expression"];
			if (expression) {
				this.__formatFunction = new Function(["value"], "return(" + expression + ");");
				return;
			}
			var format = options["format"];
			if (format) {
				this.__formatFunction = format;
				return;
			}
			throw new Error("An expression or function must be provided");
		},

		members: {

			__formatFunction: null,

			format: function format(obj) {
				if (!this.__formatFunction) return obj;
				try {
					return this.__formatFunction.apply(this, [obj]);
				} catch (e) {
					this.error("Error applying custom format", e);
					return "";
				}
			},

			parse: function parse(str) {
				throw new Error("Parsing is not supported");
			}
		}
	});
	qookery.internal.formats.CustomFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CustomFormat.js.map?dt=1552484192579