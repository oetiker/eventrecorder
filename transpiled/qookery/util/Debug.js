(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.dev.StackTrace": {},
			"qx.log.Logger": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.util.Debug", {

		type: "static",

		statics: {

			/**
    * Attempt to log a warning about an error that occurred inside a script
    *
    * <p>Implementation is browser-specific and can be improved to handle more browsers</p>
    *
    * @param object {any} an object that is the context of the log message
    * @param sourceCode {String} the script's source code
    * @param error {Error} exception thrown while running script
    * @return {undefined}
    */
			logScriptError: function logScriptError(object, sourceCode, error) {
				var stackTraceLines = qx.dev.StackTrace.getStackTraceFromError(error);
				if (stackTraceLines == null) return;
				var lineNumber = null,
				    match;
				for (var i = 0; i < stackTraceLines.length; i++) {
					var stackTraceLine = stackTraceLines[i];
					match = stackTraceLine.match(/<anonymous>:([\d]+):([\d+])/);
					if (match == null) continue;
					lineNumber = parseInt(match[1]);
					break;
				}
				if (lineNumber == null) return;
				var startIndex = 0;
				for (var i = 3; i < lineNumber; i++) {
					var newLineIndex = sourceCode.indexOf("\n", startIndex);
					if (newLineIndex === -1) break;
					startIndex = newLineIndex + 1;
				}
				qx.log.Logger.warn(object, "Script error at line", match[1], ":", error["message"], "\n\n", sourceCode.substr(startIndex, 250));
			}
		}
	});
	qookery.util.Debug.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Debug.js.map?dt=1552484192783