(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.util.format.NumberFormat": {
				"construct": true,
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.formats.NumberFormat", {

		extend: qx.util.format.NumberFormat,

		construct: function construct(options) {
			qx.util.format.NumberFormat.constructor.call(this);
			this.__setOptions(options);
		},

		members: {

			__setOptions: function __setOptions(options) {
				for (var key in options) {
					this.__setOption(key, options[key]);
				}
			},

			__setOption: function __setOption(key, value) {
				switch (key) {
					case "groupingUsed":
						this.setGroupingUsed(!!value);
						return;
					case "prefix":
						this.setPrefix(value);
						return;
					case "postfix":
						this.setPostfix(value);
						return;
					case "fractionDigits":
						// Shorthand for setting both min and max
						this.setMinimumFractionDigits(parseInt(value));
						this.setMaximumFractionDigits(parseInt(value));
						return;
					case "minimumFractionDigits":
						this.setMinimumFractionDigits(parseInt(value));
						return;
					case "maximumFractionDigits":
						this.setMaximumFractionDigits(parseInt(value));
						return;
					case "integerDigits":
						// Shorthand for setting both min and max
						this.setMinimumIntegerDigits(parseInt(value));
						this.setMaximumIntegerDigits(parseInt(value));
						return;
					case "minimumIntegerDigits":
						this.setMinimumIntegerDigits(parseInt(value));
						return;
					case "maximumIntegerDigits":
						this.setMaximumIntegerDigits(parseInt(value));
						return;
				}
			}
		}
	});
	qookery.internal.formats.NumberFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NumberFormat.js.map?dt=1552484192602