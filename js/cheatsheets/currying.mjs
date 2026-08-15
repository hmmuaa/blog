import'#glob'
let
f=a=>b=>[a,b,a+b]
eq(f(1)(2),[1,2,3])
f=a=>(b=>[a,b,a+b])
eq(f(1)(2),[1,2,3])
f=a=>(b=>[a,b,a+b])(1),eq(f(2),[2,1,3])//参数颠倒
f=(a=>(b=>[a,b,a+b])(1))(2),eq(f,[2,1,3])//参数颠倒
f=a=>((b=1)=>[a,b,a+b])(),eq(f(2),[2,1,3])//默认值
f=(a=>b=>[a,b,a+b])
eq(f(1)(2),[1,2,3])

eq((a=>b=>[a,b,a+b])(1)(2),[1,2,3])
f=a=>b=>[a,b,a+b](1)
throws(_=>f(2)(3),TypeError)//[a,b,(a + b)] is not a function
f=(a=>b=>[a,b,a+b])(1)
eq(f(2),[1,2,3])

//overriding
f=a=>a=>[1,a,1+a]
eq(f(2)(3),[1,3,4])
//override and reuse
f=a=>(a=>[1,a,1+a])(a+1)
eq(f(1),[1,2,3])
///see also:fn-arrow,fake var

///把普通fn通用转成currying
function curry(fn) {
  const arity = fn.length;

  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    } else {
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  };
}
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// Normal function call
console.log(add(1, 2, 3)); // Output: 6

// Curried calls
console.log(curriedAdd(1)(2)(3)); // Output: 6
console.log(curriedAdd(1, 2)(3)); // Output: 6
console.log(curriedAdd(1)(2, 3)); // Output: 6
console.log(curriedAdd(1, 2, 3)); // Output: 6