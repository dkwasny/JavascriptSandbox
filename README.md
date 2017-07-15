Javascript Sandbox
==================
Theses are just the rambling notes I have been taking as I'm working through a video series for "Javascript: The Good Parts".

General Notes
-------------
* Use Jslint to trust in the author's style
	* eslint seems like a newer better linter.

* Do not use with()
	* Too confusing...maybe use it for fun in a one off program.

* Never use ==, only use ===
	* == tries to be smart across types...which can be confusing.
	* === is refence equality...I wonder how to sanely do value equality?

* Multi string literals force your code's indentation to look poo.
	* It's easy to introduce syntax errors as well.

* The interpreter will move all var initializations to the top of the function.
	* This means using vars within a block actually gives the entire function visibility to the variable.
	* Try to create vars at the top of a function.
	* This includes `for` loop variables.

* Be on the lookout for the `let` statement.
	* It respects block scope, but is only supported on modern browsers.
	* Not sure if it's released yet...probably is.

* Declare functions before calling them.

* Forgetting `new` can mess with global variables.
	* Try to just not use globals...


* Not including `var` makes a variable global?

* Try to not declare/initatlize multiple variables on one line.
	* If you need to, make sure to separate every variable with a comma.

* The dude is not a fan of ++.
	* I'm more than happy to use x += 1 in Javascript.

* Don't try to be cute with not adding curly braces.

* Creating functions within loops is weird.
	* It's confusing, but possible...try to stay away.

Language Notes
--------------
* Objects properties are dynamic.
	* Doesn't sound like class specifications are a thing.
	* You can `delete` properties off of an object.
	* Think of all objects being a map from string to something.
	* You can access properties one of two ways.
		* Typical dot access pattern (kwas.poo).
		* An array like access (kwas["poo"]).
			* I'm guessing there's all kinds of crazy stuff you can do inside the square brackes here.
	* The lack of a class spec means you got to be careful with "implicit" properties.
		* object.constructor

* Object literals are great...pretty much literally JSON.
	* There is a newer way that gives way more control at the cost of verbosity (the Object object?).

* Prototypes
	* An object's prototype is a "god" object that can contain methods for all derived objects.
	* Each object has a "prototype" property that you can edit.
		* This causes all objects based on that object's prototype to get the changes.
		* The prototype is like a "god instance" of the object.
		* Any instances and derived objects are based on the prototype.
		* This allows for powerful, and dangerous, actions.
			* Libraries can just extend base prototypes instad of creating their own (no need for Guava's Collections2).
			* God help you if you use code that extends the base class, but doesnt say what dependency adds those extensions.
	* Do all the typical thing, like inheritance, using object instances instead of declared classes.
	* Is this why I see `var bla = require("something")` as the way to "import" things?
	* You can apparently inherit from `null` in later ES versions to remove any implicit properties.

* Iterating over an object iterates over everything.
	* Since functions and objects are the same...you will iterate over an objects child objects AND fucntions.
	* I'm not sure if iterating will get all parent object properties as well.

* Only one `Number` type
	* It's a double
	* No integer
	* Many different fun number literal notations.
	* Number equality gets funky after 9 quadrillion (more like x number of decimal places I guess).
	* Like Java, you can't blindly compare doubles...gotta use deltas.

* You can `for` loop over an object, but it only returns the "enumerable" properties.
	* This means you wont see `Object.prototype` in the iteration.

* Addition can add or concatenate.
	* Watch out for concatenating when you want to add.

* parseInt tries to be smart.
	* Attempts to parse as octal when a leading 0 is found.
	* Use radix 10 to be explicit.

* Arrays
	* Arrays are an object that uses the indicies as the key.
	* A map from index to value.
	* Not memory efficient at all.
	* No need to know the size ahead of time since its pretty much a map.
	* This means its wise to not use `for in` to iterate over an array.
		* Use the old school index incrementing approach.
		* This will prevent other non index properties from sneaking into your iteration.
	* `Array.sort()` will by default do string comparison.
		* Need to pass in a custom comparator if you want to sort by numbers.
	* Need to use `splice()` if you want to remove and shift elements to the left.


* Truthy/Falsey values
	* All objects can resolve to `true` or `false`.
	* There are a strict set of falsey values and everything else is truthy.
	* This can be used with logical operators (e.g. `&&` and `||`) to return the "value" instead of its truthiness.
		* This can make the return value of the operators more useful, while still retaining their boolean functionality.
		* This is a sneaky way to do null checks too since null is falsey.
	* You can convert a value to its truthiness represntation by negating a not operator (e.g. !!1 === true).

* Bitshifting
	* It exists...but all numbers are doubles?
	* The double gets converted to a 32 bit signed integer, shifted, then converted back to a double.
	* Why would you ever do this?  It sounds worse than just doing normal arithmetic.

* try/catch
	* A try can only have one catch block.
	* A catch block catches everything.
	* Need to rethrow if you only want to catch certain exceptions.
	* Can throw anything, but you might want to use the Error object for consistency.

Functions
---------
* Functions are first class citizen objects.

* You can assign functions to variables.

* You can also just declare functions.
	* This effectively creates a variable that has the same name of the function which points to the function.

* JS does not error out when you pass too many/few arguements to a function.

* The `new` operator causes a function to get a new object set to its `this` value.
	* The new object is then returned.
	* This is how you make constructors.

* The `this` value changes depending on how you invoke a function.

* Closures
	* These are a way to have a function declare some state, and then return a function that uses said state.
	* It allows you to have some initalization that only gets called once while returning the inner function for further invocation.
	* The inner function can reference variables within the outer function and even modify them.
