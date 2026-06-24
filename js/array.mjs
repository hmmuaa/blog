import'#g'
const ar=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
Object.assign(global,{ar})

///remove dup
const uniq=a=>[...new Set(a)]
,groupBy=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
Object.groupBy=groupBy

let
toReversed=a=>a.slice().reverse()
,toSorted=(a,b)=>a.slice().sort(b)
,findLast=(a,f)=>toReversed(a).find(f)
,transpose=a=>a[0].map((_,i)=>a.map(a=>a[i]))
Object.assign(Array.prototype,{
	toReversed(){return toReversed(this)}
	,toSorted(by){return toSorted(this,by)}
	,findLast(f){return findLast(this,f)}
	,transpose(){return transpose(this)}
})