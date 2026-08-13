import'#g'
var _
,oba=Object.assign

/*Negative look ahead (?<!
和Look head+Negated Character Class (?<=[^ 的区别
:[^|]要求匹配到一个字符。这是最关键的区别
匹配行开头的“|”时
*/
eq('a'.match(/(?<!\|)a/),oba(['a'],{index:0,input:'a',groups:undefined}))
eq('a'.match(/(?<=[^|])a/),null)

/*Markdown格式处理实践*/
/*一次返回一组多个结果*/
var _
,split=a=>('|'+a).replaceAll(/(?<=\|)([^|]+)(\|{2,})/g
		,(_,n,sp)=>array(sp.length,()=>n+'|').join('')).slice(1)
eq(split('a|b||c|||d'),'a|b|b|c|c|c|d')

var _
,clear=({1:n,2:sp,index:i})=>[n,sp,i]
,r=/(?<=\|)([^|]+)(\|+)/
,rg=/(?<=\|)([^|]+)(\|+)/g
,a='|a|b||c|'
eq([...a.matchAll(rg)].map(clear),[['a','|',1],['b','||',3],['c','|',6]])
throws(()=>a.matchAll(r),/matchAll called with a non-global RegExp/)

///如mdn所述 match+g会合并多个结果(developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll#better_access_to_capturing_groups_than_string.prototype.match)
eq(a.match(rg),['a|','b||','c|'])
/*不加g则返回第一组 但不合并*/
eq(a.match(r),oba(['a|','a','|'],{index:1,input:'|a|b||c|',groups:undefined}))

/*Treatment markdown table row
Supplement or un-trim
:add specific char to start and end if not exist
/A supplement is an extra part added to something
to make it complete, improve it, or fix a missing piece*/
var _
,matchEmpty=eq('ab'.match(/(?<=a)(?=b)/)[0],'')
,st=/(?<=^)(?=[^\|])/
eq('a|b||c'.match(st)[0],'')
eq('|a|b||c'.match(st),null)
st=/((?<=^)(?=[^\|]))(?:[^\|]*?)/
eq('a|b||c'.match(st)[0],'')
eq('|a|b||c'.match(st),null)
var ed=/(?<=.*)(?<!\|)(?=$)/
eq('a|b||c'.match(ed)[0],'')
eq('a|b||c|'.match(ed),null)
var stEd=/((?<=^)(?=[^\|]))(?:[^\|]*)(?<!\|)(?=$)/
// p('a|b||c'.match(stEd))

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