import le from'assert'//legacy
let{deepEqual,notDeepEqual:neq}=le
deepEqual(1,true),deepEqual(1,'1')
deepEqual([1,2],[1,2])
neq([1,2],[2,1])//需要顺序一致

import st from'assert/strict'
({deepEqual,notDeepEqual:neq}=st)
neq(1,true),neq(1,'1')
deepEqual([1,2],[1,2])
neq([1,2],[2,1])//需要顺序一致

///assert msg非常难找
const _={}
,_as=st,_eq=_as.deepEqual
,l='❗'
,r=l,as=(a,msg)=>msg?_as(a,l+msg+r):_as(a)
,eq=(a,b,msg)=>msg?_eq(a,b,l+msg+r):_eq(a)
as(0,'blabla')
eq(0,0,'blabla')
eq(0,1,'blabla')