import _as,{deepEqual as _eq,notDeepEqual as neq
	,throws,rejects}from'assert/strict'
const l=console.log
,p=(...a)=>(l(...a),a[1]?a:a[0])
///assert msg非常难找
,f=(msg,_,l='❗'
	,r=l)=>l+msg+r
,as=(a,msg)=>msg?_as(a,f(msg)):_as(a)
,eq=(a,b,msg)=>msg?_eq(a,b,f(msg)):_eq(a,b)
Object.assign(global,{p,as,eq,neq,throws,rejects})