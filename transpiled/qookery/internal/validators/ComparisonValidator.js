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
			"qookery.IValidator": {
				"require": true
			},
			"qx.locale.Manager": {},
			"qookery.util.ValidationError": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.validators.ComparisonValidator", {

		extend: qx.core.Object,
		implement: [qookery.IValidator],
		type: "singleton",

		construct: function construct() {
			qx.core.Object.constructor.call(this);
		},

		members: {

			createValidation: function createValidation(component, invalidMessage, options) {
				var operator = options["operator"] || "eq";
				var expectedValue = options["value"];
				return function (value) {
					if (value === null) return null;
					switch (operator) {
						case "eq":
							if (value == expectedValue) return null;
							if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.ComparisonValidator.eq", expectedValue);
							break;
						case "ne":
							if (value != expectedValue) return null;
							if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.ComparisonValidator.ne", expectedValue);
							break;
						case "gt":
							if (value > expectedValue) return null;
							if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.ComparisonValidator.gt", expectedValue);
							break;
						case "ge":
							if (value >= expectedValue) return null;
							if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.ComparisonValidator.ge", expectedValue);
							break;
						case "le":
							if (value <= expectedValue) return null;
							if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.ComparisonValidator.le", expectedValue);
							break;
						case "lt":
							if (value < expectedValue) return null;
							if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.ComparisonValidator.lt", expectedValue);
							break;
					}
					return new qookery.util.ValidationError(component, invalidMessage, null);
				};
			}
		}
	});
	qookery.internal.validators.ComparisonValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ComparisonValidator.js.map?dt=1552484192743