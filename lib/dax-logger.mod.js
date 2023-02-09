var Logger = new function() {

	this.OFF = 0;
	this.ERROR = 1;
	this.WARN = 2;
	this.INFO = 3;
	this.DEBUG = 4;

	var level = this.OFF;
	var allLoggers = {};

	const root = document.documentElement;
	if(root.hasAttribute("dax-logger-level")) {
		let lvl = root.getAttribute("dax-logger-level").toLowerCase();
		if(lvl === "error") {
			level = this.ERROR;
		}
		else if(lvl === "warn") {
			level = this.WARN;
		}
		else if(lvl === "info") {
			level = this.INFO;
		}
		else if(lvl === "debug") {
			level = this.DEBUG;
		}
		else {
			level = this.OFF;
		}
	}

	this.setLevel = function(value) {
		level = value;
		for(const ctxtStr in allLoggers) {
			allLoggers[ctxtStr].setLevel(level);
		}
	}

	this.get = function(context) {
		if(context) {
			var ctxtStr = context.toString();
			if(allLoggers[ctxtStr]) {
				return allLoggers[ctxtStr];
			}
			else {
				var lgr = new ContextualLogger(context);
				lgr.setLevel(level);
				allLoggers[ctxtStr] = lgr;
				return lgr;
			}
		}
		return null;
	}
};

var ContextualLogger = function(context) {
	var ctxtStr = "[huh?]"
	if(context) {
		ctxtStr = "[" + context.toString() + "]";
	}

	this.setLevel = function(level) {
		if(level >= Logger.DEBUG) {
			this.debug = console.debug.bind(window.console, ctxtStr);
		}
		else {
			this.debug = function() {}
		}

		if(level >= Logger.INFO) {
			this.info = console.info.bind(window.console, ctxtStr);
		}
		else {
			this.info = function() {}
		}

		if(level >= Logger.WARN) {
			this.warn = console.warn.bind(window.console, ctxtStr);
		}
		else {
			this.warn = function() {}
		}

		if(level >= Logger.ERROR) {
			this.error = console.error.bind(window.console, ctxtStr);
		}
		else {
			this.error = function() {}
		}
	}
}

export { Logger };