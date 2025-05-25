import'#glob'
const ar=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
,range=(f,t)=>array(t-f+1,i=>f+i)
Object.assign(global,{ar})

///remove dup
const uniq=a=>[...new Set(a)]
,groupBy=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
Object.groupBy=groupBy

const
last=a=>a[a.length-1]
,toReversed=a=>a.slice().reverse()
,toSorted=(a,b)=>a.slice().sort(b)
,findLast=(a,f)=>toReversed(a).find(f)
Object.assign(Array.prototype,{
	last(){return last(this)}
	,toReversed(){return toReversed(this)}
	,toSorted(by){return toSorted(this,by)}
	,findLast(f){return findLast(this,f)}})