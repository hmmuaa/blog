'nodejs';require('../常用.js')
t=a=>log(a?'是引用':'不是引用')
a=module.parent,t(a)
a=require.main!==module,t(a)
///两个方式都可以
///②控制执行
f=async()=>log('非引用时执行')
g=async()=>log('引用时执行')
module.parent||(async()=>await f())()
exports.go=g