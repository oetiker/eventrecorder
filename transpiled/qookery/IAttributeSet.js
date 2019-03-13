(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IAttributeSet", {

		members: {

			/**
    * Return an attribute's value if defined, or a default value if missing
    *
    * <p>You may supply the <code>Error</code> JS build-in object as the default value parameter
    * in order to request that a range error is thrown when attribute is missing.</p>
    *
    * @param name {String} the name of the wanted attribute
    * @param defaultValue {any} optional default value, <code>undefined</code> will be used if not provided
    *
    * @return {any} attribute's value or requested default value if attribute is not defined within the set
    *
    * @throws {RangeError} in case attribute is not part of the set and the default value was set to <code>Error</code>
    */
			getAttribute: function getAttribute(name, defaultValue) {}
		}
	});
	qookery.IAttributeSet.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IAttributeSet.js.map?dt=1552484190823