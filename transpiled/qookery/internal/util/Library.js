(function () {
	var $$dbClassInfo = {
		"dependsOn": {
			"qx.Class": {
				"usage": "dynamic",
				"require": true
			},
			"qx.core.MLogging": {
				"require": true
			},
			"qookery.Qookery": {},
			"qx.lang.String": {},
			"qx.bom.request.Script": {},
			"qx.util.TimerManager": {}
		}
	};
	qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qookery.internal.util.Library", {

		extend: Object,
		include: [qx.core.MLogging],

		construct: function construct(name, resourceNames, dependencies, postLoadCallback) {
			this.__name = name;
			this.__resourceNames = resourceNames;
			this.__dependencies = dependencies;
			this.__isLoaded = false;
			this.__continuations = [];
			this.__postLoadCallback = postLoadCallback;
		},

		members: {

			__name: null,
			__resourceNames: null,
			__dependencies: null,
			__isLoaded: null,
			__continuations: null,
			__postLoadCallback: null,

			getName: function getName() {
				return this.__name;
			},

			addResource: function addResource(resourceName) {
				if (this.__isLoaded) throw new Error("Adding resource URIs to an already loaded library is not possible");
				this.__resourceNames.push(resourceName);
			},

			isLoaded: function isLoaded() {
				return this.__isLoaded;
			},

			load: function load(continuation, thisArg) {
				// If loaded, just call the continuation
				if (this.__isLoaded) {
					continuation.call(thisArg, null);
					return;
				}

				// Push continuation to the queue
				this.__continuations.push(continuation.bind(thisArg));

				// If not the first continuation, return since loading has been already started
				var isLoading = this.__continuations.length !== 1;
				if (isLoading) return;

				// Start the library loading
				this.__loadLibrary();
			},

			__loadLibrary: function __loadLibrary() {
				// In case there are dependencies, load them
				if (this.__dependencies != null && this.__dependencies.length > 0) return this.__loadNextDependency();

				// In case there are needed resources, load them
				if (this.__resourceNames != null && this.__resourceNames.length > 0) return this.__loadNextResource();

				// Invoke the post-load continuation, if set
				if (this.__postLoadCallback != null) try {
					var finished = this.__postLoadCallback(this.__onLibraryLoaded.bind(this));
					if (finished === false)
						// Callback requested to take over library loading sequence
						return;
				} catch (error) {
					this.__invokeContinuations(error);
					return;
				}

				this.__onLibraryLoaded();
			},

			__onLibraryLoaded: function __onLibraryLoaded() {
				// We are done loading, mark our success
				this.__isLoaded = true;
				this.debug("Loaded", this.__name);

				// Invoke any waiting callbacks
				this.__invokeContinuations(null);
			},

			__loadNextDependency: function __loadNextDependency() {
				var libraryName = this.__dependencies.shift();
				qookery.Qookery.getRegistry().loadLibrary(libraryName, function (error) {
					if (error != null) {
						this.__invokeContinuations(error);
						return;
					}
					this.__loadLibrary();
				}, this);
			},

			__loadNextResource: function __loadNextResource() {
				var resourceSpecification = this.__resourceNames.shift();
				// Create the request
				var resourceName = resourceSpecification,
				    resourceType = null;
				var atSignPosition = resourceSpecification.indexOf("@");
				if (atSignPosition !== -1 && atSignPosition <= 3) {
					resourceType = resourceSpecification.substring(0, atSignPosition);
					resourceName = resourceSpecification.substring(atSignPosition + 1);
				} else if (qx.lang.String.endsWith(resourceName, ".js")) {
					resourceType = "js";
				} else if (qx.lang.String.endsWith(resourceName, ".css")) {
					resourceType = "css";
				}
				resourceName = resourceName.replace(/\$\{([\w:-]*)\}/g, function (match, optionName) {
					return qookery.Qookery.getOption(optionName);
				});

				var resourceLoader = qookery.Qookery.getService("qookery.IResourceLoader", true);
				var resourceUri = resourceLoader.resolveResourceUri(resourceName);

				switch (resourceType) {
					case "js":
						var scriptRequest = new qx.bom.request.Script();
						scriptRequest.onload = this.__loadLibrary.bind(this);
						scriptRequest.onerror = function () {
							this.__resourceNames.unshift(resourceSpecification);
							this.__invokeContinuations(new Error("Error loading '" + resourceName + "'"));
						}.bind(this);
						scriptRequest.open("GET", resourceUri);
						scriptRequest.send();
						break;
					case "css":
						// Create a new link element and initialize it
						var linkElement = document.createElement("link");
						linkElement.type = "text/css";
						linkElement.rel = "stylesheet";
						linkElement.href = resourceUri;
						// Retrieve the HEAD element
						var headElement = document.getElementsByTagName("head")[0];
						// Begin loading the stylesheet
						qx.util.TimerManager.getInstance().start(function () {
							headElement.appendChild(linkElement);
							this.__loadLibrary();
						}, null, this);
						break;
					default:
						throw new Error("Library uses unsupported resource type");
				}
			},

			__invokeContinuations: function __invokeContinuations(error) {
				this.__continuations.forEach(function (continuation) {
					continuation(error);
				});
				this.__continuations = [];
			}
		}
	});
	qookery.internal.util.Library.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Library.js.map?dt=1552484192715