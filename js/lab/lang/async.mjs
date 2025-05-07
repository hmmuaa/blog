import'#lang+'
//把任何值转为~
let a,f
a=await 1;eq(a,1)
a=async()=>1;eq(await a(),1)
///throws(()=>1.then(a=>eq(1,a)),SyntaxError)
throws(_=>(1).then(a=>eq(1,a)),TypeError)

Promise.resolve(1).then(a=>eq(1,a))
let r=Promise.resolve;throws(_=>r(1),TypeError)///这么写不行
r=a=>Promise.resolve(a);r(1).then(a=>eq(1,a))

///多次await只会实际执行一次
a=0,eq(a,0)
++a,eq(a,1)
f=Promise.resolve().then(_=>++a),eq(a,1)
as(f instanceof Promise)
await f,eq(a,2)
as(f instanceof Promise)
++a,eq(a,3)
await f,eq(a,3)