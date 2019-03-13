(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.util.format.DateFormat": {
				"construct": true,
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.formats.DateFormat", {

		extend: qx.util.format.DateFormat,

		construct: function construct(options) {
			qx.util.format.DateFormat.constructor.call(this, options["format"], options["locale"]);
		}
	});
	qookery.internal.formats.DateFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DateFormat.js.map?dt=1552484192584