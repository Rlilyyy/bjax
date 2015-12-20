// Suppose IE 8+, Firefox 3.5+, Safari 3.1+, Chrome and Opera 10+
// 纯粹为了试验新学的东西的玩具豆空间~

(function(root) {

	var root = root || this || window;

	var prevar = root.tb;

	var addEventbean = addEventListener || attachEvent;
	var removeEventbean = removeEventListener || detachEvent;

	var tb = function(toy) {
		switch(toy) {
			case "selector":
				return tb.sel;
				break;
			default:
				console.log("not suppose");
		}
	};

	root.tb = tb;
	tb.version = "alpha 1.0";

	tb.sel = function(parent, sel) {
		if(!sel) {
			sel = parent;
			return document.querySelector(sel);
		}else {
			return parent.querySelector(sel);
		}
	}

	tb.reinit = function() {
		root.tb = prevar;

		return tb;
	}
	
	// attachEvent的this指针是window，等待兼容
	// tb.addEventToy(events, func, capturing) {
	// 	if(addEventbean === attachEvent) {
	// 		events = "on" + events;
	// 	}
	// 	addEventbean(events, func, capturing);
	// }

	// tb.removeEventToy(events, func) {
	// 	if(addEventbean === attachEvent) {
	// 		events = "on" + events;
	// 	}
	// 	removeEventToy(events, func);
	// }
	tb.addHandler = function(elem, type, func) {
		if(elem.addEventListener) {
			elem.addEventListener(type, func, false);
		} else if(elem.attachEvent) {
			elem.attachEvent("on" + type, func);
		} else {
			elem["on" + type] = func;
		}
	}

	tb.removeHandler = function(elem, type, func) {
		if(elem.removeEventListener) {
			elem.removeEventListener(type, func);
		} else if(elem.detachEvent) {
			elem.detachEvent("on" + type, func);
		} else {
			elem["on" + type] = null;
		}
	}


})(this);
