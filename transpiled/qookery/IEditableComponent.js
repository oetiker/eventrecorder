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
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IEditableComponent", {

		extend: qookery.IComponent,

		properties: {

			/** Component's current value */
			value: { event: "changeValue" },

			/** Label which will be displayed close to component's interactive widgets */
			label: { check: "String", nullable: true },

			/** Tooltip text to display when the user hovers the mouse over the component's interactive widgets */
			toolTipText: { check: "String", nullable: true },

			/** Whether the component's value is required */
			required: { check: "Boolean", nullable: false, init: false },

			/** Whether the component's widget state is valid or not */
			valid: { check: "Boolean", nullable: false, init: true },

			/** A format to be used when displaying values */
			format: { check: "qx.util.format.IFormat", nullable: true },

			/** If true, this editor's value cannot be altered by its UI widgets */
			readOnly: { check: "Boolean", nullable: false, init: false }
		},

		members: {

			// User interface

			/**
    * Update the component's user interface to reflect given value
    *
    * <p>This method will do nothing in case an update is already in progress or the component has been disposed</p>
    *
    * @param value {any?} if <code>undefined</code>, automatically use component's current value
    *
    * @retun {Boolean} <code>true</code> in case the update was performed
    */
			updateUI: function updateUI(value) {},

			// Model connection

			/**
    * Create a two way binding between form's model and component's value
    *
    * <p>This method will automatically disconnect existing connection, if any.</p>
    *
    * @param connectionSpecification {String} a model-provider specific specification, instrumenting connection
    */
			connect: function connect(connectionSpecification) {},

			/**
    * Remove connection created by #connect(), if any
    */
			disconnect: function disconnect() {},

			// Validation

			/**
    * Add a validation to this component
    *
    * @param validatorType {String} name of a registered Qookery validator
    * @param invalidMessage {String?null} error message to use in case of validation failure, <code>null</code> for default one(s)
    * @param options {Map?null} validator specific options
    *
    * @return {any} an opaque handle that may be used to remove the validation in the future
    */
			addValidation: function addValidation(validatorType, invalidMessage, options) {},

			/**
    * Remove a validation from this component
    *
    * @param validation {Object} the value returned by a former call to #addValidation()
    */
			removeValidation: function removeValidation(validation) {},

			/**
    * Remove all validations from this component
    */
			removeAllValidations: function removeAllValidations() {}
		}
	});
	qookery.IEditableComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IEditableComponent.js.map?dt=1552484190880