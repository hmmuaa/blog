import'#g'
var _
,init=(l,f=i=>i,g=typeof f=='function'?f:()=>f
)=>Array.from({length:l},(_,i)=>g(i))
export default init

///remove dup
var _
,groupBy=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
Object.groupBy=groupBy

var _
,uniq=a=>[...new Set(a)]
,toReversed=a=>a.slice().reverse()
,toSorted=(a,b)=>a.slice().sort(b)
,findLast=(a,f)=>toReversed(a).find(f)
,transpose=a=>a[0].map((_,i)=>a.map(a=>a[i]))
Object.assign(Array.prototype,{
	unique(){return uniq(this)}
	,toReversed(){return toReversed(this)}
	,toSorted(by){return toSorted(this,by)}
	,findLast(f){return findLast(this,f)}
	,transpose(){return transpose(this)}
})