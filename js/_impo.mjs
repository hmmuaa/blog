import as,{deepEqual as eq,notDeepEqual as neq,throws,rejects}from'assert/strict'
const p=(...a)=>(console.log(...a),a[1]?a:a[0])
,proba=a=>Math.random()<a
Object.assign(global,{p,as,eq,neq,throws,rejects})

const groupBy=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
Object.groupBy=groupBy