import'#g'
const oba=Object.assign
///-+----+----+----#----+----+----+----#----+----+----+----#----+----+----+----
///正则可以*按格式*一次返回一组多个结果
eq('abcde'.match(/b|d/g),['b','d'])
eq('abcde'.match(/a(b)c(d)e/),oba(['abcde','b','d'],{index:0,input:'abcde',groups:undefined}))
/*分g和非g两种不同写法 写法用法不同
g较简单暂不测 本文研究非g写法和用法
写法指正则表达式语法 用法指js函数 两者需正确配合

#js函数
类似扩展''.split 从字符串取出几个所需部分
有match/match+g/matchAll/exec/split
其中split逻辑模式与其他不同
函数逻辑模式不同 决定了正则写法也不同

以下先测试一个一般的情况 即从字符串match所需部分内容
*/
let a='abcdefghijklmn',r=/[ah](.).(.)./,rg=/[ah](.).(.)./g
,u=oba(['abcde','b','d'],{index:0,input:'abcdefghijklmn',groups:undefined})
,v=oba(['hijkl','i','k'],{index:7,input:'abcdefghijklmn',groups:undefined})
eq(typeof r,'object'),as(r instanceof RegExp)
///matchAll能得到完整结果 matchAll必须+g
eq([...a.matchAll(rg)],[u,v])
throws(()=>a.matchAll(r),/matchAll called with a non-global RegExp/)
///如mdn所述 match+g会合并多个结果(developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll#better_access_to_capturing_groups_than_string.prototype.match)
eq(a.match(rg),['abcde','hijkl'])
/*不加g则返回第一组 但不合并*/
eq(a.match(r),u)
///exec则每次得到下一条结果
eq(rg.exec(a),u)
eq(rg.exec(a),v)
///split工作模式不同
eq(a.split(r),['','b','d','fg','i','k','mn'])
///split另撰文

///支持lookup
,rg=/(?<=[ah])(.)(?=.).(?<=[cj])(.)(?:.)(?=.)/g
eq([...a.matchAll(rg)]
	,[oba(['bcde','b','d'],{index:1,input:'abcdefghijklmn',groups:undefined})
	,oba(['ijkl','i','k'],{index:8,input:'abcdefghijklmn',groups:undefined})])
///注意(?:.)叫“Non-capturing” 实际在replace中并未排除
///在split时则有排除 但似乎和不分组部分无区别
eq(a.split(rg),['a','b','d','fgh','i','k','mn'])

eq(a.replaceAll(rg,1),'a1fgh1mn')
eq(a.replaceAll(rg,'_$&_$1_$2_')
	,'a_bcde_b_d_fgh_ijkl_i_k_mn')
eq(a.replaceAll(rg,a=>nsp(a)),`a'bcde'fgh'ijkl'mn`)
eq(a.replaceAll(rg,(...a)=>nsp(a))
	,`a['bcde','b','d',1,'abcdefghijklmn']fgh['ijkl','i','k',8,'abcdefghijklmn']mn`)
eq(a.replaceAll(rg,(a,b,c)=>`_${a}_${b}_${c}_`)
	,'a_bcde_b_d_fgh_ijkl_i_k_mn')
///以下无效写法
eq(a.replaceAll(rg,({...a})=>nsp(a))
	,`a{'0':'b','1':'c','2':'d','3':'e'}fgh{'0':'i','1':'j','2':'k','3':'l'}mn`)
eq(a.replaceAll(rg,([...a])=>nsp(a))
	,`a['b','c','d','e']fgh['i','j','k','l']mn`)
eq(a.replaceAll(rg,({index})=>nsp(index))
	,`aundefinedfghundefinedmn`)
eq(a.replaceAll(rg,function(){return nsp(arguments.index)})
	,`aundefinedfghundefinedmn`)

/*+group name*/
,rg=/(?<=[ah])(?<a>.)(?=.).(?<=[cj])(?<b>.)(?:.)(?=.)/g
eq([...a.matchAll(rg)]
	,[oba(['bcde','b','d'],{index:1,input:'abcdefghijklmn'
		,groups:oba(Object.create(null),{a:'b',b:'d'})})
	,oba(['ijkl','i','k'],{index:8,input:'abcdefghijklmn'
		,groups:oba(Object.create(null),{a:'i',b:'k'})})])

// p(a.replaceAll(rg,(...a)=>nsp(a.at(-1)))
// 	,`a['bcde','b','d',1,'abcdefghijklmn']fgh['ijkl','i','k',8,'abcdefghijklmn']mn`)
eq(a.replaceAll(rg,'_$&_$1_$2_')
	,'a_bcde_b_d_fgh_ijkl_i_k_mn')
eq(a.replaceAll(rg,'_$&_$<a>_$<b>_')
	,'a_bcde_b_d_fgh_ijkl_i_k_mn')
eq(a.replaceAll(rg,(a,b,c)=>`_${a}_${b}_${c}_`)
	,'a_bcde_b_d_fgh_ijkl_i_k_mn')

/*+indices*/
,rg=/(?<=[ah])(?<a>.)(?=.).(?<=[cj])(?<b>.)(?:.)(?=.)/gd
eq([...a.matchAll(rg)]
	,[oba(['bcde','b','d'],{index:1,input:'abcdefghijklmn'
		,groups:oba(Object.create(null),{a:'b',b:'d'})
		,indices:oba([[1,5],[1,2],[3,4]]
			,{groups:oba(Object.create(null),{a:[1,2],b:[3,4]})})}
	)
	,oba(['ijkl','i','k'],{index:8,input:'abcdefghijklmn'
		,groups:oba(Object.create(null),{a:'i',b:'k'})
		,indices:oba([[8,12],[8,9],[10,11]]
			,{groups:oba(Object.create(null),{a:[8,9],b:[10,11]})})}
	)])

///replaceAll取不到indices 已搜索确认
eq(a.replaceAll(rg,(...a)=>nsp(a.at(-1)))
	,`a[Object:null prototype]{a:'b',b:'d'}fgh[Object:null prototype]{a:'i',b:'k'}mn`)