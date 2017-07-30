// General Stuff
let number_literal = 10;
console.log("Number Literal: " + number_literal);

let complex_object = { kwas: 1, "kwaz": 2 }
console.log("Complex Object: " + complex_object);
console.log("Dot Access 1: " + complex_object.kwas);
console.log("Dot Access 2: " + complex_object.kwaz);
console.log("Array Access 1: " + complex_object["kwas"]);
console.log("Array Access 2: " + complex_object["kwaz"]);

console.log("Look ma a for loop");
for (let key in complex_object) {
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

let my_array = [1, 2, 3];
my_array[4] = 5;
console.log("Use index incrementing to iterate over arrays");
for (let i = 0; i < my_array.length; i += 1) {
	console.log(i + ": " + my_array[i]);
}

console.log("Dont use 'for in' to iterate over arrays");
for (let x in my_array) {
	console.log(x + ": " + my_array[x]);
}

console.log("Truthy values are strange");
let condition = "" && "1";
console.log("EmptyString: " + condition);
condition = "" || "1";
console.log("NonEmptyString: " + condition);

console.log("A cool null check using &&");
let null_object = null;
console.log("Null: " + (null_object && null_object.field));
console.log("Nonnull: " + (complex_object && complex_object.kwas));
let undefined_object;
console.log("Undefined: " + (undefined_object && undefined_object.what));

console.log("Sneaky boolean conversion: " + !!1);

// Function Stuff
let return_one = function() {
	return 1;
};
let one = return_one();
console.log("One: " + one);

let poopy_constructor = function() {
	this.field = "wut";
}
let poopy = new poopy_constructor();
console.log("poopy: " + poopy.field);

let fail = poopy_constructor();
console.log("fail: " + fail);

// Closure Weirdness
let function_maker = function() {
	let y = 123;
	return function(x) {
		return y + x;
	}
};
console.log("Printing function_maker: " + function_maker);
console.log("Calling function_maker: " + function_maker());
console.log("Using function from function_maker: " + function_maker()(1));

let my_function = function_maker();
console.log("Calling my_function: " + my_function(2));

let closure = function() {
	let y = 123;
	console.log("I'm inside the function creation");
	return function(x) {
		console.log("I'm inside the function itself");
		return y + x;
	}
}(); // Note the immediate call on the anonymous function.
console.log("closure + 0: " + closure(0));
console.log("closure + 1: " + closure(1));

// Modules?
let module_creator = function(private_var) {
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
let my_module = module_creator(1);
console.log("my_module.plus(1): " + my_module.plus(1));
console.log("my_module.minus(1): " + my_module.minus(1));

let extended_module_creator = function(private_var) {
	let that = module_creator(private_var + 1);
	// To extend a module, we need an instance of it.
	// I can't see how object literals can be used.
	that.multiply = function(x) {
		return private_var * x;
	};
	return that;
};
let extended_module = extended_module_creator(1);
console.log("extended_module.plus(1): " + extended_module.plus(1));
console.log("extended_module.minus(1): " + extended_module.minus(1));
console.log("extended_module.multiply(10): " + extended_module.multiply(10));

// ES6 BOYEEE!!

const DEFAULT = "Default";

console.log("Default parameters");
let defaultThing = function(data=DEFAULT) {
	console.log(data);
};
defaultThing();
defaultThing("Not Default");

console.log("Arrow Functions");
let arrowFunction = x => x + 1;
console.log(arrowFunction(1));

let complexArrowFunction = (x, y) => x * y;
console.log(complexArrowFunction(5, 2));

let anotherArrowFunction = (x, y) => { let tmp = x * y; return tmp + x; };
console.log(anotherArrowFunction(5, 2));

// Need at least parenthesis to use "rest"
console.log("Rest parameter");
let restArgs = (...x) => console.log(x);
restArgs(1, 2, 3, 4, 5);

console.log("Spread variable");
let myArray = [1, 2, 3];
let threeArgFunction = (x, y, z) => x * y * z;
console.log(threeArgFunction(...myArray));

console.log("Classes");
class KwasClass {
	constructor(value) {
		this.value = value;
	}
	append(other) {
		this.value += other
	}
	// Property methods like this are useless.
	// Everything is public.
	getValue() {
		return this.value;
	}
};
let kwas = new KwasClass("first");
kwas.append(":second");
console.log(kwas.getValue());
console.log(kwas.value);

console.log("Inheritance");
class KwasInheritance extends KwasClass {
	constructor(value) {
		super("Kwas: " + value);
	}
}
let kwasInheritance = new KwasInheritance("value");
kwasInheritance.append(", poo");
console.log(kwasInheritance.value);

console.log("Maps");
let myMap = new Map();
myMap.set(1, 2);
console.log(myMap.get(1));

console.log("Destructuring");
let desArray = [1, 2, 3];
let [desOne,,desThree] = myArray;
console.log(desOne + ", " + desThree);

let desObject = { a: 1, b: 2 };
let {a: desA, b: desB, c: desC="defaultValue"} = desObject;
console.log(desA + ", " + desB + ", " + desC);

console.log(`This is a
multiline string`);

let something = "Boo!"
console.log(`I'mma go ${something}`);

console.log("Symbols");
let symbolOne = Symbol("dude");
let symbolTwo = Symbol("dude");
let symbolObject = {
	[symbolOne]: 1,
	[symbolTwo]: 2
};
console.log(`one: ${symbolObject[symbolOne]}`);
console.log(`two: ${symbolObject[symbolTwo]}`);
console.log(`fake symbol: ${symbolObject[Symbol("dude")]}`);
console.log(`normal property: ${symbolObject.symbolOne}`);

let lostSymbolObj = function() {
	let lostSymbol = Symbol("uhoh");
	return {
		[lostSymbol]: "gone forever"
	};
}();
// You have to get the symbol from the object.
// No other symbol will work.
let recoveredSymbol = Object.getOwnPropertySymbols(lostSymbolObj)[0];
console.log(`I don't think it's ${lostSymbolObj[recoveredSymbol]} after all`);

console.log("generators");
let intSeq = function* (start=0) {
	let curr = start;
	while(curr < 5) {
		let reset = yield curr;
		curr += 1;
		if (reset) {
			curr = start;
		}
	}
}

// Cleanish
let intSeqVar = intSeq(-3);
let itr = intSeqVar.next();
while (!itr.done) {
	console.log(itr.value);
	itr = intSeqVar.next();
}

// Less code...but yikes it's nasty
while (!(itr = intSeqVar.next()).done) {
	console.log(itr.value);
}

intSeqVar = intSeq();
console.log(intSeqVar.next().value);
console.log(intSeqVar.next().value);
console.log(intSeqVar.next(true).value);
console.log(intSeqVar.next().value);

console.log("Iterators");
let itrObject = {
	[Symbol.iterator]: intSeq
};
for (let x of itrObject) {
	console.log(x);
}

console.log("Promises");
let myPromise = new Promise(
	(resolve, reject) => {
		console.log("Started promise");
		resolve();
		console.log("Ending promise");
	}
);

myPromise.then(() => { console.log("Promise done!"); });

console.log("Parallel Promises");
let promiseCreator = (message, time) => {
	return new Promise(
		(resolve, reject) => {
			console.log(message);
			setTimeout(() => { resolve(message + ", " + time) }, time);
		}
	);
};

// Attempt to create a root promise.
// Once the root promise succeeds, spin up two parallel promises.
// Print out success or failure at each step.
promiseCreator("root", 500).then(
	(result) => {
		promiseCreator("one", 300)
			.then(
				(result) => { console.log(`one finished: ${result}`)},
				(result) => { console.log(`one rejected: ${result}`)}
			)
			.then(
				(result) => { console.log(`one next finished: ${result}`)},
				(result) => { console.log(`one next rejected: ${result}`)}
			);
		promiseCreator("two", 100)
			.then(
				(result) => { console.log(`two finished: ${result}`)},
				(result) => { console.log(`two rejected: ${result}`)}
			)
			.then(
				(result) => { console.log(`two next finished: ${result}`)},
				(result) => { console.log(`two next rejected: ${result}`)}
			);
		console.log(`root finished: ${result}`);
	},
	(result) => { 
		console.log(`root rejected: ${result}`)
	}
).then(
	(result) => { console.log(`root next finished: ${result}`)},
	(result) => { console.log(`root next rejected: ${result}`)}
);
