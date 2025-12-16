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