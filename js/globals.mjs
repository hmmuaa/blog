import as,{deepEqual as eq,notDeepEqual as neq,throws,rejects}from'assert/strict'
import{inspect}from'util'
const pp=(a,_,b=inspect(a,{depth:3}),c=a+'')=>b==c?b:b+c
,p=a=>(console.log(a),a)
// const pp=(a,_,b=inspect(a,{depth:3}),c=a+'')=>b==c?b:b+c
// ,p=(...a)=>(console.log(...a.map(pp)),a[1]?a:a[0])
Object.assign(global,{p,as,eq,neq,throws,rejects})