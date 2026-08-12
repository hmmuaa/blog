/*调整zh原文以在知乎发表*/
import'#g'
const{}={}
,characters={['Equal and Parallel To']:'⋕'}
,h=characters['Equal and Parallel To']
,proc=a=>('\n'+a)
	.replaceAll('\n#','\n'+h)
	.slice(1)
/*修正知乎bug，引用不能分段，粘贴和导入都测试有bug
	修正方法是在空行插全角空格
*/
,fZhihu=a=>proc(a).replaceAll('\n>\n>','\n>　\n>')
	.replaceAll('\n\n>','\n　\n>')
export default proc
const s=`\
高频使用豆包已经有段时间了
记一下关于声音语气的心得

#温柔陆辰
非常有特点 最早使用的男性声音
最早因为其语气非常柔和
常讨论神话 而AI爱学官方说教
陆辰则非常益于缓和气氛 至少不会过于自我

#青涩沐阳
较高昂 吐字满 自信 好像句句都押韵
资讯播报类常用`
eq(proc(s),`\
高频使用豆包已经有段时间了
记一下关于声音语气的心得

⋕温柔陆辰
非常有特点 最早使用的男性声音
最早因为其语气非常柔和
常讨论神话 而AI爱学官方说教
陆辰则非常益于缓和气氛 至少不会过于自我

⋕青涩沐阳
较高昂 吐字满 自信 好像句句都押韵
资讯播报类常用`
)
///安卓上所有换行被强制换两行的问题
/*在Word及富文本编辑器中 有Enter分段和Shift+Enter换行两种
而安卓中只能用Enter一种 (实体键盘未尝试
TermKey可以按Shift+Enter 但不能正确输入换行)

经测试 可在剪切板中将\n替换为\r
在知乎编辑器中粘贴(须网页版 切换到桌面模式)
粘贴后所见没换行 点预览 所有换行处都有个空格
再后退就看见换行都正确了 再次预览也是正确的
推测应该与预览无关 粘贴后就是正确的 只是显示问题*/
let
lf='\n'//\u000A Line Feed (LF/Unix换行符) 只能打出来的
,cr='\r'//\u000D Carriage Return (CR/旧Mac换行符) Win为CRLF
,ls='\u2028'//Line Separator
,ps='\u2029'//Paragraph Separator
eq('\u000A','\n'),eq('\x0A','\n')//三种写法相等
eq('\u2028',' '),eq('\u2029',' ')
let fixLines=(a=s)=>a.replaceAll(lf,cr)
export{fixLines}