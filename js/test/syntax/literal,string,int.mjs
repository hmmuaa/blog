import'#lib'
eq('\abc','abc'),eq(`\abc`,'abc')
eq(String.raw`\abc`,'\\abc')///内建
let
f=String.raw;eq(f`\abc`,'\\abc')
f=a=>String.raw(a);eq(f`\abc`,'\\abc')
f=a=>String.raw(a)+123;eq(f`\abc`,'\\abc123')

f=a=>String.raw(a)
eq(f`\abc`+`de`,'\\abcde')///无法拼接 其实传进去的只有abc
throws(()=>f(`\abc`),TypeError)
throws(()=>f(['\abc']),TypeError)///这种尝试的写法无效

f=a=>(''+a).slice(1,-1)///hack
eq(f(/\abc/),'\\abc')
eq(f(/\abc/)+f(/\def/),'\\abc\\def')

neq('123',123)
eq(+'123',123),eq(-'123',-123)
neq(+'123','123')
eq(+'abc',NaN),eq(-'abc',NaN)

neq(undefined,false),neq(null,false)
eq(!undefined,true)
eq(!!undefined,false)