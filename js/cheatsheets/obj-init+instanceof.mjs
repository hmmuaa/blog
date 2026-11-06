{

/*#give object a class for support instanceof
这是个从面向对象习惯延续下来的思维 记录备查
但其实在JS中用optional-chaining即可

Method 1: Modify the Prototype Chain (Standard)
By default,
instanceof checks if the class's prototype exists
anywhere along the object's prototype chain.
You can attach an object literal or an existing object
to a class by explicitly setting its prototype.*/
class Animal {}
const myDog = { name: "Buddy" };
console.log(myDog instanceof Animal); // false
// Set the object's prototype to the class's prototype
Object.setPrototypeOf(myDog, Animal.prototype);
console.log(myDog instanceof Animal); // true
}{

/*Method 2: Use Symbol.hasInstance (Custom Logic)
If you want to "disguise" an object as a class instance
without altering its prototype chain,
you can define a static [Symbol.hasInstance] method
inside your class.
JavaScript will automatically call this method
when evaluating instanceof.*/
class Car {
  // Overrides the behavior of "instanceof" for this class
  static [Symbol.hasInstance](obj) {
    // Return true if the object meets your specific structural conditions
    return obj && obj.hasWheels === true;
  }
}

const customObject = { hasWheels: true, model: "Tesla" };

console.log(customObject instanceof Car); // true
}