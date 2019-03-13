(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.ContainerComponent": {
				"construct": true,
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.SectionComponent", {

		extend: qookery.internal.components.ContainerComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.ContainerComponent.constructor.call(this, parentComponent);
		}
	});
	qookery.internal.components.SectionComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SectionComponent.js.map?dt=1552484192310