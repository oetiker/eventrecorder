(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.Component": {
				"construct": true,
				"require": true
			},
			"qx.ui.embed.Html": {},
			"qx.xml.Element": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.HtmlComponent", {

		extend: qookery.internal.components.Component,

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
		},

		members: {

			_createWidgets: function _createWidgets() {
				var html = new qx.ui.embed.Html(this.getAttribute("html", null));
				this._applyAttribute("overflow-x", html, "overflowX");
				this._applyAttribute("overflow-y", html, "overflowY");
				this._applyAttribute("css-class", html, "cssClass");
				this._applyWidgetAttributes(html);
				return [html];
			},

			parseXmlElement: function parseXmlElement(elementName, xmlElement) {
				if (elementName.indexOf("{http://www.w3.org/1999/xhtml}") !== 0) return false;
				var html = qx.xml.Element.serialize(xmlElement);
				this.setHtml(html);
				return true;
			},

			getHtml: function getHtml() {
				return this.getMainWidget().getHtml();
			},

			setHtml: function setHtml(html) {
				this.getMainWidget().setHtml(html);
			},

			getDomElement: function getDomElement() {
				return this.getMainWidget().getContentElement().getDomElement();
			},

			updateAppearance: function updateAppearance() {
				this.getMainWidget().updateAppearance();
			}
		}
	});
	qookery.internal.components.HtmlComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HtmlComponent.js.map?dt=1552484192154