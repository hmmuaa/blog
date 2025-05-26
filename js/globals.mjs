import as,{deepEqual as eq,notDeepEqual as neq,throws,rejects}from'assert/strict'
import{inspect}from'util'
const
///log+error stack (输出函数名)
p=console.log
Object.assign(global,{p,as,eq,neq,throws,rejects})