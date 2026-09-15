import'#g'
/*找一个字符来转写“/”
参考分析:https://upliftorch.com/tools/url-codec/en/blog/url-encoding-guide.html
(及标原文档:https://www.rfc-editor.org/info/rfc3986/)
所有url中需转义的字符 即非reserved亦非unreserved字符
既不该出现在url中的字符 都可以
` ´ ¦ 等安卓文件名支持而URL不支持的字符
` 容易输入且日常不会用到 但在md中需转义
选用`⸳`
*/
eq(new URL('p://d.n/p;z').pathname,'/p;z')
eq(new URL('p://d.n/p^z').pathname,'/p^z')
eq(new URL('p://d.n/p#z').pathname,'/p')
eq(new URL('p://d.n/p`z').pathname,'/p%60z')
eq(new URL('p://d.n/p´z').pathname,'/p%C2%B4z')
eq(new URL('p://d.n/p¦z').pathname,'/p%C2%A6z')
eq(new URL('p://d.n/p⸳z').pathname,'/p%E2%B8%B3z')
eq(new URL('p://d.n/p z').pathname,'/p%E2%80%89z')//Thin Space/U+2009
///上划线也是个不错的选择
eq(new URL('p://d.n/p‾z').pathname,'/p%E2%80%BEz')
p(new URL(`p://u:p@h:8/p/q/f.x?q=1&r&s=字&t=${+new Date}&#h`))

let m=(a,b)=>[...a.match(b)??[]]
let a,r,f

///remove timestamp
,t='&t='+ +new Date
a=`&q=1&r&s=字${t}&`
	,r=/&t=[0-9]{10,}/
eq(m(a,r),[t])
eq(a.replace(r,''),'&q=1&r&s=字&')

let{}={}
,prep_by_replace=(a,f)=>({}
	,a=a.replace(/^\?/,`&`)
	,f(a).replace(/^\&/,``)
)
,esc=`⸳`
,prep=(a,f)=>(a=`&`+a.slice(1),f(a).slice(1))
,clearQuery=(a///去掉timestamp保持其余部分不变
	,r=/&t=[0-9]{10,}/
)=>prep(a,a=>a.replace(r,''))
,fixQuery=(a
	,prep=(a,f)=>(a=`&`+a.slice(1),esc+f(a).slice(1))
)=>(a=a.search,!a?a:'`'+clearQuery(a))

///URL to filename
,url2f_by_str=a=>a.replace(/^https:\/\/(www\.)?/,``)
	.replace(/\/$/,``)
	.replaceAll(`/`,esc)
,url2f=(a
	)=>(a=new URL(a)
	,a.searchParams.get('t')?.startsWith('1789')
		&&a.searchParams.delete('t')
	,a.hostname.replace(/^www\./i,``)
		+a.pathname.replace(/\/$/,``).replaceAll(`/`,esc)
		+fixQuery(a)
)

eq(clearQuery(a),'q=1&r&s=字&')
a=new URL(`https://u:p@d.n:8/p/q/f.x?q=1&r&s=字${t}&#h`)
eq(fixQuery(a),'`q=1&r&s=%E5%AD%97&')
eq(fixQuery(new URL(`p:d.n`)),'')

f=url2f_by_str
eq(f(`https://qq.com`),'qq.com')
eq(f(`https://www.qq.com`),'qq.com')
eq(f(`https://www.qq.com/aa`),'qq.com⸳aa')
eq(f(`https://www.qq.com/aa/`),'qq.com⸳aa')
eq(url2f(`https://qq.com`),'qq.com')
eq(url2f(`https://www.qq.com`),'qq.com')
eq(url2f(`https://www.qq.com/aa`),'qq.com⸳aa')
eq(url2f(`https://www.qq.com/aa/`),'qq.com⸳aa')
eq(url2f(`https://u:p@d.n:8/p/q/f.x?q=1&r&s=字&t=${+new Date}#h`)
	,'d.n⸳p⸳q⸳f.x⸳q=1&r=&s=%E5%AD%97')