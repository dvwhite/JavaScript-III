/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Global binding - the window/console global object is what is referred to with "this" in all other cases
* 2. Implicit binding - in an object literal, the 'this' keyword refers to that specific object
* 3. New binding - using the "new" keyword to tell the js compiler that you are creating an object,
*   and 'this' refers to the object instantiated by the class constructor following "new"
* 4. Explicit binding - by using the .bind (not yet covered), .apply and .call methods, 'this' refers 
*   to the context passed in, allowing the function to access the properties and methods of that context
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this); //should display a window object, which is extensive

// Principle 2

// code example for Implicit Binding
const obj = {
    "name": "david", 
    "age": 100,
    "doubleAge": function() {
        return this.age * 2;
    }
}
console.log(obj.doubleAge()); // should log 200

// Principle 3

// code example for New Binding
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.doubleAge = function() {
        return this.age * 2;
    }
    this.speak = function() {
        return `Hi! My name is ${this.name}!`
    }
}
let me = new Person("David", 75);
console.log(me.doubleAge()); // should log 150

// Principle 4

// code example for Explicit Binding
function Dog(name, age, favFood) {
    this.name = name;
    this.age = age;
    this.favFood = favFood;
    this.bark = function() {
        return `${this.name} says, \'Ruff Ruff!\'`
    }
}
let scruffy = new Dog("Scruffy", 7, "Bacon");

// Use explicit binding to bind one object to another object's method call
console.log(me.speak.call(scruffy)); // should log 'Hi! My name is Scruffy!'
console.log(scruffy.bark.call(me)); // should log 'David says, 'Ruff Ruff!''