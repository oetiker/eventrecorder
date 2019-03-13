(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Bootstrap": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.Qookery": {
				"defer": "runtime"
			},
			"qookery.ace.internal.AceComponent": {
				"defer": "runtime"
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qookery.ace.Bootstrap", {

		defer: function defer() {
			qookery.Qookery.getRegistry().registerLibrary("ace", ["${q:external-libraries}/ace/ace.js"]);
			qookery.Qookery.getRegistry().registerLibrary("aceLanguageTools", ["${q:external-libraries}/ace/ext-language_tools.js"]);
			qookery.Qookery.getRegistry().registerComponentType("{http://www.qookery.org/ns/Form/Ace}editor", qookery.ace.internal.AceComponent);
		}
	});
	qookery.ace.Bootstrap.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Bootstrap.js.map?dt=1552484191022