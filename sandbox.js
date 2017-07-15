// General Stuff
var number_literal = 10;
console.log("Number Literal: " + number_literal);

var complex_object = { kwas: 1, "kwaz": 2 }
console.log("Complex Object: " + complex_object);
console.log("Dot Access 1: " + complex_object.kwas);
console.log("Dot Access 2: " + complex_object.kwaz);
console.log("Array Access 1: " + complex_object["kwas"]);
console.log("Array Access 2: " + complex_object["kwaz"]);

console.log("Look ma a for loop");
for (key in complex_object) {
	console.log(key + ": " + complex_object[key]);
}

console.log("Not all properties are read in a for loop");
console.log(complex_object["constructor"]);

console.log("Neat scientific literal: " + 102e10)

console.log("I'm adding a field to all objects");
Object.prototype.hax = "hax";
console.log("Hack: " + complex_object.hax);

console.log(
	"String to number prefix operator: " + (+"123" + 1)
);

var my_array = [1, 2, 3];
my_array[4] = 5;
console.log("Use index incrementing to iterate over arrays");
for (i = 0; i < my_array.length; i += 1) {
	console.log(i + ": " + my_array[i]);
}

console.log("Dont use 'for in' to iterate over arrays");
for (x in my_array) {
	console.log(x + ": " + my_array[x]);
}

console.log("Truthy values are strange");
var condition = "" && "1";
console.log("EmptyString: " + condition);
condition = "" || "1";
console.log("NonEmptyString: " + condition);

console.log("A cool null check using &&");
var null_object = null;
console.log("Null: " + (null_object && null_object.field));
console.log("Nonnull: " + (complex_object && complex_object.kwas));
var undefined_object;
console.log("Undefined: " + (undefined_object && undefined_object.what));

console.log("Sneaky boolean conversion: " + !!1);

// Function Stuff
var return_one = function() {
	return 1;
};
var one = return_one();
console.log("One: " + one);

var poopy_constructor = function() {
	this.field = "wut";
}
var poopy = new poopy_constructor();
console.log("poopy: " + poopy.field);

var fail = poopy_constructor();
console.log("fail: " + fail);

// Closure Weirdness
var function_maker = function() {
	var y = 123;
	return function(x) {
		return y + x;
	}
};
console.log("Printing function_maker: " + function_maker);
console.log("Calling function_maker: " + function_maker());
console.log("Using function from function_maker: " + function_maker()(1));

var my_function = function_maker();
console.log("Calling my_function: " + my_function(2));

var closure = function() {
	var y = 123;
	console.log("I'm inside the function creation");
	return function(x) {
		console.log("I'm inside the function itself");
		return y + x;
	}
}(); // Note the immediate call on the anonymous function.
console.log("closure + 0: " + closure(0));
console.log("closure + 1: " + closure(1));

// Modules?
var module_creator = function(private_var) {
	// This is where you declare private stuff
	function getPrivate() {
		return private_var;
	}
	// Returning an object literal works here since there is no inheritance
	return {
		// This is where you declare public stuff
		plus: function(x) {
			return getPrivate() + x;
		},
		minus: function(x) {
			return getPrivate() - x;
		}
	};
};
var my_module = module_creator(1);
console.log("my_module.plus(1): " + my_module.plus(1));
console.log("my_module.minus(1): " + my_module.minus(1));

var extended_module_creator = function(private_var) {
	var that = module_creator(private_var + 1);
	// To extend a module, we need an instance of it.
	// I can't see how object literals can be used.
	that.multiply = function(x) {
		return private_var * x;
	};
	return that;
};
var extended_module = extended_module_creator(1);
console.log("extended_module.plus(1): " + extended_module.plus(1));
console.log("extended_module.minus(1): " + extended_module.minus(1));
console.log("extended_module.multiply(10): " + extended_module.multiply(10));
