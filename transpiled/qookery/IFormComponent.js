(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.IContainerComponent": {
				"require": true
			},
			"qookery.IVariableProvider": {
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IFormComponent", {

		extend: [qookery.IContainerComponent, qookery.IVariableProvider],

		statics: {

			// Attribute names

			/** {Function} The service resolver associated with form */
			A_SERVICE_RESOLVER: "{http://www.qookery.org/ns/Form}service-resolver",

			/** {String} A string to prepend to all form-local translation message IDs */
			A_TRANSLATION_PREFIX: "{http://www.qookery.org/ns/Form}translation-prefix",

			/** {Map} Additional variables provided by the caller of the form parser */
			A_VARIABLES: "{http://www.qookery.org/ns/Form}variables"
		},

		events: {

			/** This event is fired when the form has been closed. Its value is set to the form's <code>result</code> variable. */
			"close": "qx.event.type.Data"
		},

		properties: {

			/** An icon for UI elements that present this form */
			icon: { check: "String", nullable: true },

			/** The form's model for data binding */
			model: { nullable: true, dereference: true, event: "changeModel" },

			/** A title for UI elements that present this form */
			title: { check: "String", nullable: true },

			/** A boolean value set to <code>false</code> when the most recent validation failed */
			valid: { check: "Boolean", nullable: false, init: true, event: "changeValid" }
		},

		members: {

			// Lifecycle

			/**
    * Test if form is ready for processing user input
    *
    * <p>A form's readiness is asserted by the application via the markAsReady() method.</p>
    */
			isReady: function isReady() {},

			/**
    * Assert that the form is ready for processing user input
    */
			markAsReady: function markAsReady() {},

			// Access to other components

			/**
    * Return a component registered within this form
    *
    * @param componentId {String} the unique identifier of the requested component
    * @param required {Boolean?} if <code>true</code>, throw an error in case component is not found
    *
    * @return {qookery.IComponent} component or <code>null</code> if not found
    */
			getComponent: function getComponent(componentId, required) {},

			/**
    * Return the form that is the parent of this form, or <code>null</code> if no such linkage exists
    */
			getParentForm: function getParentForm() {},

			// Services

			/**
    * Return the form's model provider if set, or the default one otherwise
    */
			getModelProvider: function getModelProvider() {},

			/**
    * Attempt to resolve a service by using installed service resolver
    *
    * <p>This method will delegate the request to parent form if service is unavailable</p>
    *
    * @param serviceName {String} the name of wanted service
    *
    * @return {any} required service or <code>null</code> if not available
    */
			resolveService: function resolveService(serviceName) {},

			// Scripting

			/**
    * Return the JavaScript context that is used by Qookery scripting code
    *
    * @return {Object} a suitable JavaScript context
    */
			getScriptingContext: function getScriptingContext() {},

			// Operations

			/**
    * Validate form contents
    *
    * @return {qookery.util.ValidationError?} error found or <code>null</code> in case form is valid
    */
			validate: function validate() {},

			/**
    * Close the form
    *
    * @param result {any} optional value to set into the <code>result</code> variable
    */
			close: function close(result) {}
		}
	});
	qookery.IFormComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IFormComponent.js.map?dt=1552484190898