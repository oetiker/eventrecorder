var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.core.Object": {
				"require": true
			},
			"qookery.IModelProvider": {
				"require": true
			},
			"qx.lang.Type": {},
			"qx.lang.Object": {},
			"qx.data.Conversion": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.impl.DefaultModelProvider", {

		type: "singleton",
		extend: qx.core.Object,
		implement: [qookery.IModelProvider],

		members: {

			identityOf: function identityOf(object) {
				return object != null ? object.toString() : null;
			},

			areEqual: function areEqual(object1, object2) {
				if (object1 instanceof Date && object2 instanceof Date) return object1.getTime() === object2.getTime();
				var id1 = this.identityOf(object1),
				    id2 = this.identityOf(object2);
				if (id1 !== undefined && id2 !== undefined) {
					if (qx.lang.Type.isArray(id1) && qx.lang.Type.isArray(id2)) return qx.lang.Object.equals(id1, id2);
					return id1 == id2;
				}
				return object1 === object2;
			},

			compare: function compare(object1, object2) {
				if (object1 === object2) return 0;
				if (object1 == null) return -1;
				if (object2 == null) return 1;
				var type1 = typeof object1 === "undefined" ? "undefined" : _typeof(object1);
				var type2 = typeof object2 === "undefined" ? "undefined" : _typeof(object2);
				if (type1 !== type2) throw new Error("Unable to compare objects of different type");
				if (type1 === "string") return object1 == object2 ? 0 : object1 > object2 ? 1 : -1;
				if (type1 === "number") return object1 - object2;
				if (type1 === "boolean") return object1 ? 1 : -1;
				if (object1 instanceof Date && object2 instanceof Date) return object1.getTime() - object2.getTime();
				throw new Error("Unsupported object types for comparison");
			},

			convertFrom: function convertFrom(value, className) {
				// No conversion performed by default
				return value;
			},

			convertTo: function convertTo(object, className) {
				// No conversion performed by default
				return object;
			},

			getLabel: function getLabel(object, labelType) {
				if (qx.lang.Type.isString(object)) return object;
				return qx.data.Conversion.toString(object);
			},

			connectComponent: function connectComponent(component, connectionSpecification) {
				// The default model provider expects a Qooxdoo property path in the specification argument
				return component.getForm().addConnection(component, connectionSpecification);
			},

			clone: function clone(object) {
				return object; // Not supported by this model provider
			}
		}
	});
	qookery.impl.DefaultModelProvider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DefaultModelProvider.js.map?dt=1552484191143