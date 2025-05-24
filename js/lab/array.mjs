import'#glob'
let a,b,c,f
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
const seq=l=>[...Array(l).keys()]
eq(seq(a),b)

///仿“for i” 经常的情况并不是要这个数组 而是要i
eq([...Array(5)].map((_,i)=>i),b)
eq(Array(5).fill().map((_,i)=>i),b)
eq(Array.from(Array(5),(_,i)=>i),b)
eq(Array.from({length:5},(_,i)=>i),b)
//eq([...{for(let i=0;i<5;i++)yield i}],b)//想尝试但没成功

///init with f
a=5,b=[0,1,4,9,16]
eq([...Array(a)].map((_,i)=>i*i),b)

const ar=(l,f=i=>i)=>Array.from({length:l},(_,i)=>f(i))
,range=(f,t)=>array(t-f+1,i=>f+i)
eq(array(5),[0,1,2,3,4])
eq(array(5,i=>i*i),[0,1,4,9,16])
eq(range(5,7),[5,6,7])

///i超出并不会报错 iter中用到
eq(seq(5)[4],4)
eq(seq(5)[5],undefined)

///remove dup
const uniq=a=>[...new Set(a)]
eq(uniq([...'abcbadec']).join(''),'abcde')

///group by
a=seq(9),b=a=>a<5,c=seq(5)
throws(()=>Object.groupBy(a,b),TypeError)
throws(()=>Map.groupBy(a,b),TypeError)///不支持ES2024
f=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a[k]=[...(a[k]||[]),b],a),{})
eq(f(a,b)[true],c)

///group by 2map
f=(a,f)=>a.reduce((a,b,i,l,__,k=f(b,i,l))=>(
	a.get(k)?.push(b)??a.set(k,[b]),a),new Map)
eq(f(a,b).get(true),c)

///same w/group then skip through keys,
let skipThrough=(a,n=1,uniq=[...new Set(a)])=>
	a.slice(a.indexOf(uniq[n]))
a='aabbcc'.split('')
eq(skipThrough(a).join(''),'bbcc')
eq(skipThrough(a,2).join(''),'cc')

skipThrough=(a,n=1,id=a=>a,uniq=[...new Set(a.map(id))])=>
	a.slice(a.findIndex(a=>id(a)==uniq[n]))
eq(skipThrough(a).join(''),'bbcc')
eq(skipThrough(a,2).join(''),'cc')

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
a=seq(5),b=f(a),c=b.splice(1,3)
eq(a,[0,1,2,3,4])
eq(b,[0,4])
eq(c,[1,2,3])

f=a=>[...a]
a=seq(5),b=f(a).reverse()
eq(a,seq(5)),eq(b,seq(5).reverse())

a=seq(5),b=a.slice()//最方便的写法
eq(a,seq(5)),eq(b,seq(5)),
eq(b.reverse(),seq(5).reverse())
eq(a,seq(5)),eq(b,seq(5).reverse())

const
toReversed=a=>a.slice().reverse()
,toSorted=(a,b)=>a.slice().sort(b)
,findLast=(a,f)=>toReversed(a).find(f)
Object.assign(Array.prototype,{
	toReversed(){return toReversed(this)}
	,toSorted(by){return toSorted(this,by)}
	,findLast(f){return findLast(this,f)}})
// ,toSorted=(a,b)=>copy(a).sort(b)
// Array.prototype.toSorted=function(by){return toSorted(this,by)}
a=seq(5),b=a.toReversed();eq(a,seq(5)),eq(b,seq(5).reverse())
a=seq(5),b=a.toSorted((a,b)=>b-a)
eq(a,[0,1,2,3,4])
eq(b,[4,3,2,1,0])
eq(b.sort((a,b)=>a-b),seq(5))

///multiple sort
a=seq(5)
eq(a.toSorted((a,b)=>a%2-b%2||b-a),[4,2,0,3,1])//标准写法
eq(seq(10).toSorted((a,b,f=Math.floor)=>
	f(a/5)-f(b/5)||a%2-b%2||b-a),[4,2,0,3,1,8,6,9,7,5])

eq(a.toSorted((a,b)=>b-a).toSorted((a,b)=>a%2-b%2)
,[4,2,0,3,1])//排序条件倒序写 分段写后面

/*array to iterator
https://stackoverflow.com/a/79189447/2537458
(是ES2025标准 ajs不支持)*/
// const expensiveFunction = n => 2 * n;
// a = [2, 5, 78, 4];
// const result = a.values().map(expensiveFunction).find(r => r > 100);

// console.log(result);