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

///扩展
,prep=(a,f)=>(a=`&`+a.slice(1),f(a).slice(1))
,clearQuery=(a///去掉timestamp保持其余部分不变
	,r=/&t=[0-9]{10,}/
)=>prep(a,a=>a.replace(r,''))
,fixQuery=(a
	,prep=(a,f)=>(a=`&`+a.slice(1),'`'+f(a).slice(1))
)=>(a=a.search,!a?a:'`'+clearQuery(a))

///URL to filename
,url2f_by_str=a=>a.replace(/^https:\/\/(www\.)?/,``)
	.replace(/\/$/,``)
	.replaceAll(`/`,'`')
,url2f=(a
	)=>(a=new URL(a)
	,a.searchParams.get('t')?.startsWith('1789')
		&&a.searchParams.delete('t')
	,a.hostname.replace(/^www\./i,``)
		+a.pathname.replace(/\/$/,``).replaceAll(`/`,'`')
		+fixQuery(a)
)
export default{modify,output,samples
	,url2f
}