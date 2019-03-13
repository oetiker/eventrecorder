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
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.validators.ArrayValidator", {

		extend: qx.core.Object,
		implement: [qookery.IValidator],
		type: "singleton",

		construct: function construct() {
			qx.core.Object.constructor.call(this);
		},

		members: {

			createValidation: function createValidation(component, invalidMessage, options) {
				return function (value) {
					if (value === null) return null;
					var message = null;
					if (options["minimumLength"] && value.length < parseInt(options["minimumLength"], 10)) {
						message = invalidMessage || qx.locale.Manager.tr("qookery.internal.validators.ArrayValidator.minimumLength", options["minimumLength"]);
					} else if (options["maximumLength"] && value.length > parseInt(options["maximumLength"], 10)) {
						message = invalidMessage || qx.locale.Manager.tr("qookery.internal.validators.ArrayValidator.maximumLength", options["maximumLength"]);
					}
					if (!message) return null;
					return new qookery.util.ValidationError(component, message, null);
				};
			}
		}
	});
	qookery.internal.validators.ArrayValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ArrayValidator.js.map?dt=1552484192724