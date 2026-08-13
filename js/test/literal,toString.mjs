import'#g'
///toString and like
var a='abc',i=123,b,c
b={i:i,toString:()=>a}
eq(''+b,a),eq(b.i,i)  ,neq(b,a),as(b==a)
neq(b,{i:i,toString:()=>a})//toString reference
eq(typeof b,'object'),as(b instanceof Object)

b=Object.assign(a,{i:i})
eq(''+b,a),eq(b.i,i)  ,neq(b,a),as(b==a)
eq(b,Object.assign(a,{i:i}))
eq(typeof b,'object'),as(b instanceof Object)
//⚠️“Object.assign”并没改a string不同于obj
eq(typeof a,'string')

throws(()=>String(a).i=i,/^TypeError: Cannot create property 'i' on string 'abc'/)
b=new String(a),b.i=i
c=new String(a),c.i=i
eq(''+b,a),eq(b.i,i)  ,neq(b,a),as(b==a)
eq(b,c)
eq(b,Object.assign(a,{i:i}))//方法2和3结果相等
eq(typeof b,'object'),as(b instanceof Object)

as(String(a)===String(a))
as(String(a)===a)