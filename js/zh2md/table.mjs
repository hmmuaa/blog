import'#g'
/*md-table 解析生成整理
分层:md-array-obj*/
const{}=0
,m=(a,b)=>[...a.match(b)??[]]
,ma=(a,r)=>[...a.matchAll(r)].map(a=>[...a].slice(1))

,$=String.raw
,escape=a=>a.replace(/[\[\]]/g,$`\$&`)
,unescape=a=>a.replaceAll('\\','')
,txt2md=a=>a,md2txt=unescape

,set='\n|\n'//setup/辨识行 不同md版本辨识行略有区别
,md2arr=(a,[h,b]=a.split(set)
)=>({h:h.split('|')
	,b:b.split('\n').map(a=>a.split('|').map(md2txt))})

,{entries,keys,fromEntries}=Object
,toMap=(k,v)=>k.map((k,i)=>[k,v[i]])
///以'|'最多一行为准 得表格有多少列
,arr2obj=({h,b})=>b.map(a=>toMap(h,a)).map(fromEntries)

var _
,toObj=(k,v)=>fromEntries(toMap(k,v))
///cross-table, categorized-table, 2D-table
,row2ob=(a,k,[n,...v]=a.split('|')
)=>[n,toObj(k,v)]
,xt=(a
	,[h,b]=a.split(/\n[: -\|]+\n/)
)=>(h=h.split('|').slice(1)
	,Object.fromEntries(b.split('\n').map(a=>row2ob(a,h))))
eq(xt(`×|a|b|c
|---
1|h|i|j
2|o|p|q`)
	,{'1':{a:'h',b:'i',c:'j'},'2':{a:'o',b:'p',c:'q'}})
// p('a|b|c|d\n|---\nh|o|p|q\ni|u|v|w')

var _
,obj2arr=(x,a=entries(x)
	,h=a.flatMap(([n,a])=>keys(a)).unique()
	,b=a.map(([n,a])=>[...h.map(h=>a[h])])
	)=>({h,b})
,arr2md=({h,b}
	)=>[h,['|'],...b].map(a=>a.map(txt2md).join('|')).join('\n')

var xt=(a,cols=a=>a[keys(a)[0]],rows=a=>a[keys(a)[1]]
	,ch/*heads*/,rh
)=>(_
	,a=entries(a),ch??=a.map(a=>cols(a[1])).unique()
	,rh??=a.map(a=>rows(a[1])).unique()
	,[['|',...ch],[set]
		,...rh.map(r=>['**'+r+'**'
			,...ch.map(c=>a.find(a=>rows(a[1])==r&&cols(a[1])==c)?.[0]??' ')])
	].map(a=>a.join('|')).join('\n')
)

///clean before parse
var _
,setr=/(?<=\n)[ :\-\|]+(?=\n)/
,cell=a=>a.match(/^ +$/)?' ':a.trim()
/*行首的'|'有两种情况 1.一般可直接去掉'
2.当行首有两个或以上“|” 即空单元格时 则去掉一个会导致丢失
但本处之后用split('|')解析 则没有影响*/
,line=a=>a.replace(/^\||\|$/g,'').split('|').map(cell).join('|')
,clean=a=>a.replace(setr,'|||').split('\n').map(line).join('\n')

,td={
	parse:a=>[...a.matchAll(/(?<=\|)([^\|]+)(\|+)/g)]
		.map(([_,n,sp])=>Object.assign(n,{colSpan:sp.length}))
	,join:a=>a
}

var _
,samples={md:'a|b|c\n|\nh|i|j\no|p|q'
	,arr:{h:['a','b','c'],b:[['h','i','j'],['o','p','q']]}
	,obj:[{a:'h',b:'i',c:'j'},{a:'o',b:'p',c:'q'}]
}
,oba=Object.assign
eq(escape('[]'),$`\[\]`)
eq(unescape($`\[\]`),'[]')
eq(td.parse('a|b||c|||d'),[oba('b',{colSpan:2}),oba('c',{colSpan:3})])
eq(md2arr(samples.md),samples.arr)
eq(arr2obj(samples.arr),samples.obj)
eq(obj2arr(samples.obj),samples.arr)
eq(arr2md(samples.arr),samples.md)

var _
,a=await fs.samples['希腊语⸳爱若斯.md']
///用在线工具从docx导出的md 有不必要的全局escape
,a=unescape(a).split('\n\n')
,cl=clean(a[1])
,arr=md2arr(cl)
,md=arr2md(arr)
,_=eq(md,cl)

,obj=arr2obj(arr)
,_=eq(obj2arr(obj),arr)

,toMk=a=>a.replace('\n|\n','\n|---\n')
await fs.output('希腊语⸳爱若斯.md',toMk(md))

///交叉表
/*todo 先分裂会导致obj-init重复属性第1个失效
其实这个思路错了
需要的并不是先分裂 而是先整理完整列名
*/
var _
,cl=clean(a[3])
,arr=md2arr(cl)
,md=arr2md(arr)
,_=eq(md,cl)

,obj=arr2obj(arr)
// ,_=eq(obj2arr(obj),arr)