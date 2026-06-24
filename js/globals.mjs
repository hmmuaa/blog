import _as,{deepEqual as _eq,notDeepEqual as neq
	,throws,rejects}from'assert/strict'
import'./array.mjs'
let l=console.log
///forEach(p)会输出整个数组 用p1
,p=(...a)=>(l(...a),a[1]?a:a[0])
,p1=a=>(l(a),a)

///assert msg非常难找
,f=(msg,_,l='❗'
	,r=l)=>l+msg+r
,as=(a,msg)=>msg?_as(a,f(msg)):_as(a)
,eq=(a,b,msg)=>msg?_eq(a,b,f(msg)):_eq(a,b)
Object.assign(global,{p,p1,as,eq,neq,throws,rejects})