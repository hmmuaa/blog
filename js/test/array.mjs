import'#glob'
let a,b,c,f,g
a=[,,,],a[1]=11
eq(a,[,11,,]),eq(a.length,3)
eq(a[1],11),eq(a[0],undefined),eq(a[5],undefined)

a=a.fill(null)
eq(a,[null,null,null]),neq(a,[,,,])

///init
a=5,b=[0,1,2,3,4]
eq(Array.from(Array(a).keys()),b)
eq([...Array(a).keys()],b)
as(b instanceof Array)
as(Array.isArray(b))
eq(typeof b,'object')
as([...Array(a).keys()]instanceof Array)
as(Array.from(Array(a).keys())instanceof Array)
let arr=l=>[...Array(l).keys()]
eq(arr(a),b)

///仿“for i” 经常的情况并不是要这个数组 而是要i
eq([...Array(5)].map((_,i)=>i),b)
eq(Array(5).fill().map((_,i)=>i),b)
eq(Array.from(Array(5),(_,i)=>i),b)
eq(Array.from({length:5},(_,i)=>i),b)
//eq([...{for(let i=0;i<5;i++)yield i}],b)//想尝试但没成功

///init with f
a=5,b=[0,1,4,9,16]
eq([...Array(a)].map((_,i)=>i*i),b)

arr=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
const rng=(f,t)=>arr(t-f+1,i=>f+i)
eq(arr(5),[0,1,2,3,4])
eq(arr(5,i=>i*i),[0,1,4,9,16])
eq(rng(5,7),[5,6,7])

///i超出并不会报错 iter中用到
eq(arr(5)[4],4)
eq(arr(5)[5],undefined)

///flat/flatMap
eq([0,[1,2],3].flat(),arr(4))
const{sign,floor:fl}=Math
const u=undefined
eq(arr(5,a=>a-2).map(a=>sign(a)==1?[fl(a/2),a%2]:[])
	,[[],[],[],[0,1],[1,0]])
eq(arr(5,a=>a-2).map(a=>sign(a)==1?[fl(a/2),a%2]:[]).flat()
	,[0,1,1,0])
eq(rng(-2,2).flatMap(a=>sign(a)==1?[fl(a/2),a%2]:[])
	,[0,1,1,0])
eq([1,11].flatMap(a=>sign(a)==1?[fl(a/4),a%4]:[]),arr(4))

///remove dup
const uniq=a=>[...new Set(a)]
eq(uniq([...'abcbadec']).join(''),'abcde')

///group by
throws(()=>Object.groupBy(a,b),TypeError)
throws(()=>Map.groupBy(a,b),TypeError)///不支持ES2024
f=(a,f)=>a.reduce((z,a,i,l,__,k=f(a))=>(
	z[k]=[...(z[k]||[]),a],z),{})
eq(f(arr(9),a=>a%3),{'0':[0,3,6],'1':[1,4,7],'2':[2,5,8]})

///group by 2map
f=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a.get(k)?.push(b)??a.set(k,[b]),a),new Map)
eq(f(arr(9),a=>a%3).get(1),[1,4,7])

///same w/group then skip through keys
/*注意这部分skipThrough Set实现经测都是错的
此处留档备查 改正的见下文continual:reduce实现*/
a='aabbccaabb'.split(''),b=[...new Set(a)]
eq(b,'abc'.split(''))
let skipThrough=(a,n=1,uniq=[...new Set(a)])=>
	a.slice(a.indexOf(uniq[n]))
eq(skipThrough(a).join(''),'bbccaabb')
eq(skipThrough(a,2).join(''),'ccaabb')
///错了
skipThrough=(a,n=1,id=a=>a,uniq=[...new Set(a.map(id))])=>
	a.slice(a.findIndex(a=>id(a)==uniq[n]))
eq(skipThrough(a).join(''),'bbccaabb')
eq(skipThrough(a,2).join(''),'ccaabb')

///continual partition
f=(a,id=a=>a)=>a.reduce(([y,z,k],a,_i,_r,ak=id(a))=>
	k==ak?[y,z.concat(a),k]:[y.concat([z]),[a],ak],[[],[]])
eq(f(a),[[[],['a','a'],['b','b'],['c','c'],['a','a']],['b','b'],'b'])
g=(a,id,[[,...r],l]=f(a,id))=>r.concat([l])
eq(g(a),[['a','a'],['b','b'],['c','c'],['a','a'],['b','b']])
eq(arr(10,a=>Math.floor(Math.sqrt(a*2+1))),[1,1,2,2,3,3,3,3,4,4])
eq(g(arr(10,a=>a*2+1),a=>Math.floor(Math.sqrt(a)))
	,[[1,3],[5,7],[9,11,13,15],[17,19]])

const splitByContinual=(a,id
	,f=(a,id=a=>a)=>a.reduce(([y,z,k],a,_i,_r,ak=id(a))=>
		k==ak?[y,z.concat(a),k]:[y.concat([z]),[a],ak],[[],[]])
	,g=(a,id,[[,...r],l]=f(a,id))=>r.concat([l]))=>(
	g(a,id)
)
eq(splitByContinual(arr(10,a=>a*2+1),a=>Math.floor(Math.sqrt(a)))
	,[[1,3],[5,7],[9,11,13,15],[17,19]])

///“输入法自定词库”中使用
const makeKeyinChain=a=>a.split('')
	.reduce((r,a)=>[r[0]+a].concat(r),['']).slice(0,-1)
eq(makeKeyinChain('abcd'),['abcd','abc','ab','a'])

///splice
a=[1,2,3,4,5]
b=a.splice(1,3)
eq(a,[1,5])
eq(b,[2,3,4])

///复制 借此补写只读函数
f=a=>Array.from(a)
a=arr(5),b=f(a),c=b.splice(1,3)
eq(a,[0,1,2,3,4])
eq(b,[0,4])
eq(c,[1,2,3])

f=a=>[...a]
a=arr(5),b=f(a).reverse()
eq(a,arr(5)),eq(b,arr(5).reverse())

a=arr(5),b=a.slice()//最方便的写法
eq(a,arr(5)),eq(b,arr(5)),
eq(b.reverse(),arr(5).reverse())
eq(a,arr(5)),eq(b,arr(5).reverse())

const
last=a=>a[a.length-1]
,last2=a=>a.at(-1)
,toReversed=a=>a.slice().reverse()
,toSorted=(a,b)=>a.slice().sort(b)
,findLast=(a,f)=>toReversed(a).find(f)
Object.assign(Array.prototype,{
	last(){return last(this)}
	,toReversed(){return toReversed(this)}
	,toSorted(by){return toSorted(this,by)}
	,findLast(f){return findLast(this,f)}})
// ,toSorted=(a,b)=>copy(a).sort(b)
// Array.prototype.toSorted=function(by){return toSorted(this,by)}
eq(arr(5).last(),4)
eq(arr(5).at(-1),4)
a=arr(5),b=a.toReversed();eq(a,arr(5)),eq(b,arr(5).reverse())
a=arr(5),b=a.toSorted((a,b)=>b-a)
eq(a,[0,1,2,3,4])
eq(b,[4,3,2,1,0])
eq(b.sort((a,b)=>a-b),arr(5))

///multiple sort
a=arr(5)
eq(a.toSorted((a,b)=>a%2-b%2||b-a),[4,2,0,3,1])//标准写法
eq(arr(10).toSorted((a,b,f=Math.floor)=>
	f(a/5)-f(b/5)||a%2-b%2||b-a),[4,2,0,3,1,8,6,9,7,5])

eq(a.toSorted((a,b)=>b-a).toSorted((a,b)=>a%2-b%2)
,[4,2,0,3,1])//排序条件倒序写 分段写后面

/*concat*/
eq([1,2].concat([]).concat([3]),[1,2,3])
eq([1,2].concat().concat([3]),[1,2,3])
eq([1,2].concat().concat(3),[1,2,3])//原来可以不套皮
eq([1,2].concat(undefined).concat([3]),[1,2,undefined,3])
eq([1,2].concat(null).concat([3]),[1,2,null,3])
eq([1,2].concat(u).concat([3]),[1,2,undefined,3])
let _
eq([1,2].concat(_).concat([3]),[1,2,undefined,3])

/*array to iterator
https://stackoverflow.com/a/79189447/2537458
(是ES2025标准 ajs不支持)*/
// const expensiveFunction = n => 2 * n;
// a = [2, 5, 78, 4];
// const result = a.values().map(expensiveFunction).find(r => r > 100);

// console.log(result);