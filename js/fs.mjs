import'./globals.mjs'
// import{stampms}from'./date.mjs'
import{readFile as rd,writeFile as wt}from'fs/promises'
import{join,extname as xn}from'path'
let
modify=async(f,t,m)=>{
	let a=await rd(f,'utf8')
	a=await m(a)
	await wt(t,a)
}
,output=(f,t,p=join('output',f))=>wt(p,t)
// ,output=(n,t,f=join('output',n+1+'.z'))=>wt(f,t,{flag:'wx'})
,getSample=n=>rd(join('samples',n),'utf8')
,samples=new Proxy({},{get:(_,v)=>getSample(v)})

/*存档文件#命名规则
/`|`､`:`在mx中不能用做文件名 (豆包云盘可以)
按同类事物分文件夹
`todo 标签#统编 原名 来源 文件`
/间隔都用两个空格 因为本名､文件名可能有空格
.todo:待办 需注意 如文件损坏需重下､需更新等
.标签:一组标签+打分 `∗∗标签∗@作者+标签`
.来源:`下载日期,下载点`
.文件:`∗密码#hash,原文件名`
#下载点有多种
-`项目名[rel-tag/#act]@uid,gh`
	例:“Marder#4144@gsantner,gh”
-`B###`
-网址:斜杠替换为‘⸳’

mx中 文件名不支持的字符 ? | :
*/
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
export default{modify,output,samples
	,url2f
}