(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Interface": {
				"usage": "dynamic",
				"require": true
			}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qookery.IFormParser", {

		members: {

			/**
    * Parse and generate a Qookery form
    *
    * @param xmlDocument {qx.xml.Document} input DOM XML document structured according to the form.xsd schema
    * @param parentComponent {qookery.IContainerComponent} an optional parent component that will hold generated results or <code>null</code>
    *
    * @return {qookery.IComponent} the root of the generated component hierarchy - typically a form component
    */
			parseXmlDocument: function parseXmlDocument(xmlDocument, parentComponent) {}
		}
	});
	qookery.IFormParser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IFormParser.js.map?dt=1552484190907