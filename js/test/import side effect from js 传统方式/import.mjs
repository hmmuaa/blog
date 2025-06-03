import as,{equal as eq,deepEqual as deq}
	from'node:assert/strict'
import'./imports.js'
import z,{x,y}from'./imports.js'
const log=console.log
log(a,b,x,y,z)
eq(global.a,11)///全局变量可以这样访问
eq(Object.a,undefined)
global.c=99
eq(c,99)