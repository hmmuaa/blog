import'#lab'
let f=(a,b)=>a+b;eq(f(12),NaN)
f=(a,{b})=>a+b;throws(()=>f(12),TypeError)
f=(a,{b}={})=>a+b;eq(f(12),NaN)
f=(a,{b}=c)=>a+b;eq(((c={b:34})=>f(12))(),36)
///更多见[destructure]