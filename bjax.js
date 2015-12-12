;(function() {

	// Get the global
	var root = this || window;

	// Save the previous value of the `bjax` variable.
	var prevariable = root.bjax;

	var push = Array.prototype.push;

	var bjax = function(copy) {
		this.copy = copy;
	};

	// Set the global variable
	root.bjax = bjax;

	// VERSION
	bjax.version = "1.1";

	// To set the url
	bjax.setURL = function(copy, url) {
		if(typeof url === "string")
			copy["url"] = url;
		else
			copy["url"] = "";
	};

	// Types which is "GET" and "POST" can be choosed
	// The default is "GET"
	bjax.setType = function(copy, type) {
		if(typeof type === "string")
			copy["type"] = type;
		else
			copy["type"] = "GET";
	};

	// Set asynchronous or not
	bjax.setAsync = function(copy, isAsync) {

		isAsync == true?

			copy.async = true :

			copy.async = false;
	};

	// Set up the data to send
	bjax.setData = function(copy, data) {
		if(!!data) {
			copy.data = data;
		}else {
			copy.data = "";
		}
	};

	// The callback function when successful
	bjax.success = function(copy, func) {
		if(isFunction(func)) {
			copy.success = func;
		}else {
			copy.success = null;
		}
	};

	// The callback function when failed
	bjax.error = function(copy, func) {
		if(isFunction(func)) {
			copy.failed = func;
		}else {
			copy.failed = null;
		}
	};

	// Start bjax
	bjax.start = function(copy) {
		var xmlHttp = null;

		if (window.XMLHttpRequest) {
			// code for IE7, Firefox, Opera, etc.
			xmlHttp=new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// code for IE6, IE5
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}

		if (xmlHttp != null) {
			// It is not recommended to use false 
			xmlHttp.onreadystatechange = function() {
				if(this.readyState == 4) {
					var result = this.responseText;
					if(!!copy.success)
						copy.success(result);
				}else {
					var result = this.responseText;
					if(!!copy.failed)
						copy.failed(this.readyState, result);
				}
			};

			xmlHttp.open(copy.type, copy.url, copy.async);
			xmlHttp.send(copy.data);

		} else {
			throw new Error("Your browser does not support XMLHTTP.");
		}
	};

	// Do anything
	bjax.tab = function(copy, func, doData) {

		if(!!!doData && typeof func != "function") {
			doData = func;
			func = copy;
			copy = null;
		}

		if(func === console.log) {
			func = func.bind(console);
		}

		if(!!copy && !!!doData && doData !== "")
			func.call(root, copy);
		else
			func.call(root, doData);
	};

	// Use chain call
	bjax.chain = function(obj) {
		var obj = obj?obj:{};
		return new bjax(obj);
	};

	bjax.printAllFunc = function(obj) {
		if(obj == null)
			return getAllFuncName(bjax);
		else
			return getAllFuncName(obj);
	};


	var isFunction = function(func) {
		return typeof func === "function" || false;
	};

	var getAllFuncName = function(root) {
		var names = [];

		for(var key in root)
			if(isFunction(root[key]))
				names.push(key);

		return names.sort();
	};

	var initPrototype = function() {
		var names = getAllFuncName(root.bjax);

		var getFunc = function(key) {
			return function() {
				var func = bjax[names[key]];
				var args = [this.copy];
				push.apply(args, arguments);
				func.apply(bjax, args);
				return new bjax(this.copy);
			};
		};

		for(var idx = 0;idx < names.length;idx++) {
			root.bjax.prototype[names[idx]] = getFunc(idx);
		}
	};

	initPrototype();

})();