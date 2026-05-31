// ============================================================
// JAVASCRIPT NOTES — Comprehensive Reference
// ============================================================
// Run in Node.js:  node index.js
// Run in browser:  open index.html (which links this file)
// ============================================================


// ============================================================
// OUTPUT & DEBUGGING
// ============================================================
console.log('Hello World');          // print to console (works in both browser and Node.js)
console.error('Something failed');   // prints in red to console
console.warn('Watch out!');          // prints warning
console.table([{ a: 1 }, { a: 2 }]); // display arrays/objects as a table

// window.alert() shows a browser popup — browser-only, does not work in Node.js
// window.alert('This is an alert');


// ============================================================
// DATA TYPES
// ============================================================
/* JavaScript has 8 data types:
   Primitives: string, number, bigint, boolean, undefined, null, symbol
   Object type: object (arrays, plain objects, functions, Date, Map, Set, …) */

var myName = 'Beau';
/* var — function-scoped; hoisted to the top of its function (or global scope if not in a function).
   Avoid var in modern JS — use let or const instead. */

let ourName = 'Bro';
/* let — block-scoped: only accessible within the {} block where it is declared.
   Can be reassigned but not redeclared in the same scope. */

const pi = 3.14159;
/* const — block-scoped like let, but cannot be reassigned after declaration.
   Objects/arrays declared with const can still have their contents mutated. */

// Primitive data types:
// string    — sequence of characters: 'hello', "world", `template`
// number    — integer or float: 42, 3.14, -7  (64-bit IEEE 754)
// bigint    — integers beyond Number.MAX_SAFE_INTEGER: 9007199254740991n
// boolean   — true or false
// undefined — variable declared but not assigned a value
// null      — intentional absence of a value (typeof null === 'object' is a known JS quirk)
// symbol    — unique, immutable identifier: Symbol('id')

let notAssigned;
console.log(notAssigned); // undefined

const nothing = null;
console.log(nothing);     // null

const big = 9007199254740999n; // BigInt literal — append 'n' to the number
console.log(typeof big);       // "bigint"

// typeof operator — returns a string describing the type:
console.log(typeof 'hello');    // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" ← historical bug in JS, null is NOT an object
console.log(typeof {});         // "object"
console.log(typeof []);         // "object" ← arrays are objects; use Array.isArray() to check
console.log(typeof function(){}); // "function"
console.log(Array.isArray([1, 2, 3])); // true


// ============================================================
// HOISTING
// ============================================================
/* Hoisting: JavaScript moves declarations to the top of their scope before execution.
   - var declarations are hoisted and initialised to undefined
   - function declarations are FULLY hoisted — callable before they appear in code
   - let/const are hoisted but NOT initialised — accessing them before declaration
     throws a ReferenceError (this zone is called the Temporal Dead Zone / TDZ) */

console.log(hoistedVar); // undefined — var is hoisted but its value is not
// console.log(hoistedLet); // ReferenceError — TDZ for let/const

var hoistedVar = 'I was hoisted';

hoistedFn(); // works! — function declarations are fully hoisted
function hoistedFn() {
    console.log('Function hoisting works!');
}

// Function expressions (assigned to var/let/const) are NOT hoisted:
// myExpr(); // TypeError: myExpr is not a function (var is hoisted as undefined)
var myExpr = function() { return 'expression'; };


// ============================================================
// TYPE CONVERSION
// ============================================================
console.log(Number('123'));     // 123 — string to number
console.log(Number(''));        // 0
console.log(Number(true));      // 1
console.log(Number(false));     // 0
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

console.log(parseInt('123px'));      // 123 — stops at first non-numeric character
console.log(parseFloat('3.14abc'));  // 3.14
console.log(parseInt('0xFF', 16));   // 255 — parse hexadecimal

console.log(String(123));    // "123"
console.log(String(true));   // "true"
console.log((123).toString(2)); // "1111011" — convert to binary string

// Falsy values — these all evaluate to false in a boolean context:
// false, 0, -0, 0n, "", '', ``, null, undefined, NaN
console.log(Boolean(0));       // false
console.log(Boolean(''));      // false
console.log(Boolean(null));    // false
// Everything else is truthy (including empty arrays [] and empty objects {})
console.log(Boolean([]));      // true
console.log(Boolean({}));      // true


// ============================================================
// TEMPLATE LITERALS
// ============================================================
const firstName = 'Alice';
const userAge = 25;

// Old concatenation style:
console.log('Hello, my name is ' + firstName + ' and I am ' + userAge + '.');

// Template literals — use backticks ` and ${expression} for embedding:
console.log(`Hello, my name is ${firstName} and I am ${userAge}.`);

// Any JS expression works inside ${}:
console.log(`2 + 2 = ${2 + 2}`);
console.log(`${firstName.toUpperCase()} is ${userAge >= 18 ? 'an adult' : 'a minor'}.`);

// Multi-line strings (whitespace is preserved):
const poem = `Roses are red,
Violets are blue,
JavaScript is fun,
And so are you.`;
console.log(poem);


// ============================================================
// COMPARISON OPERATORS
// ============================================================
/* == (loose equality)   — performs type coercion before comparing
   === (strict equality) — compares value AND type, no coercion
   Always prefer === to avoid unexpected coercion bugs. */

console.log(5 == '5');          // true  — '5' coerced to number 5
console.log(5 === '5');         // false — different types
console.log(null == undefined); // true  — special JS rule
console.log(null === undefined);// false — different types
console.log('' == 0);           // true  — both coerce to falsy
console.log(NaN === NaN);       // false — NaN is never equal to itself
console.log(Number.isNaN(NaN)); // true  — correct way to check for NaN


// ============================================================
// LOGICAL OPERATORS
// ============================================================
console.log(true && false); // false — AND: both must be truthy
console.log(true || false); // true  — OR: at least one must be truthy
console.log(!true);         // false — NOT: inverts boolean

// Short-circuit evaluation:
// && returns the first falsy value, or the last value if all are truthy
console.log('hello' && 42);    // 42
console.log(false && 'world'); // false

// || returns the first truthy value, or the last value if all are falsy
console.log('hello' || true);  // "hello"
console.log('' || 'default');  // "default" — handy for fallback values

// Nullish coalescing (??) — returns right side ONLY if left is null or undefined.
// Unlike ||, it does NOT treat 0 or '' as falsy:
console.log(0 || 'fallback');   // "fallback" — 0 is falsy for ||
console.log(0 ?? 'fallback');   // 0          — 0 is NOT null/undefined
console.log(null ?? 'default'); // "default"
console.log(undefined ?? 42);  // 42


// ============================================================
// OPTIONAL CHAINING (?.)
// ============================================================
/* ?. safely accesses nested properties or calls methods.
   Returns undefined instead of throwing a TypeError if the value is null/undefined. */

const userObj = {
    name: 'Bob',
    address: { city: 'Copenhagen' }
};

console.log(userObj.address?.city);    // "Copenhagen"
console.log(userObj.phone?.number);    // undefined — no error thrown
console.log(userObj.sayHello?.());     // undefined — method doesn't exist, no error

// Without ?., this would throw: TypeError: Cannot read properties of undefined
// console.log(userObj.phone.number);

// Works with array indexing too:
const arr = null;
console.log(arr?.[0]); // undefined


// ============================================================
// CONDITIONALS
// ============================================================
const temperature = 22;

if (temperature > 30) {
    console.log('Hot day');
} else if (temperature > 15) {
    console.log('Nice day'); // this branch runs
} else {
    console.log('Cold day');
}

// Ternary operator — concise if/else for a single expression:
const label = temperature > 30 ? 'Hot' : 'Not hot';
console.log(label); // "Not hot"

// Nested ternary (use sparingly — can hurt readability):
const rating = temperature > 30 ? 'hot' : temperature > 15 ? 'warm' : 'cold';
console.log(rating); // "warm"


// ============================================================
// SWITCH STATEMENTS
// ============================================================
const dayNum = 3;
switch (dayNum) {
    case 1: console.log('Monday');    break;
    case 2: console.log('Tuesday');   break;
    case 3: console.log('Wednesday'); break; // this runs
    case 4: console.log('Thursday');  break;
    case 5: console.log('Friday');    break;
    case 6: console.log('Saturday');  break;
    case 7: console.log('Sunday');    break;
    default: console.log('Invalid day');
}
/* break exits the switch after a matching case executes.
   Without break, execution "falls through" to the next case — usually a bug.
   Fall-through is occasionally intentional (e.g. case 1: case 2: same logic). */


// ============================================================
// SCOPE — var vs let vs const
// ============================================================
function scopeDemo() {
    var funcScoped = 'function-scoped';
    if (true) {
        var alsoFunc = 'also function-scoped (var ignores blocks)';
        let blockScoped = 'block-scoped (let)';
        const alsoBlock = 'block-scoped (const)';
        console.log(blockScoped); // accessible here
    }
    console.log(funcScoped); // accessible — same function
    console.log(alsoFunc);   // accessible — var ignores {}
    // console.log(blockScoped); // ReferenceError — out of block
}
scopeDemo();


// ============================================================
// ARRAYS
// ============================================================
const fruits = ['apple', 'banana', 'cherry']; // array literal
const empty  = new Array(3);                   // length-3 array, slots are empty
const chars  = Array.from('hello');            // ['h','e','l','l','o'] from iterable

console.log(fruits[0]);               // "apple" — zero-indexed
console.log(fruits.length);           // 3
console.log(fruits[fruits.length - 1]); // last element: "cherry"
console.log(fruits.at(-1));           // "cherry" — at() supports negative indices

// Mutating methods (modify the original array):
fruits.push('date');          // add to end   → returns new length
fruits.pop();                 // remove from end → returns removed item
fruits.unshift('avocado');    // add to start → returns new length
fruits.shift();               // remove from start → returns removed item
fruits.splice(1, 1, 'blueberry'); // at index 1: remove 1 item, insert 'blueberry'
fruits.reverse();             // reverses in place
fruits.sort();                // sorts alphabetically in place (careful with numbers!)

// Non-mutating methods (return new array or value, original is unchanged):
console.log(fruits.includes('banana')); // true/false
console.log(fruits.indexOf('banana'));  // index of first match, or -1
console.log(fruits.join(', '));         // "item1, item2, item3"
console.log(fruits.slice(0, 2));        // shallow copy of portion [start, end)
console.log(fruits.concat(['elderberry', 'fig'])); // new merged array

// Numeric sort requires a comparator function:
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
const sorted = [...nums].sort((a, b) => a - b); // ascending — does NOT mutate nums
console.log(sorted); // [1,1,2,3,4,5,6,9]

// Searching:
const found    = nums.find(n => n > 4);       // 5   — first element passing the test
const foundIdx = nums.findIndex(n => n > 4);  // 4   — index of first match

// flat — flatten nested arrays:
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1,2,3,4,[5,6]] — one level
console.log(nested.flat(2));   // [1,2,3,4,5,6]   — two levels
console.log(nested.flat(Infinity)); // fully flatten any depth

// every / some — test conditions across elements:
console.log([2, 4, 6].every(n => n % 2 === 0)); // true — all even
console.log([1, 2, 3].some(n => n > 2));         // true — at least one > 2


// ============================================================
// ARRAY DESTRUCTURING
// ============================================================
const [first, second, third] = ['a', 'b', 'c'];
console.log(first, second, third); // "a" "b" "c"

// Skip elements with commas:
const [,, onlyThird] = ['x', 'y', 'z'];
console.log(onlyThird); // "z"

// Default values (used when element is undefined):
const [pVal = 10, qVal = 20] = [5];
console.log(pVal, qVal); // 5  20

// Rest element — collects remaining items into a new array:
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2,3,4,5]

// Swap two variables without a temp variable:
let mVar = 1, nVar = 2;
[mVar, nVar] = [nVar, mVar];
console.log(mVar, nVar); // 2  1


// ============================================================
// SPREAD OPERATOR (...)
// ============================================================
const arrA = [1, 2, 3];
const arrB = [4, 5, 6];

const combined  = [...arrA, ...arrB];   // [1,2,3,4,5,6]
const shallowArr = [...arrA];           // shallow copy

shallowArr.push(99);
console.log(arrA); // [1,2,3] — unchanged (primitives copied by value)

// Spread with objects (last key wins on conflict):
const defaults = { color: 'blue', size: 'medium' };
const custom   = { size: 'large', weight: 'heavy' };
const merged   = { ...defaults, ...custom }; // { color:'blue', size:'large', weight:'heavy' }

// SHALLOW COPY WARNING — nested objects/arrays are still shared references:
const original    = { name: 'Alice', scores: [90, 85] };
const shallowCopy = { ...original };
shallowCopy.scores.push(100);
console.log(original.scores); // [90,85,100] — both point to the same array!

// Deep clone with structuredClone() (modern, available Node 17+ and all modern browsers):
const deepCopy = structuredClone(original);
deepCopy.scores.push(999);
console.log(original.scores); // [90,85,100] — unaffected

// Spread in function calls:
const maxArgs = [3, 1, 4, 1, 5];
console.log(Math.max(...maxArgs)); // 5


// ============================================================
// LOOPS
// ============================================================

// Classic for loop — best when you need the index:
for (let i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}

// for...of — iterate VALUES of any iterable (array, string, Set, Map, …):
const letters = ['a', 'b', 'c'];
for (const letter of letters) {
    console.log(letter); // 'a', 'b', 'c'
}

// for...of with index using .entries():
for (const [i, val] of letters.entries()) {
    console.log(i, val); // 0 'a', 1 'b', 2 'c'
}

// for...in — iterates KEYS of an object (use for plain objects, not arrays):
const car = { make: 'Toyota', model: 'Corolla', year: 2020 };
for (const key in car) {
    console.log(`${key}: ${car[key]}`);
}

// while loop — condition checked BEFORE each iteration:
let counter = 0;
while (counter < 3) {
    console.log(counter); // 0 1 2
    counter++;
}

// do-while — body executes AT LEAST ONCE before condition is checked:
let attempts = 0;
do {
    console.log('attempt', attempts);
    attempts++;
} while (attempts < 3);

// break and continue:
for (let i = 0; i < 10; i++) {
    if (i === 3) continue; // skip this iteration
    if (i === 6) break;    // exit the loop entirely
    console.log(i); // 0 1 2 4 5
}


// ============================================================
// OBJECTS
// ============================================================
const person = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'coding'],
    address: {
        city: 'Aarhus',
        country: 'Denmark'
    },
    // Shorthand method syntax (ES6):
    greet() {
        return `Hi, I'm ${this.name}`;
    },
    // Arrow functions do NOT have their own 'this' — avoid them as object methods:
    // greetArrow: () => `Hi, I'm ${this.name}` // this.name would be undefined here
};

// Property access:
console.log(person.name);       // dot notation
console.log(person['age']);     // bracket notation — use when key is dynamic or has spaces
const propKey = 'hobbies';
console.log(person[propKey]);   // dynamic key access

// Nested access:
console.log(person.address.city);       // "Aarhus"
console.log(person.address?.zipCode);   // undefined (safe with optional chaining)

// Add, update, delete properties:
person.email = 'john@example.com'; // add new property
person.age   = 31;                 // update existing property
delete person.email;               // remove property

// Computed property names:
const field = 'score';
const record = { [field]: 100 };   // { score: 100 }
console.log(record.score);          // 100

// Shorthand property syntax — when variable name matches key name:
const xPos = 5, yPos = 10;
const point = { xPos, yPos };      // same as { xPos: xPos, yPos: yPos }

// Object utility methods:
console.log(Object.keys(person));    // array of key names
console.log(Object.values(person));  // array of values
console.log(Object.entries(person)); // array of [key, value] pairs

// Iterate with Object.entries:
for (const [k, v] of Object.entries(person)) {
    if (typeof v !== 'function') console.log(`${k}: ${v}`);
}

// Object.assign — merge objects into target (mutates target!):
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 }); // { a:1, b:2, c:3 }

// Object.freeze — makes object immutable (shallow only):
const frozen = Object.freeze({ x: 1, y: 2 });
frozen.x = 99; // silently ignored (or throws in strict mode)
console.log(frozen.x); // 1 — unchanged


// ============================================================
// OBJECT DESTRUCTURING
// ============================================================
const { name: personName, age: personAge } = person;
// Rename during destructuring: name → personName, age → personAge
console.log(personName, personAge); // "John" 31

// Default values (used when property is undefined):
const { email = 'no-email@example.com', name: userName } = person;
console.log(email);    // "no-email@example.com" (property was deleted)
console.log(userName); // "John"

// Nested destructuring:
const { address: { city } } = person;
console.log(city); // "Aarhus"

// Rest in destructuring — collect remaining properties:
const { name: pName, ...remainingProps } = person;
console.log(pName);          // "John"
console.log(remainingProps); // all other properties

// Destructuring in function parameters — very common with objects:
function displayUser({ name, age = 0 }) {
    console.log(`${name} is ${age} years old`);
}
displayUser(person); // "John is 31 years old"


// ============================================================
// SETS
// ============================================================
/* A Set stores UNIQUE values — duplicates are automatically removed.
   Order of insertion is preserved. */

const mySet = new Set([1, 2, 3, 3, 2]); // {1, 2, 3}
mySet.add(4);    // add a value
mySet.add(1);    // already exists — ignored
mySet.delete(2); // remove a value
console.log(mySet.has(3)); // true
console.log(mySet.size);   // 3

// Iterate a Set:
for (const value of mySet) {
    console.log(value);
}

// Convert to array:
const uniqueArr = [...mySet]; // or Array.from(mySet)

// Most common use case — remove duplicates from an array:
const withDupes = [1, 2, 2, 3, 3, 3, 4];
const unique    = [...new Set(withDupes)]; // [1, 2, 3, 4]

mySet.clear(); // remove all elements


// ============================================================
// MAPS
// ============================================================
/* A Map stores key-value pairs where keys can be ANY type
   (unlike plain objects where keys must be strings or symbols).
   Insertion order is preserved. */

const myMap = new Map();
myMap.set('name', 'Alice');
myMap.set(42, 'the answer');
myMap.set(true, 'boolean key');
myMap.set({ id: 1 }, 'object as key');

console.log(myMap.get('name')); // "Alice"
console.log(myMap.has(42));     // true
console.log(myMap.size);        // 4

myMap.delete(true);

// Iterate a Map (order matches insertion):
for (const [key, value] of myMap) {
    console.log(`${key} → ${value}`);
}

// Initialise with entries:
const scoreMap = new Map([
    ['Alice', 95],
    ['Bob',   87],
    ['Carol', 91],
]);
console.log(scoreMap.get('Bob')); // 87

// Convert Map to object or array:
const mapAsObj = Object.fromEntries(scoreMap); // { Alice:95, Bob:87, Carol:91 }
const mapAsArr = [...scoreMap.entries()];       // [['Alice',95], …]


// ============================================================
// FUNCTIONS
// ============================================================

// Function declaration — fully hoisted, callable before it appears:
function addNums(a, b) {
    return a + b;
}
console.log(addNums(3, 4)); // 7

// Default parameters — used when argument is undefined:
function greetUser(name, greeting = 'Hello') {
    return `${greeting}, ${name}!`;
}
console.log(greetUser('Alice'));           // "Hello, Alice!"
console.log(greetUser('Bob', 'Howdy'));    // "Howdy, Bob!"

// Function expression — NOT hoisted:
const multiply = function(a, b) {
    return a * b;
};

// Arrow function — concise syntax; no own 'this', 'arguments', or 'super':
const divideNums  = (a, b) => a / b;         // implicit return for single expression
const squareNum   = n => n * n;               // parentheses optional for single param
const getObj      = () => ({ key: 'value' }); // wrap object literal in () to distinguish from block

// Rest parameters — collects all remaining arguments into an array:
function sumAll(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15


// ============================================================
// CLOSURES
// ============================================================
/* A closure is a function that "remembers" variables from its outer (enclosing) scope
   even after the outer function has finished executing.
   This is one of JavaScript's most powerful features. */

function makeCounter(start = 0) {
    let count = start; // 'count' is captured by the inner function
    return function() {
        count++;
        return count;
    };
}

const counter  = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3 — count persists between calls

const counter2 = makeCounter(10); // separate, independent counter
console.log(counter2()); // 11

// Common use: factory functions (functions that return functions):
function makeAdder(x) {
    return y => x + y; // y closes over x
}
const add5 = makeAdder(5);
console.log(add5(3));  // 8
console.log(add5(10)); // 15

// Closures enable data privacy — 'count' is inaccessible from outside makeCounter.


// ============================================================
// CLASSES
// ============================================================
/* ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance.
   Under the hood, objects still use prototypes. */

class Animal {
    #name; // private field — only accessible inside this class (# prefix)

    constructor(name, sound) {
        this.#name = name;
        this.sound = sound; // public property
    }

    // Getter — access like a property (animal.name) instead of animal.getName():
    get name() {
        return this.#name;
    }

    // Setter — allows animal.name = 'Rex' with validation:
    set name(value) {
        if (typeof value !== 'string') throw new TypeError('Name must be a string');
        this.#name = value;
    }

    speak() {
        return `${this.#name} says ${this.sound}`;
    }

    // Static method — called on the CLASS itself, not on instances:
    static describe() {
        return 'Animals are living beings.';
    }
}

class Dog extends Animal {
    #tricks = []; // private field with default value

    constructor(name) {
        super(name, 'Woof'); // MUST call super() before using 'this' in a subclass
    }

    learn(trick) {
        this.#tricks.push(trick);
    }

    showTricks() {
        return `${this.name} knows: ${this.#tricks.join(', ')}`;
    }

    // Override the parent method:
    speak() {
        return super.speak() + '!'; // super.speak() calls Animal's version
    }
}

const dog = new Dog('Rex');
dog.learn('sit');
dog.learn('shake');
console.log(dog.speak());       // "Rex says Woof!"
console.log(dog.showTricks());  // "Rex knows: sit, shake"
console.log(Animal.describe()); // "Animals are living beings."
// console.log(dog.#tricks);    // SyntaxError — private fields not accessible outside

// instanceof checks:
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true


// ============================================================
// THIS KEYWORD
// ============================================================
/* 'this' refers to the object that called the function.
   Its value depends on HOW the function is called, not where it is defined.
   Arrow functions do NOT bind their own 'this' — they inherit it from their surrounding scope. */

const thisObj = {
    name: 'MyObject',
    regular() {
        console.log(this.name); // "MyObject" — 'this' is thisObj
    },
    arrow: () => {
        // Arrow inherits 'this' from the outer scope (module/global level here)
        console.log(this); // undefined in Node.js strict mode, 'window' in browser
    },
};

thisObj.regular(); // "MyObject"

// Losing 'this' when a method is passed as a callback:
const fn = thisObj.regular;
// fn(); // undefined or error — 'this' is lost when called without an object

// .bind() creates a new function permanently bound to a specific 'this':
const boundFn = thisObj.regular.bind(thisObj);
boundFn(); // "MyObject"

// .call() and .apply() — invoke with a specific 'this' immediately:
function introduce(greeting) {
    return `${greeting}, I'm ${this.name}`;
}
console.log(introduce.call({ name: 'Alice' }, 'Hi'));      // "Hi, I'm Alice"
console.log(introduce.apply({ name: 'Bob' }, ['Hello'])); // "Hello, I'm Bob"
// Difference: call() takes args individually; apply() takes an args array.


// ============================================================
// MAP, FILTER, REDUCE
// ============================================================
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map() — transform every element; returns a new array of the SAME length:
const doubled = numbers.map(n => n * 2); // [2,4,6,8,10,12,14,16,18,20]

// filter() — keep only elements that pass the test; returns a new (possibly shorter) array:
const evens = numbers.filter(n => n % 2 === 0); // [2,4,6,8,10]

// reduce() — fold all elements into a single value:
// (accumulator starts at the initial value, here 0)
const total = numbers.reduce((acc, n) => acc + n, 0); // 55

// Chain them — each returns an array, so they can be composed:
const result = numbers
    .filter(n => n % 2 === 0)        // [2,4,6,8,10]
    .map(n => n * n)                  // [4,16,36,64,100]
    .reduce((acc, n) => acc + n, 0);  // 220

console.log(result); // 220

// Real-world example: filter and transform an array of objects:
const users = [
    { name: 'Alice', age: 25, active: true  },
    { name: 'Bob',   age: 17, active: false },
    { name: 'Carol', age: 30, active: true  },
];

const activeAdultNames = users
    .filter(u => u.active && u.age >= 18)
    .map(u => u.name.toUpperCase()); // ["ALICE", "CAROL"]

console.log(activeAdultNames);


// ============================================================
// ERROR HANDLING
// ============================================================
try {
    JSON.parse('invalid json'); // throws SyntaxError
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
} finally {
    console.log('Finally always runs — use for cleanup (closing files, DB connections, etc.)');
}

// Throw custom errors:
function safeDivide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
}

try {
    console.log(safeDivide(10, 0));
} catch (e) {
    console.error(e.message); // "Division by zero"
}

// Custom error classes — extend Error for domain-specific errors:
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name  = 'ValidationError';
        this.field = field;
    }
}

try {
    throw new ValidationError('Email is invalid', 'email');
} catch (e) {
    if (e instanceof ValidationError) {
        console.log(`${e.name} on field "${e.field}": ${e.message}`);
    } else {
        throw e; // re-throw errors you don't handle
    }
}


// ============================================================
// JSON
// ============================================================
/* JSON (JavaScript Object Notation) is a text format for storing and transmitting data.
   Rules:
   - All keys must be double-quoted strings
   - Values: string, number, boolean, null, array, or object
   - NOT allowed: undefined, functions, Symbol, circular references */

const userData = { name: 'Alice', age: 25, hobbies: ['reading', 'coding'] };

// Serialize JS value to JSON string:
const jsonString = JSON.stringify(userData);
console.log(jsonString); // '{"name":"Alice","age":25,"hobbies":["reading","coding"]}'

// Pretty-print with indentation (useful for logging/debugging):
console.log(JSON.stringify(userData, null, 2));

// Replacer — include only specific keys:
const limited = JSON.stringify(userData, ['name', 'age']);
console.log(limited); // '{"name":"Alice","age":25}'

// Parse JSON string back to a JS value:
const parsed = JSON.parse(jsonString);
console.log(parsed.name); // "Alice"

// Common pattern — deep-copy an object via JSON (loses functions, undefined, Date precision):
const copy = JSON.parse(JSON.stringify(userData));


// ============================================================
// PROMISES
// ============================================================
/* A Promise represents the eventual result of an asynchronous operation.
   States:
   - pending   → initial state, operation in progress
   - fulfilled → resolve() was called, result is available
   - rejected  → reject() was called, error available
   Once settled (fulfilled or rejected), the state never changes. */

const myPromise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve('Operation succeeded!');
    } else {
        reject(new Error('Operation failed'));
    }
});

myPromise
    .then(value => console.log(value))          // "Operation succeeded!"
    .catch(err  => console.error(err.message))
    .finally(()  => console.log('Done'));        // always runs

// Promise combinators:

// Promise.all — resolves when ALL resolve; rejects immediately if ANY rejects:
const pa1 = Promise.resolve(1);
const pa2 = Promise.resolve(2);
const pa3 = new Promise(resolve => setTimeout(() => resolve(3), 100));

Promise.all([pa1, pa2, pa3]).then(results => {
    console.log(results); // [1, 2, 3] — order matches input array, not resolution order
});

// Promise.allSettled — waits for ALL, regardless of outcome:
Promise.allSettled([
    Promise.resolve('ok'),
    Promise.reject('fail')
]).then(results => {
    results.forEach(r => console.log(r.status, r.value ?? r.reason));
    // "fulfilled" "ok"
    // "rejected"  "fail"
});

// Promise.race — resolves/rejects with the first settled promise:
Promise.race([
    new Promise(resolve => setTimeout(() => resolve('slow'), 500)),
    new Promise(resolve => setTimeout(() => resolve('fast'), 100)),
]).then(winner => console.log(winner)); // "fast"

// Promise.any — resolves with the first FULFILLED promise (ignores rejections):
Promise.any([
    Promise.reject('error1'),
    Promise.resolve('success'),
    Promise.resolve('also success'),
]).then(val => console.log(val)); // "success"


// ============================================================
// ASYNC / AWAIT
// ============================================================
/* async/await is syntactic sugar over Promises.
   - An 'async' function always returns a Promise.
   - 'await' pauses execution inside the async function until the Promise settles.
   - Makes async code look and read like synchronous code. */

// Simulate an async operation (like a network request):
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function fetchUser(id) {
    const user = await delay(100, { id, name: 'Alice', email: 'alice@example.com' });
    return user;
}

async function main() {
    try {
        // Sequential — waits for first before starting second:
        const user = await fetchUser(1);
        console.log(user.name); // "Alice"

        // Concurrent — start both at the same time with Promise.all:
        const [user1, user2] = await Promise.all([fetchUser(1), fetchUser(2)]);
        console.log(user1.name, user2.name);

    } catch (err) {
        // Any rejected promise inside the try block lands here:
        console.error('Failed:', err.message);
    } finally {
        console.log('Done fetching');
    }
}

main();

// Top-level await is available in ES Modules (.mjs or "type":"module" in package.json):
// const result = await fetchUser(1); // only valid at module top level


// ============================================================
// FETCH API  (browser + Node.js 18+)
// ============================================================
/* fetch() sends HTTP requests and returns a Promise that resolves to a Response object.
   In Node.js < 18 install 'node-fetch': npm install node-fetch */

async function getPost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

        // fetch() only rejects on network failure — check .ok for HTTP errors:
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // parse response body as JSON
        console.log(data.title);

    } catch (err) {
        console.error('Fetch failed:', err.message);
    }
}

async function createPost(title, body) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ title, body, userId: 1 }),
    });
    const created = await response.json();
    console.log('Created post with id:', created.id);
}

// getPost(1);                       // uncomment to run
// createPost('Test', 'Hello world'); // uncomment to run


// ============================================================
// DOM MANIPULATION  (browser only — not available in Node.js)
// ============================================================
/*
// --- Selecting elements ---
const el   = document.getElementById('myId');         // by ID (fastest)
const el2  = document.querySelector('.myClass');       // first CSS selector match
const els  = document.querySelectorAll('p');           // all matches → NodeList
const byTag = document.getElementsByTagName('div');   // live HTMLCollection

// --- Reading and writing content ---
el.textContent = 'New text';    // plain text — safe, no XSS risk
el.innerHTML   = '<b>Bold</b>'; // parses HTML — NEVER insert untrusted user input here (XSS!)

// --- Classes and styles ---
el.style.color = 'red';              // inline style
el.classList.add('active');          // add a class
el.classList.remove('hidden');       // remove a class
el.classList.toggle('open');         // toggle on/off
el.classList.contains('active');     // check if class exists
el.classList.replace('old', 'new');  // replace one class with another

// --- Attributes ---
el.setAttribute('data-id', 42);
console.log(el.getAttribute('data-id')); // "42"
el.removeAttribute('data-id');

// --- Creating and inserting elements ---
const newEl = document.createElement('p');
newEl.textContent = 'Dynamically created paragraph';
document.body.appendChild(newEl);               // append as last child
document.body.prepend(newEl);                   // insert as first child
el.insertAdjacentHTML('afterend', '<span>inserted</span>');
// Positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'

// --- Removing elements ---
el.remove();

// --- Event listeners ---
el2.addEventListener('click', function(event) {
    console.log('Clicked!', event.target); // event.target = the element that was clicked
    event.preventDefault();               // stop default behavior (e.g. form submit, link)
    event.stopPropagation();              // stop event from bubbling up to parent elements
});

// Common events: click, dblclick, input, change, submit, keydown, keyup,
//               mouseover, mouseout, focus, blur, load, DOMContentLoaded, scroll

// --- Event delegation ---
// Attach ONE listener to a parent to handle clicks on any child — more efficient
// than adding listeners to every child individually, and works for dynamically added elements:
document.querySelector('ul').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log('List item clicked:', e.target.textContent);
    }
});

// --- Wait for DOM to be ready ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed — safe to query elements now');
});
*/


// ============================================================
// LOCAL STORAGE & SESSION STORAGE  (browser only)
// ============================================================
/*
// localStorage   — persists across sessions (survives page reload AND browser close)
// sessionStorage — cleared when the tab or window is closed

// Store data (only strings — serialize objects with JSON):
localStorage.setItem('username', 'Alice');
localStorage.setItem('settings', JSON.stringify({ theme: 'dark', lang: 'en' }));

// Read data:
const storedName = localStorage.getItem('username');       // "Alice" or null
const settings   = JSON.parse(localStorage.getItem('settings')); // { theme:'dark', lang:'en' }

// Remove:
localStorage.removeItem('username');

// Clear everything:
localStorage.clear();

// sessionStorage has the exact same API:
sessionStorage.setItem('tempToken', 'abc123');
const token = sessionStorage.getItem('tempToken');
*/


// ============================================================
// MODULES (ES6 import / export)
// ============================================================
/* Modules let you split code across multiple files and control what is public.
   To use in Node.js: add "type": "module" in package.json, or use .mjs extension.
   In browser: <script type="module" src="main.js"></script>

   ── math.js ──────────────────────────────────────
   export const PI = 3.14159;                         // named export

   export function circleArea(r) {                    // named export
       return PI * r * r;
   }

   export default function square(n) {                // default export (one per file)
       return n * n;
   }

   ── main.js ──────────────────────────────────────
   import square from './math.js';                    // import default export
   import { PI, circleArea } from './math.js';        // import named exports
   import * as math from './math.js';                 // import everything as namespace

   console.log(PI);              // 3.14159
   console.log(circleArea(5));   // 78.53975
   console.log(square(4));       // 16
   console.log(math.PI);         // 3.14159
*/


// ============================================================
// USEFUL BUILT-IN METHODS QUICK REFERENCE
// ============================================================

// --- String methods ---
const str = '  Hello, World!  ';
console.log(str.trim());            // "Hello, World!" — removes leading/trailing whitespace
console.log(str.toLowerCase());     // "  hello, world!  "
console.log(str.toUpperCase());     // "  HELLO, WORLD!  "
console.log(str.includes('World')); // true
console.log(str.startsWith(' '));   // true
console.log(str.endsWith('  '));    // true
console.log(str.replace('World', 'JS')); // "  Hello, JS!  "
console.log(str.replaceAll('l', 'L'));   // "  HeLLo, WorLd!  "
console.log('a,b,c'.split(','));    // ['a','b','c']
console.log('ha'.repeat(3));        // "hahaha"
console.log('5'.padStart(4, '0'));  // "0005" — left-pad to length 4
console.log('hi'.padEnd(5, '.'));   // "hi..." — right-pad to length 5
console.log(str.trim().slice(0, 5)); // "Hello"
console.log(str.trim().indexOf('o')); // 4 — first occurrence index

// --- Number methods ---
console.log((3.14159).toFixed(2));   // "3.14" — string with fixed decimal places
console.log(Number.isInteger(4.0));  // true
console.log(Number.isFinite(1/0));   // false
console.log(Number.isNaN(NaN));      // true
console.log(Math.round(4.6));        // 5
console.log(Math.floor(4.9));        // 4
console.log(Math.ceil(4.1));         // 5
console.log(Math.abs(-7));           // 7
console.log(Math.max(1, 5, 3));      // 5
console.log(Math.min(1, 5, 3));      // 1
console.log(Math.pow(2, 10));        // 1024
console.log(Math.sqrt(25));          // 5
console.log(Math.random());          // random float in [0, 1)
const randInt = Math.floor(Math.random() * 100); // random int 0-99
