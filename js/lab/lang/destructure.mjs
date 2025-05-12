import'#glob'
let a,b,c,f
///destructure array
f=([a,b],c=a+b)=>[a,b,c];eq(f([1,2]),[1,2,3])
,[a]=[1,2],eq(a,1)
,[,a]=[1,2],eq(a,2)

///array2obj,字段名只写一次但mutable
a=[12,3.4,'abc'],c={i:12,n:3.4,t:'abc'}
,b={},{0:b.i,1:b.n,2:b.t}=a;eq(b,c)
,b={},[b.i,b.n,b.t]=a;eq(b,c)
,f=(([i,n,t],b={i,n,t})=>b),b=f(a);eq(b,c)

///immutable但需写两次字段名
const[i,n,t]=a;b={i,n,t};eq(b,c)
b=(([i,n,t])=>({i,n,t}))(a);eq(b,c)
b=((i,n,t)=>({i,n,t}))(...a);eq(b,c)

///loop dynamically
f=a=>a.map(a=>({[a]:a})).reduce((p,n)=>({...p,...n}),{})
eq(f(a),{'12':12,'3.4':3.4,abc:'abc'})
f=a=>Object.assign(...a.map(a=>({[a]:a})))
eq(f(a),{'12':12,'3.4':3.4,abc:'abc'})

///普通却实际最短
f=a=>({i:a[0],n:a[1],t:a[2]});eq(b,c)

///nested
a=[12,[3.4,'abc'],{}]
f=([i,[n,t],o])=>[i,n,t,o]
eq(f(a),[12,3.4,'abc',{}])

a={i:12,o:{n:3.4,t:'abc'},l:[56]}
eq(a,{i:12,o:{n:3.4,t:'abc'},l:[56]})
f=({i,o})=>({i,o})
eq(f(a),{i:12,o:{n:3.4,t:'abc'}})
f=({i,o:{n}})=>({i,o:{n}})
eq(f(a),{i:12,o:{n:3.4}})
f=({i,o:{n,t}})=>({i,o:{n,t}})
eq(f(a),{i:12,o:{n:3.4,t:'abc'}})

f=({i,o:{n,t},l})=>({i,o:{n,t},l})
eq(f(a),{i:12,o:{n:3.4,t:'abc'},l:[56]})
f=({i,o:{n,t},l:[j]})=>({i,o:{n,t},l:[j]})
eq(f(a),{i:12,o:{n:3.4,t:'abc'},l:[56]})

///alias和destruct虽然都用`:`但是两种完全不同情况
///`:`alias时 并不是改名而是复制 实际两侧命名都生效
///destruct并不是alias而是展开 类似fn-call 不会命名不会赋值
f=({miss:{}})=>{}
throws(()=>f(a),TypeError)

f=({i:j,o:{n:m,t:s},l:[li]})=>({i,j,p:{m,n,s},l:[li]})
eq(f(a),{i:12,j:12,p:{m:3.4,n:3.4,s:'abc'},l:[56]})

///restruct obj
a={i:12,n:3.4,t:'abc'}

///很遗憾并没有找到真正简练的写法
