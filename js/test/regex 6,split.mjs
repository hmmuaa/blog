import'#g'
///正则split的逻辑和字符串split相同
eq('aaa'.split('a'),['','','',''])//在每个a处split
eq('abc'.split(/./),['','','',''])//在每个字符处split
let a='abc'
eq(a.split(''),['a','b','c'])//在每个字符间
eq(a.split(/(?:)/),['a','b','c'])//在每个字符间
eq(a.split(/(?<=.)(?=.)/),['a','b','c'])//在每个字符间
eq(a.split(/()/),['a','','b','','c'])//匹配项包括进输出

eq(a.split(/a/),['','bc'])
eq(a.split(/(?:a)/),['','bc'])

eq(a.split(/a(b)/),['','b','c'])
eq(a.split(/(?:a)(b)/),['','b','c'])

eq(a.split(/(?=b)/),['a','bc'])
eq(a.split(/(?=.)/),['a','b','c'])

eq(a.split(/^a(?:)/),['','bc'])

///和字符串split一样 正则split隐含默认全局
eq('abc'.split(/./),['','','',''])//在每个字符处split