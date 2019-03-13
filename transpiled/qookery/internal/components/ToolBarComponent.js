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
			"qookery.IContainerComponent": {
				"require": true
			},
			"qx.util.StringSplit": {},
			"qx.ui.toolbar.ToolBar": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.ToolBarComponent", {

		extend: qookery.internal.components.Component,
		implement: [qookery.IContainerComponent],

		construct: function construct(parentComponent) {
			qookery.internal.components.Component.constructor.call(this, parentComponent);
			this.__children = [];
			this.__flexes = [];
		},

		members: {

			__children: null,
			__toolbar: null,
			__flexes: null,

			create: function create(attributes) {
				qookery.internal.components.ToolBarComponent.prototype.create.base.call(this, attributes);
				this.__toolbar = this.getMainWidget();
				this._applyAttribute("column-flexes", this, function (flexes) {
					qx.util.StringSplit.split(flexes, /\s+/).forEach(function (columnFlex) {
						this.__flexes.push(parseInt(columnFlex, 10));
					}, this);
				});
			},

			_createWidgets: function _createWidgets() {
				var toolBar = new qx.ui.toolbar.ToolBar();
				this._applyAttribute("spacing", toolBar, "spacing");
				this._applyWidgetAttributes(toolBar);
				return [toolBar];
			},

			listChildren: function listChildren() {
				return this.__children;
			},

			add: function add(childComponent) {
				var index = this.__children.length;
				this.__children.push(childComponent);
				var part = childComponent.getMainWidget();
				var flex = this.__flexes[index];
				this.__toolbar.add(part, flex !== undefined ? { flex: flex } : null);
			},

			remove: function remove(component) {
				// TODO ToolBar: Implement removal of children
			},

			contains: function contains(component) {
				// TODO ToolBar: Implement contains()
			}
		}
	});
	qookery.internal.components.ToolBarComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToolBarComponent.js.map?dt=1552484192536