let log=console.log
///#函数名
///arrow fn写法
,fn=a=>log(a,Error().stack)
fn(11)///11 Error,testFn

///两层参数
let fn2=a=>b=>log(a,b,new Error().stack.includes('fn'))
fn2(11)(22)///11 22 Error,Object.<anonymous>
log(3)
let fn3=a=>b=>log(a,b,new Error().stack.includes('fn'))(11)
fn3(22)///无输出
log(4)
let fn4=a=>(b=>log(a,b,new Error().stack))(11)
fn4(22)///22 11 Error,testFn⭕
log(5)
let fn5=(a=>b=>log(a,b,new Error().stack.includes('fn')))(11)
fn5(22)///11 22 Error,Object.<anonymous>

///这种写法在log和fn中间会多一行特殊的，
///这行没有函数标识，有路径但没括号，所以很容易识别
fn=a=>(b=>log(a,b))(11)

///fn4写法是有名的，只是在第三行
Array.prototype.last=function(){return this[this.length-1]}
log=(...a)=>console.log(new Error().stack
	.split(' (file:///')[1]///以上两种写法都正好在两个“(/”中间
	.split('at ').last(),...a)
fn=a=>log(a)
fn(11)///testFn 11✔️
fn=a=>(b=>log(a,b))(11)
fn(22)///testFn4 22 11✔️
fn=async a=>(async b=>await log(a,b))(11)
fn(22)///testFn 22 11✔️

///#合并“返回结果”（见log return）
log=(...a)=>(console.log(new Error().stack
	.split(' (file:///')[1]///以上两种写法都正好在两个“ (/”中间
	.split(' ').last()///“at ”、“async ”
	.replace('Object.exports.','')///lang.delay、Object.exports.run
	,...a),a[1]?a:a[0])
	
log=(...a)=>(console.log(new Error().stack
	.split(' (file:///')[1].split(' ').last()))
log('第一层log会取到“Object.<anonymous>”')
log`js文件第一层，不在函数下的，只有测试中常这么写，正常代码不会`

log=(...a)=>{const b=new Error().stack
	.split(' (file:///')[1]///以上两种写法都正好在两个“ (/”中间
	.split(' ').last()///“at ”、“async ”
	///如果在文件第一层则为“Object.<anonymous>”
	return b=='Object.<anonymous>'?console.log(...a):console.log(
	b.replace('Object.exports.','')///lang.delay、Object.exports.run
	,...a),a[1]?a:a[0]}
log('修正“Object.<anonymous>”')
log`js文件第一层，不在函数下的，只有测试中常这么写，正常代码不会`