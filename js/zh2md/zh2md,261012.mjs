/*中文mark-down zh⬇ Zh⬇️
	暂时只针对markor测试*/
const log=(...a)=>(console.log(...a),a[1]?a:a[0])
,{ok:as,equal:eq,deepEqual:deq}=await import('node:assert/strict')
,proc=a=>('\n'+a)
	///zd，考虑中文习惯调整md
	///不使用空格，开头“#、>、-、1.”后不用空格
	.replace(
		/(?<=\n)(#{1,6}|[-]|[1-9]\.)(?=.)/g
		,'$1 ')
	///开头两点表示自动排序号
	.replace(
		/\n\.(?=\S)/g
		,'\n1. ')
	
	///紧凑格式，个人习惯省略不必要的空行
	.replace(
		/(?<=>([^#].+\n)+)>/g
		,'>\n>')
	
	///补充
	///md的英语习惯以空格分单词，zd则一目一行
	///行头“~~”到行尾“~~”代表划掉，段尾可省略
	
	.slice(1)
/*修正知乎bug，引用不能分段，粘贴和导入都测试有bug
	修正方法是在空行插全角空格
*/
,fZhihu=a=>proc(a).replaceAll('\n>\n>','\n>　\n>')
	.replaceAll('\n\n>','\n　\n>')
const s=`\#班会
周三下午2:30开班会，有以下主要内容。
1.值日安排
2.征集图书分享
.实事讨论
>刘慈心《流浪地球2》上映
国产大片里程碑
>不会用AI的程序员不是好程序员
~~班会时间可能被数学占用
##值日生
-小明
-小强
>会后记录`
eq(proc(s),`\# 班会
周三下午2:30开班会，有以下主要内容。
1. 值日安排
2. 征集图书分享
1. 实事讨论
>刘慈心《流浪地球2》上映
国产大片里程碑
>
>不会用AI的程序员不是好程序员
~~班会时间可能被数学占用
## 值日生
- 小明
- 小强
>会后记录`
)
const{readFileSync:rd,writeFileSync,existsSync,mkdirSync}=await import('node:fs')
,{allNest}=await import('../lib/_collected/fs.mjs')
,{parse,format,dirname,join}=await import('path')
,i='/sdcard/a_a/Markor/文学/个人注解'
,o=''//'/sdcard/a_a/Markor/zh2md'
,wr=(p,t,d=dirname(p))=>(
	existsSync(d)||mkdirSync(d,{recursive:true})
	,writeFileSync(p,t,'utf8'))
allNest(i).filter(a=>a.endsWith('.zh'))
	.map(a=>[a,format({...parse(a),base:'',ext:'.zh.md'})])
	// .map(a=>[a,format((a=>({...a,dir:join(o,a.dir),ext:'zh2.md'}))(parse(a)))]))
	.forEach(([i,o])=>wr(o,proc(rd(i))))
//,a=
//