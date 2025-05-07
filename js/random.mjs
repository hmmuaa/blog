import'./_impo.mjs'
/*Math.random生成的是0到1 包含0排除1的小数 0<=a<1*/
export const random=(a,b,__,f=Math.random
	,inRange=(l,m)=>f()*(m-l)+l
)=>b?inRange(a,b):f()
let l=.1,m=.6,a=[...Array(1e4)].map(_=>random(l,m))
a.forEach(a=>assert(l<a&&a<m,a))
assert((a=a.filter(a=>a<.2).length,1900<a&&a<2100),a)