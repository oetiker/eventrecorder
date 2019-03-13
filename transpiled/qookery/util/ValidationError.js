(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.util.ValidationError", {

		extend: Error,

		/**
   * Construct a new validation error
   *
   * @param source {any} value that represents the source of error
   * @param message {String?} error message
   * @param cause {Array?} array of underlying errors
   */
		construct: function construct(source, message, cause) {
			this.__source = source;
			this.__message = message;
			this.__cause = cause;
			Object.defineProperties(this, {
				"message": {
					enumerable: false,
					get: function get() {
						return this.getFormattedMessage();
					}
				}
			});
		},

		members: {

			__source: null,
			__message: null,
			__cause: null,

			/**
    * Return the source of this error, if available
    *
    * @return {any} value that represents the source of error, may be <code>null</code>
    */
			getSource: function getSource() {
				return this.__source;
			},

			/**
    * Return a message for this error
    *
    * @return {String} error message, may be <code>null</code>
    */
			getMessage: function getMessage() {
				return this.__message;
			},

			/**
    * Return an array of errors that are the underlying cause of this error
    *
    * @return {Array} array of underlying errors or <code>null</code> if not set
    */
			getCause: function getCause() {
				return this.__cause;
			},

			/**
    * Return the computed formatted message which describes this error is more detail
    *
    * @return {String} an error message, <code>null</code> is never returned
    */
			getFormattedMessage: function getFormattedMessage() {
				var message = this.__message || "";
				if (this.__cause != null) {
					if (message) message += ": ";
					message += this.__cause.map(function (cause) {
						return cause.getFormattedMessage();
					}).join("; ");
				}
				if (!message) message = "Nondescript error";
				return message;
			}
		}
	});
	qookery.util.ValidationError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ValidationError.js.map?dt=1552484192791