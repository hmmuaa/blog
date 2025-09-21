import'#glob'
///more:object override
///typical
function fn(a,b){return a+b}
eq(fn(12,34),46)
///arrow
let
f=(a,b)=>a+b
eq(f(12,34),46)
///inline
f=function(a,b){return a+b}
eq(f(12,34),46)
///obj init shorthand
let
o={f(a,b){return a+b}}
eq(o.f(12,34),46)
o={f:(a,b)=>a+b}
eq(o.f(12,34),46)
///变通
f={f(a,b){return a+b}}.f
eq(f(12,34),46)
;({f}={f(a,b){return a+b}})
eq(f(12,34),46)
///complex
o={
	f(a,b){return this.g(a,b)},///不能省略this
	g(a,b){return a+b+this.v},///顺序都可以颠倒
	v:53
}
eq(o.f(12,34),99)
eq(o.f.bind(o)(12,34),99)
///curying
f=a=>b=>a*100+b///currying，只有指针有这种
eq(f(12)(34),1234)
//f(a)(b){return this.g(a,b)},///没有这种写法