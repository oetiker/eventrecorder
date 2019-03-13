(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IValidator", {

		members: {

			/**
    * Create a validation function
    *
    * @param component {qookery.IComponent} component that will receive the new validation
    * @param invalidMessage {String?} message that will be displayed when validation fails
    * @param options {Map?} optional map with validator-specific arguments
    */
			createValidation: function createValidation(component, invalidMessage, options) {}
		}
	});
	qookery.IValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IValidator.js.map?dt=1552484190979