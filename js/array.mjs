import'#gl'
const ar=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
Object.assign(global,{ar})

///remove dup
const uniq=a=>[...new Set(a)]
,groupBy=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
Object.groupBy=groupBy

const
toReversed=a=>a.slice().reverse()
,toSorted=(a,b)=>a.slice().sort(b)
,findLast=(a,f)=>toReversed(a).find(f)
// Object.assign(Array.prototype,{
// 	toReversed(){return toReversed(this)}
// 	,toSorted(by){return toSorted(this,by)}
// 	,findLast(f){return findLast(this,f)}})

///2025年12月26日
let f
f=(a,f)=>a.reduce((z,a,i,l,_,k=f(a))=>(
	z[k]=[...(z[k]||[]),a],z),{})

///abab,interleave
const gr=f
f=a=>Object.values(gr(a,i=>i%2))