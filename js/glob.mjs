import assert,{deepEqual as eq,notDeepEqual as neq
	,throws,rejects}from'assert/strict'
const p=(...a)=>(console.log(...a),a[1]?a:a[0])
,proba=a=>Math.random()<a
,randomIn=(min,max)=>Math.random()*(max-min)+ +(min)
import * as date from'./date.mjs'
Object.assign(global,{p,assert,eq,neq,throws,rejects
	,randomIn,...date})

const groupBy=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
Object.groupBy=groupBy