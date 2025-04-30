import'#lab'
let f,d=200,t=new Date,
check=()=>(eq(Math.floor((new Date-t)/100),2),t=new Date)

///setTimeout来自nodejs delay来自autojs 用法没区别
import{setTimeout}from'timers/promises'
import{delay}from'lang'
assert(setTimeout(d)instanceof Promise)
assert(delay(d)instanceof Promise)
assert(typeof setTimeout(d),'Promise { <pending> }')
assert(typeof delay(d),'Promise { <pending> }')
await setTimeout(d),check()
await delay(d),check()

f=async d=>await setTimeout(d)
await f(d),check()
f=d=>setTimeout(d)
await f(d),check()

f=async d=>{
	const{setTimeout}=await import('timers/promises')
	await setTimeout(d)
}
await f(d),check()

f=async d=>
	await(await import('timers/promises')).setTimeout(d)
await f(d),check()

f=()=>async d=>
	await(await import('timers/promises')).setTimeout(d)
await f()(d),check()

f=(await import('timers/promises')).setTimeout
await f(d),check()

f=()=>(async d=>
	await(await import('timers/promises')).setTimeout(d)
)(d)
await f(d),check()

f=async d=>(({setTimeout})=>setTimeout(d))
	(await import('timers/promises'))
await f(d),check()

///有趣、要注意的写法，调用时不用await，但其实不是函数了
///因为top level支持await，可以省掉一对await、async
f=(()=>11)(await f(d))
check()

///async的恰当用法可能应该是
///“declare without await, awaits when using”
///一时想不出实例