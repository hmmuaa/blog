import'#glob'
import{select}from'accessibility'
import{NotFoundError}from'ui_selector'
import{TimeoutError}from'lang'
import{setTimeout as to}from'timers/promises'
///文档没写清“timeout”怎么用 在此尝试实测
///先测无timeout 在调试界面 找log窗左侧的下拉
let s=a=>select({text:a}),v='Verbose',i='Info'
,a=await s(v).all();eq(a.length,1),eq(a[0].text,'Verbose')
await s(v).first().then(a=>eq(a.text,'Verbose'))
await s(v).findFirst().then(a=>eq(a.text,'Verbose'))
await s(v).firstOrNull().then(a=>eq(a.text,'Verbose'))
await s(v).findFirstOrNull().then(a=>eq(a.text,'Verbose'))

///默认隐藏的下拉项 找不到
a=await s(i).all();eq(a.length,0)
await rejects(s(i).first(),NotFoundError)
await s(i).firstOrNull().then(a=>eq(a,null))

///*使用timeout时 首先注意状态记忆bug 见后文测试

///如果没找到 没有timeout时
///findFirst/findFirstOrNull默认好像无限重试无超时直到找到为止
///但异步执行不阻塞线程 ajs进程不会终止
///有timeout时 findFirst就抛异常
///findFirstOrNull则返回null 很好理解
///await s(i).findFirst()//无timeout 一直等找到为止
///await s(i).findFirstOrNull()//,,并不会返回null
await rejects(s(i).timeout(100).findFirst(),TimeoutError)
await s(i).timeout(100).findFirstOrNull().then(a=>eq(a,null))
///再看文档，所有“find”开头的函数都有参数options
///应该都支持timeout/maxRetries

///点击下拉找到隐藏项
s(i).findFirst().then(a=>eq(a.text,'Info'))
await s(v).first().then(a=>a.parent.click()),await to(100)
await s(v).first().then(a=>a.parent.click())

///即使没完成一次完整搜索 也会被timeout打断
///实测timeout 100有可能找不到 越低越难 实用500吧
///和性能 和同时运行的APP有关
///因此平时可能更适用maxRetries
await rejects(s(v).timeout(10).findFirst(),TimeoutError)
await s(v).timeout(10).findFirstOrNull().then(a=>eq(a,null))
///maxRetries(0)则确保完成一次查找
await s(v).maxRetries(0).findFirstOrNull()
	.then(a=>eq(a.text,'Verbose'))

///#bug
///注意timeout记忆bug 前面只要用过timeout就会被记住
///包括s.find...({timeout...})也是 这应该算bug
///重设s后又是默认timeout
///timeout+all时应该也有bug
///推测 正常all应该是不支持timeout 会忽略
s=select({text:'Info'})///正常写
await s.timeout(9e9).all().then(a=>eq(a.length,0))///timeout对all无效
///但前面用timeout+find后有状态记忆
///之后all处理有误 导致timeout有效 并且可设值
await s.timeout(0).findFirstOrNull()
await rejects(s.timeout(100).all(),TimeoutError)
///但正常使用中一般不会重复使用s 也很容易避免