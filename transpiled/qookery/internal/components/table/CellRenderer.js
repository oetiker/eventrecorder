(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.ui.table.cellrenderer.Abstract": {
				"construct": true,
				"require": true
			},
			"qookery.Qookery": {
				"construct": true
			},
			"qx.lang.String": {
				"construct": true
			},
			"qx.bom.String": {},
			"qx.lang.Object": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.table.CellRenderer", {

		extend: qx.ui.table.cellrenderer.Abstract,

		statics: {

			CSS_KEYS: ["text-align", "color", "font-family", "font-size", "font-style", "font-weight", "line-height", "white-space"]
		},

		construct: function construct(component, column) {
			qx.ui.table.cellrenderer.Abstract.constructor.call(this);
			this.__column = column;
			this.__component = component;
			this.__format = column["format"] != null ? qookery.Qookery.getRegistry().createFormat(column["format"]) : null;
			this.__map = column["map"] != null ? qookery.Qookery.getRegistry().getMap(column["map"]) : null;
			var styleActionName = column["cell-renderer-callback"] || null;
			if (styleActionName != null && !component.isActionSupported(styleActionName)) throw new Error(qx.lang.String.format("Cell render callback '%1' is not supported by component '%2'", [styleActionName, component.toString()]));else this.__styleActionName = styleActionName;
		},

		members: {

			__column: null,
			__format: null,
			__map: null,
			__styleActionName: null,
			__component: null,

			_getContentHtml: function _getContentHtml(cellInfo) {
				var text = this._formatValue(cellInfo);
				return qx.bom.String.escape(text);
			},

			_formatValue: function _formatValue(cellInfo) {
				var value = cellInfo.value;
				if (value == null) return "";
				if (this.__format) try {
					value = this.__format.format(value);
				} catch (e) {
					this.warn("Error formatting cell value", e);
				}
				if (this.__map != null) {
					var mappedValue = this.__map[value];
					if (mappedValue != null) value = mappedValue;
				}
				var modelProvider = this.__component.getForm().getModelProvider();
				var label = modelProvider.getLabel(value, "short");
				return label != null ? label : "";
			},

			_getCellStyle: function _getCellStyle(cellInfo) {
				var column = this.__column;

				var style = qookery.internal.components.table.CellRenderer.CSS_KEYS.reduce(function (cellStyle, key) {
					var value = column[key];
					if (value != null) cellStyle[key] = value;
					return cellStyle;
				}, {});

				if (this.__styleActionName != null) {
					var result = this.__component.executeAction(this.__styleActionName, cellInfo);
					if (result != null) qx.lang.Object.mergeWith(style, result, true);
				}

				return qookery.internal.components.table.CellRenderer.CSS_KEYS.reduce(function (cellStyle, key) {
					var value = style[key];
					if (value != null) cellStyle += key + ":" + value + ";";
					return cellStyle;
				}, "");
			},

			getColumn: function getColumn() {
				return this.__column;
			}
		},

		destruct: function destruct() {
			this._disposeObjects("__format");
		}
	});
	qookery.internal.components.table.CellRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CellRenderer.js.map?dt=1552484192571