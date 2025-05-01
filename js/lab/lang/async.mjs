import'#glob'
//把任何值转为~
Promise.resolve(1).then(a=>eq(1,a))
let r=Promise.resolve
throws(_=>r(1),TypeError)
r=a=>Promise.resolve(a)
r(1).then(a=>eq(1,a))