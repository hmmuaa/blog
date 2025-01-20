import as,{deepStrictEqual as eq,notDeepStrictEqual as neq
	,throws,rejects}from'node:assert/strict'
const p=(...a)=>(console.log(...a),a[1]?a:a[0])
Object.assign(global,{p,as,eq,neq,throws,rejects})