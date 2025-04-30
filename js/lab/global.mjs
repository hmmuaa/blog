import assert,{deepEqual as eq,notDeepEqual as neq
	,throws,rejects}from'assert/strict'
const p=(...a)=>(console.log(...a),a[1]?a:a[0])
Object.assign(global,{p,assert,eq,neq,throws,rejects})