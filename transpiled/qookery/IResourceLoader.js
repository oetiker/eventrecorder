(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IResourceLoader", {

		members: {

			/**
    * Return the URI of a named resource
    *
    * <p>This method allows applications to extend or replace default resolution performed
    * by qx.util.ResourceManager</p>
    *
    * @param name {String} the name of the resource
    *
    * @return {String} a URI that can be used to load the resource
    */
			resolveResourceUri: function resolveResourceUri(name) {},

			/**
    * Load a remote resource (sync or async)
    *
    * <p>Calls to this method imply synchronous loading when no success
    * callback has been set</p>
    *
    * @param name {String} name of the wanted resource
    * @param thisArg {Object ? null} optional context for callbacks, may be <code>null</code>
    * @param successCallback {Function} optional function to be called on asynchronous load success
    * @param failCallback {Function} optional function to be called on asynchronous load failure
    */
			loadResource: function loadResource(name, thisArg, successCallback, failCallback) {}
		}
	});
	qookery.IResourceLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IResourceLoader.js.map?dt=1552484190967