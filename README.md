# Executive Summary

This is a client-side Javascript logging library that is a simple abstraction over the console logging capabilities. It has no dependencies, and is made available as a ES6 module.

# Features

1. Uses the javascript console for log output. Acts as a thin abstraction in this regard.

1. Supports multiple log levels that include DEBUG, INFO, WARN and ERROR. The default level is OFF.

1. Unlimited number of logger instances. Each logger has a unique name and can have a custom verbosity level of log output.

1. Zero dependencies and available only as a ES6 module. There is no planned support for CommonJS or AMD-based module systems. While this restricts the usage to newer versions of most browsers, it is also more standards compliant.

# Usage

## Integration

Since the library is made available as a ES6 module, you just need to have the following at the top of javascript code:

```javascript
import { Logger } from "./dax-logger.mod.js";
```

This assumes that the logger library resides in the same folder where you have other javascript sources. You can provide a different relative or absolute path as per the files/folder structure of your application.

You can now get a named logger from the global logger as shown below:

```javascript
var lgr = Logger.get("MyLogger");
```

Since the logger library is a ES6 module, it can only be accessed from within other javascript modules. In order to access the libary from a `script` block within HTML, you need to add the following to the head section of a HTML document:

```html
<head>
	<script type="module" src="dax-logger.js">
</head>
```

Thid assumes that `dax-logger.js` and `dax-logger.mod.js` are in the same folder as the HTML document. You can provide a different relative or absolute path as per the files/folder structure of your web site.

The global logger is made available to the HTML document as the `window.$Logger` variable. From within your script block, or non-modular javascript file, you can get a named logger as shown below:

```javascript
var lgr = $Logger.get("MyLogger");
```

## Logging Methods

The following logging methods are available for a named logger. Each method emits the corresponding message to the Javascript console at the corresponding level of severity.

```javascript
lgr.debug("this is a debug message");
lgr.info("this is an info message");
lgr.warn("this is a warn message");
lgr.error("this is an error message");
```

The logging methods are only available to named logger. You cannot use the global `Logger` or `$Logger` variable to emit log messages.

## Verbosity of Log Output

Too many log messages can be annoying. In that case, you can start assigning log levels to reduce the noise The valid log levels are DEBUG, INFO, WARN and ERROR in increasing order of severity. Setting the level to OFF prevents any log message from appearing on the console.

The global verbosity level is assigned to all named loggers that are already present. It also gets set as the default log level for all named loggers that are subsequently created.

You can specify a global verbosity level by setting a `dax-logger-level` attribute on the root element of the HTML document:

```HTML
<html dax-logger-level="WARN">
<head>
	<script type="module" src="dax-logger.js">
</head>
</html>
```

Within other Javascript modules, the global verbosity level can be set as follows:
```javascript
import { Logger } from "./dax-logger.mod.js";

Logger.setLevel(Logger.WARN);
```

For any other Javascript block, the instruction to set the global verbosity level is as follows:

```javascript
$Logger.setLevel(Logger.WARN);
```
