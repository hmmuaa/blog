/*中文mark-down z⬇ Z⬇️
暂时只针对markor测试
261012 相对旧版有了些格式调整*/
import'#g'
import ftree from'../logical tree.mjs'
const{}={}
,format=Object.values({
  paragraph:[/\n{2,}/,`\n\n`],
  line:[`\n`,`  \n`]
}).map(([pattern,standard])=>({pattern,standard}))
// ,_=p(format)
,spl=a=>ftree.build(a,format.map(a=>a.pattern))
,cpl=a=>ftree.flat(a,format.map(a=>a.standard))
,maps/*简单对应*/=`
*	**
_	*
`.split('\n').filter(a=>a).map(a=>a.split('\t'))
,prop=a=>(
  a=spl(a)
  ,a=cpl(a)
  ,p(a)
  ,a='\n'+a
	,a=maps.reduce((z,[a,b])=>z.replaceAll(a,b),a)
	,a
	///zd是按中文习惯调整md
	///不使用空格 开头“#、>、-、1.”后不用空格
	.replace(
		/(?<=\n)(#{1,6}|[-]|[1-9]\.)(?=.)/g
		,'$1 ')
	///开头两点表示自动排序号
	.replace(
		/\n\..(?=\S)/g
		,'\n1. ')
	
	///紧凑格式 省略不必要的空行
	.replace(
		/(?<=>([^#].+\n)+)>/g
		,'>\n>')
	
	///补充
	///md的英语习惯以空格分单词 zd则一目一行
	///行头“~~”到行尾“~~”代表划掉，段尾可省略
	
	.slice(1)
)
/*修正知乎bug，引用不能分段，粘贴和导入都测试有bug
	修正方法是在空行插全角空格
*/
const s=`\
#班会
*周三*下午_2:30_开班会 主要内容
1.值日安排
2.征集图书分享
..实事讨论
>刘慈心⟨流浪地球2⟩上映
国产大片里程碑
>不会用AI的程序员不是好程序员
~~班会时间可能被数学占用

##值日生
-小明
-小强

>会后记录`
eq(prop(s),`\
# 班会  
**周三**下午*2:30*开班会 主要内容  
1. 值日安排  
2. 征集图书分享  
1. 实事讨论  
>刘慈心⟨流浪地球2⟩上映  
国产大片里程碑  
>
>不会用AI的程序员不是好程序员  
~~班会时间可能被数学占用

## 值日生  
- 小明  
- 小强

>会后记录`
)
export default prop