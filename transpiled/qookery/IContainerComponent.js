(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.IComponent": {
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IContainerComponent", {

		extend: qookery.IComponent,

		members: {

			/**
    * Add component into this container
    *
    * @param component {qookery.IComponent} the component to add into this component
    *
    * @throw an exception is thrown in case this component does not support operation
    */
			add: function add(component) {},

			/**
    * Remove component from this container
    *
    * @param component {qookery.IComponent} component to remove
    */
			remove: function remove(component) {},

			/**
    * Test whether given component is a member of this container
    *
    * @param component {qookery.IComponent} component to look for
    *
    * @return {Boolean} <code>true</code> if component is a member of this container
    */
			contains: function contains(component) {},

			/**
    * Return an array of all contained components
    *
    * @return {Array} contained components
    */
			listChildren: function listChildren() {}
		}
	});
	qookery.IContainerComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IContainerComponent.js.map?dt=1552484190856