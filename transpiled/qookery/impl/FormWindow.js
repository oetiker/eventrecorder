(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.ui.window.Window": {
				"construct": true,
				"require": true
			},
			"qx.ui.layout.Grow": {
				"construct": true
			},
			"qx.xml.Document": {},
			"qookery.Qookery": {},
			"qx.lang.Object": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.impl.FormWindow", {

		extend: qx.ui.window.Window,

		/**
   * Create a new Qookery form window
   *
   * @param title { String } title of the window
   * @param icon { uri } icon of the window
   * @param options {Map ? null} options as defined below
   * @param thisArg {Object ? null} an object to set as <code>this</code> for callbacks
   *
   * @option caption {String ? null} a caption for the created Window instance
   * @option icon {String ? null} an icon for the created Window instance
   * @option onClose {Function ? null} a callback that will receive the form's result property when window is closed
   */
		construct: function construct(caption, icon, options, thisArg) {
			qx.ui.window.Window.constructor.call(this, caption, icon);
			this.setLayout(new qx.ui.layout.Grow());
			this.set({ modal: true, showMinimize: false, showMaximize: false, contentPadding: 10 });
			if (options) {
				if (options["icon"] !== undefined) this.setIcon(options["icon"]);
				if (options["caption"] !== undefined) this.setCaption(options["caption"]);
				if (options["allowClose"] !== undefined) this.setAllowClose(options["allowClose"]);
				if (options["onClose"] !== undefined) this.__onClose = options["onClose"].bind(thisArg);
				if (options["showMaximize"] !== undefined) this.setShowMaximize(options["showMaximize"]);
				if (options["contentPadding"] !== undefined) this.setContentPadding(options["contentPadding"]);
				if (options["openMaximized"] === true) this.maximize();
			}
		},

		members: {

			__formComponent: null,
			__disposeForm: false,
			__onClose: null,

			/**
    * Create and open Qookery window
    *
    * @param formXml {String} the XML source of the form to create
    * @param model {Object} an initial model to set, or <code>null</code> if not needed
    */
			createAndOpen: function createAndOpen(formXml, model, variables) {
				var xmlDocument = qx.xml.Document.fromString(formXml);
				var parser = qookery.Qookery.createFormParser(this.__createVariables(variables));
				try {
					this.__formComponent = parser.parseXmlDocument(xmlDocument);
					this.__disposeForm = true;
					this.openForm(this.__formComponent, model);
				} catch (e) {
					this.error("Error creating form window", e);
				} finally {
					parser.dispose();
				}
			},

			openForm: function openForm(formComponent, model) {
				this.__formComponent = formComponent;
				this.getContentElement().setAttribute("qkid", formComponent.getId());
				this.addListenerOnce("appear", function (event) {
					formComponent.focus();
				}, this);
				formComponent.addListenerOnce("close", function (event) {
					formComponent.setModel(null);
					if (this.__onClose) this.__onClose(event.getData());
					this.destroy();
				}, this);
				formComponent.addListener("changeTitle", function (event) {
					if (event.getData()) this.setCaption(event.getData());
				}, this);
				if (!this.getCaption()) {
					var formTitle = formComponent.getTitle();
					if (formTitle) this.setCaption(formTitle);else this.setCaption(this._getFallbackCaption());
				}
				var formIcon = formComponent.getIcon();
				if (formIcon && !this.getIcon()) this.setIcon(formIcon);
				if (model) formComponent.setModel(model);

				this.add(formComponent.getMainWidget());
				this.open();
				this.addListenerOnce("appear", function () {
					this.center();
				}, this);
			},

			getFormComponent: function getFormComponent() {
				return this.__formComponent;
			},

			_getFallbackCaption: function _getFallbackCaption() {
				// Override to provide a fallback caption
				return "";
			},

			_onCloseButtonTap: function _onCloseButtonTap(event) {
				this.__formComponent.close();
			},

			__createVariables: function __createVariables(variables) {
				variables = variables != null ? qx.lang.Object.clone(variables, false) : {};
				if (variables.hasOwnProperty("window")) throw new Error("Variable named 'window' is reserved");
				variables["window"] = this;
				return variables;
			}
		},

		destruct: function destruct() {
			if (this.__disposeForm) this._disposeObjects("__formComponent");else this.remove(this.__formComponent.getMainWidget());
		}
	});
	qookery.impl.FormWindow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FormWindow.js.map?dt=1552484191298