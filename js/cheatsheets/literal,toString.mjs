import'#g'
///toString and like
var a='abc',i=123,b,c

,vo={i:i,valueOf:()=>a}
,ts={i:i,toString:()=>a}
,oa=Object.assign(a,{i:i})
,ns=((b=new String(a))=>(b.i=i,b))()
;
[vo,ts,oa,ns].forEach(b=>(
	eq(''+b,a),eq(b.i,i),as(b==a),neq(b,a)
	,eq(typeof b,'object'),as(b instanceof Object)
))
///vo和ts 函数引用不相等 无法使用deepEqual
neq(vo,{i:i,valueOf:()=>a}
	,{i:i,valueOf:vo.valueOf})//保持引用相同
neq(ts,{i:i,toString:()=>a}
	,{i:i,toString:ts.toString})
eq(oa,Object.assign(a,{i:i}))//可以deepEqual
c=new String(a),c.i=i,eq(ns,c)///可以重建 但没有简单语法

eq(oa,ns)//Object assign和new String结果相等

///valueOf优先于toString
b={i:i,valueOf:()=>'valueOf',toString:()=>'toString'}
eq(''+b,'valueOf')

///⚠️“Object.assign”并没改字符串a 这不同于对象
a='abc'
b=Object.assign(a,{i:i})
eq(b.i,123)
eq(a.i,undefined)

///注意new不能省略
throws(()=>String(a).i=i,/^TypeError: Cannot create property 'i' on string 'abc'/)

eq(nsp(vo),`{i:123,valueOf:[Function:valueOf]}`)
eq(nsp(ts),`{i:123,toString:[Function:toString]}`)
eq(nsp(oa),`[String:'abc']{i:123}`)
eq(nsp(ns),`[String:'abc']{i:123}`)

let on=JSON.stringify
eq(on(vo),`{"i":123}`)
eq(on(ts),`{"i":123}`)
///会直接取字符串值 忽略属性
eq(on(oa),`"abc"`)
eq(on(ns),`"abc"`)
eq(on([ns]),`["abc"]`)
eq(on({ns}),`{"ns":"abc"}`)

as(String(a)===String(a))
as(String(a)===a)