import'#g'
const oba=Object.assign

/*Negative look ahead (?<!
和Look ahead+Negated Character Class (?<=[^ 的区别
:[^|]要求匹配到一个字符 这是最关键的区别
匹配行开头的“|”时
*/
eq('a'.match(/(?<!\|)a/),oba(['a'],{index:0,input:'a',groups:undefined}))
eq('a'.match(/(?<=[^|])a/),null)

///match empty,可以用空括号或省略
eq('ab'.match(/(?<=a)()(?=b)/g),[''])
eq('ab'.match(/(?<=a)(?=b)/g),[''])

var _
,m=(a,b)=>[...a.match(b)??[]]
,ma=(a,r)=>[...a.matchAll(r)].map(a=>[...a].slice(1))

///Markdown格式处理实践
///解析单元格
{
	let _
	,r=/(?<=\|)([^|]+)(\|+)/
	,rg=/(?<=\|)([^|]+)(\|+)/g
	,a='|a|b||c|'
	eq(ma(a,rg),[['a','|'],['b','||'],['c','|']])
}
///split colSpan /split:分裂
{
	const split=a=>('|'+a).replaceAll(/(?<=\|)([^|]+)(\|{2,})/g
		,(_,n,sp)=>array(sp.length,()=>n+'|').join('')).slice(1)
	eq(split('a|b||c|||d'),'a|b|b|c|c|c|d')
}
/*Treatment markdown table row
Supplement or un-trim
:add specific char to start and end if not exist
/A supplement is an extra part added to something
to make it complete, improve it, or fix a missing piece*/
var r
r=/^(\|?)(.*)/
eq(m('a|b||c',r),['a|b||c','','a|b||c'])
eq(m('|a|b||c',r),['|a|b||c','|','a|b||c'])
r=/^(\|?)(.*?)(\|?)$/
eq(m('a|b||c',r),['a|b||c','','a|b||c',''])
eq(m('|a|b||c',r),['|a|b||c','|','a|b||c',''])
eq(m('a|b||c|',r),['a|b||c|','','a|b||c','|'])
eq(m('|a|b||c|',r),['|a|b||c|','|','a|b||c','|'])
var
f=(a,c)=>a.replace(r,'|$2|')
eq(f('a|b||c'),'|a|b||c|')
eq(f('|a|b||c'),'|a|b||c|')
eq(f('a|b||c|'),'|a|b||c|')
eq(f('|a|b||c|'),'|a|b||c|')