import _as,{deepEqual as _eq,notDeepEqual as neq
	,throws,rejects}from'assert/strict'
const p=console.log
///assert msg非常难找
,l='❗'
,r=l,as=(a,msg)=>msg?_as(a,l+msg+r):_as(a)
,eq=(a,b,msg)=>msg?_eq(a,b,l+msg+r):_eq(a,b)
Object.assign(global,{p,as,eq,neq,throws,rejects})