import'#glob'
//把任何值转为~
let a=await 1;eq(a,1)
a=async()=>1;eq(await a(),1)
///throws(()=>1.then(a=>eq(1,a)),SyntaxError)
throws(()=>(1).then(a=>eq(1,a)),TypeError)

Promise.resolve(1).then(a=>eq(1,a))
let r=Promise.resolve;throws(_=>r(1),TypeError)///这么写不行
r=a=>Promise.resolve(a);r(1).then(a=>eq(1,a))