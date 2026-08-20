import'#g'//md-table解析生成整理
/*
#表格有几种情况?
1.最简单的数据表格 行是项 列是项的属性
2.交叉/分类表格 表现项的交叉分类 每格是一项 所属行列为属性
3.分类加数据
*/
var _
,m=(a,b)=>[...a.match(b)??[]]
,ma=(a,r)=>[...a.matchAll(r)].map(a=>[...a].slice(1))

,$=String.raw
,escape=a=>a.replace(/[\[\]]/g,$`\$&`)
,unescape=a=>a.replaceAll('\\','')
,txt2md=a=>a,md2txt=unescape

,tds=(a,_,__
	,prep=a=>a.replace(/^(\|?)(.*?)(\|?)$/,'|$2|')
	,rx=/(?<=\|)([^|]+)(\|+)/g
	,f=a=>ma(a,rx)
)=>(_
	,f(prep(a)).flatMap(([a,i])=>array(i.length,a))
)
,heads=a=>(_
	,a.split('\n').map(tds).transpose().map(a=>a.join('-'))
)
,set='\n|\n'//setup/辨识行 不同md版本辨识行略有区别
,md2dom=(a,[h,b]=a.split(set)
)=>({h:heads(h)
	,b:b.split('\n').map(a=>a.split('|').map(md2txt))})
,dom2md=({h,b}
)=>[h,['|'],...b].map(a=>a.map(txt2md).join('|')).join('\n')

,{entries,keys,fromEntries}=Object
,toMap=(k,v)=>k.map((k,i)=>[k,v[i]])
///以'|'最多一行为准 得表格有多少列
,dom2obj=({h,b})=>b.map(a=>toMap(h,a)).map(fromEntries)
,obj2dom=(x,a=entries(x)
	,h=a.flatMap(([n,a])=>keys(a)).unique()
	,b=a.map(([n,a])=>[...h.map(h=>a[h])])
	)=>({h,b})


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
,samples={
	md:'a|b|c\n|\nh|i|j\no|p|q',
	arr:{h:['a','b','c'],b:[['h','i','j'],['o','p','q']]},
	obj:[{a:'h',b:'i',c:'j'},{a:'o',b:'p',c:'q'}],
	
	cat:{md:'a||b||\nh|i|h|i\n|\no|p|q|r\nu|v|w|x'
		,arr:{h:['a-h','a-i','b-h','b-i'],b:[['o','p','q','r'],['u','v','w','x']]}
		,obj:[{'a-h':'o','a-i':'p','b-h':'q','b-i':'r'},{'a-h':'u','a-i':'v','b-h':'w','b-i':'x'}]}
}
,oba=Object.assign
eq(escape('[]'),$`\[\]`)
eq(unescape($`\[\]`),'[]')
eq(td.parse('a|b||c|||d'),[oba('b',{colSpan:2}),oba('c',{colSpan:3})])

a=samples
eq(md2dom(a.md),a.arr)
eq(dom2obj(a.arr),a.obj)
eq(obj2dom(a.obj),a.arr)
eq(dom2md(a.arr),a.md)

a=samples.cat
eq(md2dom(a.md),a.arr)
eq(dom2obj(a.arr),a.obj)
eq(obj2dom(a.obj),a.arr)
///还原没写
// eq(dom2md(a.arr),a.md)

let dom,md,mk
dom={h:['el','mo','ru','mr'],b:[['Earth','Cardinal','Saturn',undefined],['Air','Fixed','Saturn','Uranus']]},
md=`el|mo|ru|mr\n|\n🜃|🜍|♄|\n🜁|🜔|♄|♅`
mk=`el|mo|ru|mr\n|---\n🜃|🜍|♄|\n🜁|🜔|♄|♅`
let md2mk=a=>a.replace('\n|\n','\n|---\n')
import{sample as zd}from'./星座.mjs'
eq(obj2dom(zd),dom)
eq(dom2md(dom),md)
eq(md2mk(md),mk)
await fs.output('星座.md',mk)
// eq(dataTable(fromEntries(entries(zd).slice(-3,-1)))
// 	,'||el|mo|ru|mr\n|---\n♑︎|🜃|🜍|♄|\n♒︎|🜁|🜔|♄|♅')
// eq(xt(zd),'||🜂|🜃|🜁|🜄\n|---\n**🜍**|♈︎|♑︎|♎︎|♋︎\n**🜔**|♌︎|♉︎|♒︎|♏︎\n**☿**|♐︎|♍︎|♊︎|♓︎')
// var tt=a=>'#### #'+a
// eq(tt`Zodiacs`,'#### #Zodiacs')
// await fs.output('zodiac',[tt`Zodiacs`,dt(zd)
// 	,tt`Categorized`,xt(zd)
// 	,tt`Rulers`,xt(zd,a=>a.ru,a=>a.el,pl,el)
// 	].join('\n'))


var _
,a=await fs.samples['希腊语⸳爱若斯.md']
///用在线工具从docx导出的md 有不必要的全局escape
,a=unescape(a).split('\n\n')
,cl=clean(a[1])
,arr=md2dom(cl)
md=dom2md(arr)
eq(md,cl)

let obj=dom2obj(arr)
eq(obj2dom(obj),arr)

await fs.output('希腊语⸳爱若斯.md',md2mk(md))

///交叉表
/*todo 先分裂会导致obj-init重复属性第1个失效
其实这个思路错了
需要的并不是先分裂 而是先整理完整列名
*/
var _
,cl=clean(a[4])
,arr=md2dom(cl)
md=dom2md(arr)
// ,_=eq(md,cl)

// ,obj=dom2obj(arr)
// ,_=eq(obj2dom(obj),arr)