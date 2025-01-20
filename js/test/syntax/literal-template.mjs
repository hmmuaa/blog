import'#lib'
let
///combining
a=`abc`,b=`z${a}d`;eq(b,'zabcd')
///escaping char, raw as literal
eq(`a\bc`,'a\bc')//✘
const raw=String.raw
eq(raw`a\bc`,'a\\bc')//✔

let f
///mdn没写 但经测试tl只存在于解析时
///这个可能只有在带有\时有问题
///tl只有两种用法 1是有`扩起时(见前文) 而赋值后成为string
eq(typeof`abc`,'string')
throws(()=>raw(a),TypeError)//已经是string
f=a=>typeof a;eq(f(a),'string');eq(f(`abc`),'string')
///2是不加括号做参数 但传进去实际是其信息的一组参数
f=a=>a;as(f`abc`instanceof Array),eq(f`abc`[0],'abc')

///nesting/combining 嵌套/组合
a=`a\bc`,b=`z${a}d`;eq(raw`${b}`,'za\bcd')//✘
///嵌套前先raw 否则嵌套时\就会被当作escape
a=raw`a\bc`,b=raw`z${a}d\ef`;eq(raw`${b}`,'za\\bcd\\ef')//✔
throws(()=>raw(b))
f=a=>raw`z${a}d\ef`
eq(f(a),'za\\bcd\\ef')
eq(f(raw`a\bc`),'za\\bcd\\ef')

///接收tl转成str
f=(...a)=>String.raw(...a)
eq(f`abc`,'abc')