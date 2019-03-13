(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qookery.internal.components.AbstractSelectBoxComponent": {
				"construct": true,
				"require": true
			},
			"qx.ui.form.SelectBox": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.components.SelectBoxComponent", {

		extend: qookery.internal.components.AbstractSelectBoxComponent,

		construct: function construct(parentComponent) {
			qookery.internal.components.AbstractSelectBoxComponent.constructor.call(this, parentComponent);
		},

		members: {

			_createMainWidget: function _createMainWidget() {
				var selectBox = new qx.ui.form.SelectBox();
				selectBox.setFormat(this.__getListItemLabel.bind(this));
				selectBox.addListener("changeSelection", function (event) {
					if (this._disableValueEvents) return;
					var newSelection = event.getData()[0];
					var model = newSelection ? newSelection.getModel() : null;
					if (model === qookery.internal.components.AbstractSelectBoxComponent._NULL_ITEM_MODEL) model = null;
					this.setValue(model);
				}, this);
				selectBox.addListener("keypress", function (event) {
					if (event.isShiftPressed() || event.isAltPressed() || event.isCtrlPressed()) return;
					switch (event.getKeyIdentifier()) {
						case "Delete":
						case "Backspace":
							this.setValue(null);
							event.preventDefault();
							return;
					}
				}, this);
				this._applySelectBoxAttributes(selectBox);
				return selectBox;
			},

			__getListItemLabel: function __getListItemLabel(listItem) {
				if (listItem == null) return "";
				return listItem.getLabel();
			},

			_updateUI: function _updateUI(value) {
				if (value == null) value = qookery.internal.components.AbstractSelectBoxComponent._NULL_ITEM_MODEL;
				var matchingItem = null;
				var selectBox = this.getMainWidget();
				var listItems = selectBox.getChildren();
				var modelProvider = this.getForm().getModelProvider();
				for (var i = 0; i < listItems.length; i++) {
					var listItem = listItems[i];
					var item = listItem.getModel();
					if (!modelProvider.areEqual(item, value)) continue;
					matchingItem = listItem;
					break;
				}
				var showingPlaceholder = true;
				if (matchingItem != null) {
					selectBox.setSelection([matchingItem]);
					showingPlaceholder = value === qookery.internal.components.AbstractSelectBoxComponent._NULL_ITEM_MODEL;
				} else {
					selectBox.resetSelection();
				}
				if (showingPlaceholder && this.getRequired()) selectBox.addState("showingPlaceholder");else selectBox.removeState("showingPlaceholder");
			},

			setSelection: function setSelection(itemNumber) {
				var selectablesItems = this.getMainWidget().getSelectables(true);
				if (!selectablesItems || selectablesItems[itemNumber] === undefined) return;
				this.getMainWidget().setSelection([selectablesItems[itemNumber]]);
			}
		}
	});
	qookery.internal.components.SelectBoxComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SelectBoxComponent.js.map?dt=1552484192326