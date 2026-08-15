import as,{deepEqual as eq}from'node:assert/strict'
import{x,y}from'./exports and globals.mjs'
const log=console.log
eq([a,b,x,y],[11,22,66,77])
eq(global.a,11)///全局变量可以这样访问
eq(Object.a,undefined)
global.c=99
eq(c,99)