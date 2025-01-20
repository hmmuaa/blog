import'#test'
let a,b,c,f
///destructure array
f=([a,b],c=a+b)=>[a,b,c]
eq(f([1,2]),[1,2,3])

///array2obj,字段名只写一次但mutable
a=[12,3.4,'abc'],c={i:12,n:3.4,t:'abc'}
,b={},{0:b.i,1:b.n,2:b.t}=a;eq(b,c)
,b={},[b.i,b.n,b.t]=a;eq(b,c)
,f=(([i,n,t],b={i,n,t})=>b),b=f(a);eq(b,c)

///immutable但需写两次字段名
const[i,n,t]=a;b={i,n,t};eq(b,c)
b=(([i,n,t])=>({i,n,t}))(a);eq(b,c)
b=((i,n,t)=>({i,n,t}))(...a);eq(b,c)

///表达式
f=a=>a.map(a=>({[a]:a})).reduce((p,n)=>({...p,...n}),{})
eq(f(a),{'12':12,'3.4':3.4,abc:'abc'})
f=a=>Object.assign(...a.map(a=>({[a]:a})))
eq(f(a),{'12':12,'3.4':3.4,abc:'abc'})

///普通却实际最短
f=a=>({i:a[0],n:a[1],t:a[2]});eq(b,c)

///restruct obj
a={i:12,n:3.4,t:'abc'}

///很遗憾并没有找到更简练的写法