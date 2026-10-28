import'./globals.mjs'
// import{stampms}from'./date.mjs'
import fs,{readFile,writeFile as wt}from'fs/promises'
import path,{join}from'path'
/*
`process.cwd()`是命令行 运行node时的dir
path.resolve('.')同
cwd只在一次运行node有效 下一次不会保留记忆
:`/storage/emulated/0`
*/
eq(path.resolve('.'),process.cwd())
/*
`import.meta.filename/dirname/dir`是本fs文件的dir
:`/storage/emulated/0/a_a/gh/hmmuaa/blog/js/fs.mjs``
*/
as(import.meta.filename.endsWith('/js/+fs.mjs'))
as(import.meta.dirname.endsWith('/js'))
/*
`process.argv[1]`是entry
:`['/data/data/com.termux/files/usr/bin/node'
,'/storage/emulated/0/a_a/gh/hmmuaa/blog/js/array.mjs'
,..可以加更多]`
aj同
*/
///以entry为cwd
process.chdir(path.dirname(process.argv[1]))

const{}={}
,writeFile=(p,t,__,d=path.dirname(p))=>(
	fs.mkdir(d,{recursive:true}).then(fs.writeFile(p,t,'utf8')))
,writeWorkFile=d=>(f,t,__,p=join(d,f))=>(
	fs.mkdir(d,{recursive:true}).then(fs.writeFile(p,t,'utf8')))
,wf=writeWorkFile
export const{}={}
,modify=async(f,t,m)=>{
	let a=await readFile(f,'utf8')
	a=await m(a)
	await wt(t,a)
}
,getSample=n=>readFile(join('samples',n),'utf8')
,samples=new Proxy({},{get:(_,v)=>getSample(v)})
///test run outputs
,op=wf('.op')
///以上是程序使用的 以下是用户使用的
///工作结果
,output=(f,t,p=join('output',f))=>wt(p,t)
// ,output=(n,t,f=join('output',n+1+'.z'))=>wt(f,t,{flag:'wx'})

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
export const url2f_by_str=a=>a.replace(/^https:\/\/(www\.)?/,``)
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