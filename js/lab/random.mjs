import{random,gaussian,skewed,clamped,ranged}from'../random.mjs'
const{random:rd,abs}=Math
const inRng=a=>(l,m)=>[l<a&&a<m,a]
,avg=l=>l.reduce((acc, c) => acc + c, 0) / l.length
,ar=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))

let f
,l=.1,m=.6,sep=2e3,a=ar(sep*5,_=>random(l,m))
a.forEach(a=>as(l<a&&a<m,a))
as((a=a.filter(a=>a<.2).length,sep*.9<a&&a<sep*1.1),a)

l=1e5
a=ar(l,_=>gaussian()).sort((a,b)=>a-b)
as(abs(avg(a))<.01)

// l=1e5,f=_=>skewed(2)
// a=ar(20,_=>avg(ar(l,f))).sort((a,b)=>a-b)
// p(a)
// a=ar(l,f).sort((a,b)=>a-b)
// as(...inRng(avg(a))(.71097,.716))

// f=_=>skewed(20)
// a=ar(20,_=>avg(ar(l,f))).sort((a,b)=>a-b)
// p(a)
// a=ar(l,f).sort((a,b)=>a-b)
// as(...inRng(avg(a))(.79553,.79786))

// p(a.map((v,i)=>[i,v]))

let ar=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
,l=1e6,ll=1,m=100
,f=_=>ranged(ll,m)
,a=ar(l,f)
a.forEach(a=>as(ll<a&&a<m,'**'+a))