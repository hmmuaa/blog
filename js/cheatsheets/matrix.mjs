import'#gl'
const{floor:fl}=Math
const ar=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
eq(ar(5,a=>a%2),[0,1,0,1,0])
eq(ar(5,a=>fl(a/2)),[0,0,1,1,2])
const{}={}
///cols,rows,ltrb
,mt=(c,r,l,t,rt,b,__,w=(rt-l)/c,h=(b-t)/r)=>
	(i,rn=fl(i/c),cn=i%c)=>[cn*w+l,rn*h+t,++cn*w+l,++rn*h+t]
,trbl=(c,r,t,rt,b,l,__,w=(rt-l)/c,h=(b-t)/r)=>
	(i,rn=fl(i/c),cn=i%c)=>[rn*h+t,++cn*w+l,++rn*h+t,--cn*w+l]
let f
f=mt(2,3,100,100,300,400)
eq(f(0),[100,100,200,200])
eq(f(1),[200,100,300,200])
eq(f(2),[100,200,200,300])
eq(f(3),[200,200,300,300])
eq(f(4),[100,300,200,400])
eq(f(5),[200,300,300,400])
f=trbl(2,3,100,300,400,100)
eq(f(0),[100,200,200,100])
eq(f(1),[100,300,200,200])
eq(f(2),[200,200,300,100])
eq(f(3),[200,300,300,200])
eq(f(4),[300,200,400,100])
eq(f(5),[300,300,400,200])