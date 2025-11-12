import'#glob'
let f=(a,b)=>a+b;eq(f(12),NaN)
f=(a,{b})=>a+b;throws(()=>f(12),TypeError)
f=(a,{b}={})=>a+b;eq(f(12),NaN)
f=(a,{b}=c)=>a+b;eq(((a={b:34})=>f(12,a))(),46)
///更多见[destructure]

///一种卡bug写法 但不要这样写
f=(a=comment_of_a)=>a+a;eq(f('a'),'aa')
f=(/*comment_of_a*/a)=>a+a;eq(f('a'),'aa')
f=(a=longerName)=>a+longerName
throws(_=>f('a'),/longerName is not defined/)
///longerName并未声明为参数 而是会尝试从外层取值并失败