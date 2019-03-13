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
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.validators.NotNullValidator", {

		extend: qx.core.Object,
		implement: [qookery.IValidator],
		type: "singleton",

		construct: function construct() {
			qx.core.Object.constructor.call(this);
		},

		members: {

			createValidation: function createValidation(component, invalidMessage, options) {
				return function (value) {
					if (value !== null) return null;
					if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.NotNullValidator.invalidMessage");
					return new qookery.util.ValidationError(component, invalidMessage, null);
				};
			}
		}
	});
	qookery.internal.validators.NotNullValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NotNullValidator.js.map?dt=1552484192755