import{random}from'./random.mjs'
import*as date from'./date.mjs'
const proba=a=>Math.random()<a
,array=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
,groupBy=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
Object.groupBy=groupBy
Object.assign(global,{random,array,...date})