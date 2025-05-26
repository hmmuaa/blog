import'#glob';import'../array.mjs'
import{format as uf}from'util'
///#函数名
///arrow fn写法
let f=_=>Error().stack
,st=`Error
    at f (file:///storage/emulated/0/a_a/gh/hmmuaa/blog/js/lab/Node.js/log+error%20stack.mjs:5:10)
    at file:///storage/emulated/0/a_a/gh/hmmuaa/blog/js/lab/Node.js/log+error%20stack.mjs:15:4
    at ModuleJob.run `
,ed=`(node:internal/modules/esm/module_job:195:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:337:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12)`
eq(f(),st+ed)

let v=(a,[b,c]=a.split('\n    at ModuleJob.run '))=>(
	eq(c,ed),b.split('\n').splice(1).map(a=>a.slice(6,11))
	)
eq(v(f()),[' f (f',' file'])

///两层参数
f=a=>b=>Error().stack
eq(v(f()()),[' file',' file'])
f=(a=>b=>Error().stack)()
eq(v(f()),[' file',' file'])
f=a=>(b=>Error().stack)()
///这种写法在log和fn中间会多一行特殊的
///这行没函数名 有路径但没括号 很容易识别
eq(v(f()),[' file',' f (f',' file'])

///error stack有函数名 只是在第三行
///util.format会返回console.log内容
let log=console.log
,fix=(s,...a)=>s
	.split(' (file:///')[1]///早先写法 可能需要根据以上测试更新
	.split(' at ').last()
,p=(...a)=>(log(fix(Error().stack),...a),a[1]?a:a[0])
f=a=>p(a)
eq(f(11),11)
f=a=>(b=>p(a,b))(11)
eq(f(22),[22,11])
f=async a=>(async b=>await p(a,b))(11)
eq(await f(22),[22,11])

///不在函数中调用时 .js会取到'Object.<anonymous>'
///.mjs会取到本文件路径'file:///storage/...'
as(p(1,2).startsWith('file:///'))

let q=(...a)=>{const b=new Error().stack
	.split(' (file:///')[1]
	.split(' ').last()///“at ”、“async ”
	return b.startsWith('file:///')?a:[b,...a]}
p=a=>uf(q(a))
console.log(p(11,22),1)
///TODO:以下需继续整理更正

///#合并“返回结果”（见log return）
log=(...a)=>(console.log(new Error().stack
	.split(' (file:///')[1]///以上两种写法都正好在两个“ (/”中间
	.split(' ').last()///“at ”、“async ”
	.replace('Object.exports.','')///lang.delay、Object.exports.run
	,...a),a[1]?a:a[0])

log=(...a)=>{const b=new Error().stack
	.split(' (file:///')[1]///以上两种写法都正好在两个“ (/”中间
	.split(' ').last()///“at ”、“async ”
	///如果在文件第一层则为“Object.<anonymous>”
	return b=='Object.<anonymous>'?console.log(...a):console.log(
	b.replace('Object.exports.','')///lang.delay、Object.exports.run
	,...a),a[1]?a:a[0]}
log('修正“Object.<anonymous>”')
log`js文件第一层，不在函数下的，只有测试中常这么写，正常代码不会`