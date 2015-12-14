// Suppose IE 8+, Firefox 3.5+, Safari 3.1+, Chrome and Opera 10+
// 纯粹为了试验新学的东西的玩具豆空间~

(function(root) {

	var root = root || this || window;

	var prevar = root.tb;

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
	

	


})(this);
