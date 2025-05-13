import as,{deepEqual as eq,notDeepEqual as neq,throws,rejects}from'assert/strict'
import{inspect}from'util'
const p=(...a)=>(console.log(...a),a[1]?a:a[0])
,sort=a=>a.replaceAll(': ',':')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replaceAll(' [','[').replaceAll('] ',']')
,ns=a=>sort(inspect(a))
Object.assign(global,{p,ns,as,eq,neq,throws,rejects})