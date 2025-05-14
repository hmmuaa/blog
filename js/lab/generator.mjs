import'#glob'
let i,a
/*[generator语法](developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
) `*`+`yield`会自动生成next函数*/
function*g(){yield 1,yield 2,yield 3}
a=g(),eq(a.next().value,1),eq(a.next().value,2)

///object initializer
i={*[Symbol.iterator](){yield 1,yield 2,yield 3}}
a=i[Symbol.iterator](),eq(a.next().value,1),eq(a.next().value,2)

i=()=>({*[Symbol.iterator](){yield 1,yield 2,yield 3}})
a=i()[Symbol.iterator](),eq(a.next().value,1),eq(a.next().value,2)

i=()=>({*g(){yield 1,yield 2,yield 3}})
a=i().g(),eq(a.next().value,1),eq(a.next().value,2)

///iterator
i=(i=1)=>({next:()=>({value:i++,done:i==3})})
a=i(),eq(a.next().value,1),eq(a.next().value,2)

///详细测试
const lo=97,upp=65
function*alphabets(){
	for(let i=0;i<26;i++)yield String.fromCharCode(lo+i)}
eq([...alphabets()],[...'abcdefghijklmnopqrstuvwxyz'])
throws(_=>alphabets().join(),TypeError)//alphabets(...).join is not a function
eq(alphabets()+'','[object Generator]')
eq(ns(alphabets()),'Object[Generator]{}')

i={*[Symbol.iterator](){
	for(let i=0;i<26;i++)yield String.fromCharCode(lo+i)}}
eq([...i],[...'abcdefghijklmnopqrstuvwxyz'])
eq([...i[Symbol.iterator]()],[...'abcdefghijklmnopqrstuvwxyz'])
eq(Array.from(i),[...'abcdefghijklmnopqrstuvwxyz'])
throws(_=>i.join(),TypeError)//alphabets(...).join is not a function
eq(i+'','[object Object]')
eq(ns(i),'{[Symbol(Symbol.iterator)]:[GeneratorFunction:[Symbol.iterator]]}')
eq(i[Symbol.iterator]()+'','[object Generator]')
eq(ns(i[Symbol.iterator]()),'Object[Generator]{}')

i=_=>({*[Symbol.iterator](){
	for(let i=0;i<26;i++)yield String.fromCharCode(lo+i)}})
eq([...i()],[...'abcdefghijklmnopqrstuvwxyz'])
eq([...i()[Symbol.iterator]()],[...'abcdefghijklmnopqrstuvwxyz'])
throws(_=>i().join(),TypeError)//alphabets(...).join is not a function
eq(i()+'','[object Object]')
eq(ns(i()),'{[Symbol(Symbol.iterator)]:[GeneratorFunction:[Symbol.iterator]]}')
eq(i()[Symbol.iterator]()+'','[object Generator]')
eq(ns(i()[Symbol.iterator]()),'Object[Generator]{}')

i=_=>({*g(){
	for(let i=0;i<26;i++)yield String.fromCharCode(lo+i)}})
eq([...i().g()],[...'abcdefghijklmnopqrstuvwxyz'])
throws(_=>i().join(),TypeError)//i(...).join is not a function
eq(i()+'','[object Object]')
eq(ns(i()),'{g:[GeneratorFunction:g]}')
eq(i().g()+'','[object Generator]')
eq(ns(i().g()),'Object[Generator]{}')

i=(i=0)=>({next:()=>({value:String.fromCharCode(lo+i++),done:i==26})})
a=i(),eq(a.next().value,'a'),eq(a.next().value,'b')
throws(_=>[...i()],TypeError)//i is not a function or its return value is not iterable
throws(_=>i().join(),TypeError)//i(...).join is not a function
eq(i()+'','[object Object]')
eq(ns(i()),'{next:[Function:next]}')

let j=0
i={[Symbol.iterator](){return{next:()=>({value:String.fromCharCode(lo+j++),done:j>26})}}}
eq(i+'','[object Object]')
eq(ns(i),'{[Symbol(Symbol.iterator)]:[Function:[Symbol.iterator]]}')
eq(i[Symbol.iterator]()+'','[object Object]')
eq(ns(i[Symbol.iterator]()),'{next:[Function:next]}')
eq([...i],[...'abcdefghijklmnopqrstuvwxyz'])
throws(_=>[...i[Symbol.iterator]()],TypeError)//i[Symbol.iterator] is not a function or its return value is not iterable
throws(_=>i.join(),TypeError)//i(...).join is not a function
eq(j,27),j=0,eq(j,0)
for(let a of i){if(a=='b')break;else{eq(a,'a')}}
eq(j,2)//中途break有效

i=(i=0)=>({[Symbol.iterator](){return{next:()=>({value:String.fromCharCode(lo+i++),done:i>26})}}})
eq([...i()],[...'abcdefghijklmnopqrstuvwxyz'])
throws(_=>[...i()[Symbol.iterator]()],TypeError)//i is not a function or its return value is not iterable
throws(_=>i().join(),TypeError)//i(...).join is not a function
eq(i()+'','[object Object]')
eq(ns(i()),'{[Symbol(Symbol.iterator)]:[Function:[Symbol.iterator]]}')

function*h(a){a=Array(5).fill(0);for(let b in a)yield b}
for(let a in h())eq(a,0)
throws(_=>h().forEach(a=>eq(a,0)),TypeError)//h(...).forEach is not a function

function*nfnt(i=0){while(true)yield i++}
a=nfnt(),eq(a.next().value,0),eq(a.next().value,1)
a=nfnt(55),eq(a.next().value,55),eq(a.next().value,56)
for(let i=56;i<123;i++){a.next()}
eq(a.next().value,124),eq(a.next().value,125)

///iterator
i=(i=0)=>({next:()=>({value:i++,done:false})})
a=i(55),eq(a.next().value,55),eq(a.next().value,56)
for(let i=56;i<123;i++){a.next()}
eq(a.next().value,124),eq(a.next().value,125)