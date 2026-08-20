import'#g'
///以下失败尝试 暂时不继续
///可用资料参考https://stackoverflow.com/questions/48303046/string-raw-with-a-string-only-works-without-parenthesis
f=a=>a
eq(typeof f`abc`,'object')
eq(f`abc`,[`abc`])
f=(...a)=>a
eq(typeof f`abc`,'object')
eq(f`abc`,[[`abc`]])
f=a=>String.raw(a)
eq(f([`abc`]),'\\abcde')
// f=a=>String.raw(a)
// eq(f(`\abc`),'\\abcde')