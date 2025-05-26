import'./array.mjs'
import{random,ranged}from'./random.mjs'
import*as date from'./date.mjs'

import{short}from'./error stack.mjs'
///log+error stack (输出函数名)
const log=console.log
,p=(...a)=>(log(short(Error().stack),...a),a[1]?a:a[0])

Object.assign(global,{p,random,ranged,...date})