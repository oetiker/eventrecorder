(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IVariableProvider", {

		members: {

			/**
    * Get a variable's value
    *
    * @param variableName {String} the name of the variable
    *
    * @return {any} variable value or <code>undefined</code>
    */
			getVariable: function getVariable(variableName) {},

			/**
    * Set a variable's value
    *
    * @param variableName {String} the name of the variable
    * @param value {any} the new variable value
    */
			setVariable: function setVariable(variableName, value) {}
		}
	});
	qookery.IVariableProvider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IVariableProvider.js.map?dt=1552484190984