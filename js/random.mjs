import'./_impo.mjs'
/*Math.random生成的是0到1 包含0排除1的小数 0<=a<1*/
export const random=(a,b,__,f=Math.random
	,inRange=(l,m)=>f()*(m-l)+l
)=>b?inRange(a,b):f()
let l=.1,m=.6,sep=2e3,a=[...Array(sep*5)].map(_=>random(l,m))
a.forEach(a=>as(l<a&&a<m,a))
as((a=a.filter(a=>a<.2).length,sep*.9<a&&a<sep*1.1),a)