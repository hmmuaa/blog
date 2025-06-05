import'#glob'
let a={
	f(){return this.g()}///不能省略this
	,g(){return'foo'}///顺序可以颠倒
}
eq(a.f(),'foo')

let o={///complex
	f(a,b){return this.g(a,b)}///不能省略this
	,g(a,b){return a+b+this.v}///顺序都可以颠倒
	,v:33,
	//w:this.v//TypeError: Cannot read properties of undefined (reading 'v')
	//w:(()=>this.v)()//TypeError: Cannot read properties of undefined (reading 'v')
}
as(o.f(11,22))

/*But invalid JavaScript identifier is able as a property name
	引https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
const foo = { "fizz-buzz": true }
const { "fizz-buzz": fizzBuzz } = foo
console.log(fizzBuzz); // true

a={"fizz-buzz":true,a:1,'Mr. Lee’s':22}
eq(a,{"fizz-buzz":true,a:1,'Mr. Lee’s':22})

a={
	a:(()=>{return 11})(),
	b:(()=>{return 22})()
}
as(a)

/*命名重复不会报错但会覆盖，且覆盖后保持原顺序*/
as({a:11,b:22,a:33})
/*有语句时都会执行*/
let i=0
as({a:i++,b:22,a:i++})
eq(i,2)