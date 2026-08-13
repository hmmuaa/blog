import'#g'
///避免写烦人的escape char'\' 两种方法
eq('\abc','abc'),eq(`\abc`,'abc')///正常引号都会转义
eq(String.raw`\abc`,'\\abc')///不转义方法1
let
f=String.raw;eq(f`\abc`,'\\abc')
f=a=>String.raw(a);eq(f`\abc`,'\\abc')
f=a=>String.raw(a)+123;eq(f`\abc`,'\\abc123')

f=a=>String.raw(a)
eq(f`\abc`+`de`,'\\abcde')///⚠️无法拼接 其实传进去的只有abc
throws(()=>f(`\abc`),TypeError)
throws(()=>f(['\abc']),TypeError)

f=a=>(''+a).slice(1,-1)///不转义方法2
eq(f(/\abc/),'\\abc')
eq(f(/\abc/)+f(/\def/),'\\abc\\def')

///#int
neq(-0,0),eq(-0+0,0)
neq('123',123)
eq(+'123',123),eq(-'123',-123)
neq(+'123','123')
eq(+'abc',NaN),eq(-'abc',NaN)
as(1<2)
as('1'<'2')
///二位数可能只算一位
as('2'>'10')
as('2'<'20')
as('2'<'30')
as(+'2'<+'10')

///bool2int4 array.sort
eq(false-1,-1),eq(true-1,0)
let
a=false;eq(a-1,-1);a=true;eq(a-1,0)
///反
a=false;eq(!a-1,0);a=true;eq(!a-1,-1)
a=false;eq(-a+0,0);a=true;eq(-a,-1)//不如上行简明 关键是!

///obj2int4 array.sort
eq(+null,0)
,eq(+!!undefined,0)
,eq(+!!{},1)

a=null			,eq(+a	,0)
a=undefined	,eq(+!!a,0)
a={}				,eq(+!!a,1)
a=null			,eq(+!!a,0)

eq(null-1,-1),eq(!!undefined-1,-1),eq(!!{}-1,0)
a=null			,eq(a-1		,-1)
a=undefined	,eq(!!a-1	,-1)
a={}				,eq(!!a-1	,0)
///反
a=undefined	,eq(!a-1	,0)
a=null			,eq(!a-1	,0)
a={}				,eq(!a-1	,-1)
///不如上组简明 关键是!
a=null			,eq(-a+0	,0)
a=undefined	,eq(-!!a+0,0)
a={}				,eq(-!!a	,-1)

a=[null,{},null];eq(a.sort((a,b)=>!a-1),[{},null,null])
a=[null,{},null];eq(a.sort(a=>!a-1),[{},null,null])
///似乎是不行的
//a=[null,{},null];eq(a.sort((a,b)=>+!!b),[{},null,null])

eq(5-null,5),eq(null-5,-5)
eq(5-!!undefined,5),eq(!!undefined-5,-5)
eq(5-!!{},4),eq(!!{}-5,-4)
a=[null,{},null];eq(a.sort((a,b)=>!a-!b),[{},null,null])
///todo:写得很晕还要测试确认
a=[null,[5],null];eq(a.sort((a,b)=>!a?.[0]-!b?.[0])
	,[[5],null,null])

///condition
neq(undefined,true),neq(undefined,false)
eq(!undefined,true)
eq(!!undefined,false)

neq(null,true),neq(null,false)
eq(!null,true)
eq(!!null,false)