import es from'./error stack.mjs'
import{full} from'./error stack.mjs'
//import as from'./assert.mjs'
let log=console.log,assert=console.assert
log(11,es())

let fn=a=>log(a,es())
fn(11)///11 Error,testFn

log('两层参数（一层currying）取函数名')
let fn2=a=>b=>log(a,b,es(),'取不到')
fn2(11)(22)///11 22 Error,Object.<anonymous>
log(3)
let fn3=a=>b=>log(a,b,es().includes('fn'))(11)
fn3(22)///无输出
log(4)
let fn4=a=>(b=>log(a,b,es()))(11)
fn4(22)///22 11 Error,testFn⭕
log(5)
let fn5=(a=>b=>log(a,b,es().includes('fn')))(11)
fn5(22)///11 22 Error,Object.<anonymous>

//log(full())