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
,clear=({1:n,2:sp,index:i})=>[n,sp,i]
,ma=(a,r)=>[...a.matchAll(r)]
,mc=(a,r)=>[...a.matchAll(r)].map(clear)

/*Markdown格式处理实践
split colSpan*/
{
	const split=a=>('|'+a).replaceAll(/(?<=\|)([^|]+)(\|{2,})/g
		,(_,n,sp)=>array(sp.length,()=>n+'|').join('')).slice(1)
	eq(split('a|b||c|||d'),'a|b|b|c|c|c|d')
}
{
	let _
	,r=/(?<=\|)([^|]+)(\|+)/
	,rg=/(?<=\|)([^|]+)(\|+)/g
	,a='|a|b||c|'
	eq(mc(a,rg),[['a','|',1],['b','||',3],['c','|',6]])
}
/*Treatment markdown table row
Supplement or un-trim
:add specific char to start and end if not exist
/A supplement is an extra part added to something
to make it complete, improve it, or fix a missing piece*/
var _
,st=/(?<=^)(?=[^\|])/
eq('a|b||c'.match(st),oba([''],{index:0,input:'a|b||c',groups:undefined}))
eq('|a|b||c'.match(st),null)
st=/((?<=^)(?=[^\|]))(?:[^\|]*?)/
eq('a|b||c'.match(st),oba(['',''],{index:0,input:'a|b||c',groups:undefined}))
eq('|a|b||c'.match(st),null)
,st=/^(\|?)(.*)/
eq('a|b||c'.match(st),oba(['a|b||c','','a|b||c'],{index:0,input:'a|b||c',groups:undefined}))
eq('|a|b||c'.match(st),oba(['|a|b||c','|','a|b||c'],{index:0,input:'|a|b||c',groups:undefined}))
var ed=/(?<=.*)(?<!\|)(?=$)/
eq('a|b||c'.match(ed),oba([''],{index:6,input:'a|b||c',groups:undefined}))
eq('a|b||c|'.match(ed),null)
var stEd=/^(?:[^\|]*)(?<!\|)(?=$)/
// p('a|b||c'.match(stEd))

let//leave fin
r=/^(\|?)(.*(?=\|?))$/
// eq('a|b||c'	.match(r),oba(['a|b||c','','a|b||c'],{index:0,input:'a|b||c',groups:undefined}))
// eq('|a|b||c'.match(r),oba(['|a|b||c','|','a|b||c'],{index:0,input:'|a|b||c',groups:undefined}))
// eq('a|b||c|'.match(r),oba(['a|b||c','','a|b||c'],{index:0,input:'a|b||c|',groups:undefined}))

stEd=/^(\|?)(.*)(?=\|?$)(\|?)$/
eq('a|b||c'.match(stEd),oba(['a|b||c','','a|b||c',''],{index:0,input:'a|b||c',groups:undefined}))
eq('|a|b||c'.match(stEd),oba(['|a|b||c','|','a|b||c',''],{index:0,input:'|a|b||c',groups:undefined}))
stEd=/^(\|?)(.*)(?!$)(\|?)$/
eq('a|b||c|'.match(stEd),oba(['a|b||c|','','a|b||c','|'],{index:0,input:'a|b||c|',groups:undefined}))
// eq('|a|b||c|'.match(stEd),oba(['|a|b||c|','|','a|b||c','|'],{index:0,input:'|a|b||c|',groups:undefined}))

var _
,supSt=(a,c)=>a.replace(/(?<=^)(?=[^\|])/,'|')
,supEd=(a,c)=>a.replace(/(?<!\|)(?=$)/,'|')
,supStEd=(a,c)=>a.replace(/((?<=^)(?=[^\|])).*((?<!\|)(?=$))/,'|')
,t=(a,c)=>a.replace(/((?<=^)(?=[^\|]))/,p)
eq(supSt('a|b||c'),'|a|b||c')
eq(supSt('|a|b||c'),'|a|b||c')
eq(supEd('a|b||c'),'a|b||c|')
eq(supEd('a|b||c|'),'a|b||c|')
// p(t('|a|b||c'))