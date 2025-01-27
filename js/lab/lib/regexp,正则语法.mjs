import'#lib'
eq('a'.match(/a/)[0],'a')
eq('b'.match(/b/)[0],'b')
eq('a'.match(/b/),null)
eq('b'.match(/a/),null)
eq('aaa'.match(/a*/)[0],'aaa')
eq('bbb'.match(/b+/)[0],'bbb')
eq('aaa'.match(/a/g),[ 'a', 'a', 'a' ])

///Character classes，字符类（通配符）
eq('a b'.match(/.*/g),['a b',''])///会多一个空字符串
eq('a b'.match(/.+/g),['a b'])///这样就不会多
eq('a\nb'.match(/.+/g),['a','b'])//
eq('a\nb'.match(/.+/gs),['a\nb'])//
eq('a b'.match(/[^\n]+/g),['a b'])
eq('abc'.match(/\S+/g),['abc'])
eq('a b'.match(/\S+/g),['a','b'])///\S排除空格
eq('a b'.match(/\w+/g),['a','b'])
eq('abc'.match(/\w+/g),['abc'])
let a='东市买骏马，西市买鞍鞯，南市买辔头，北市买长鞭。'
eq(a.match(/\w/g),null)///中文无效

///不会重叠匹配
eq('aaaaa'.match(/aa/g),['aa','aa'])
///lookahead例外
eq('aaaaaaa'.match(/aa(?=a)/g),['aa','aa','aa'])

///处理中文，六个字一分
eq(a.match(/\S{1,6}/g),
	['东市买骏马，','西市买鞍鞯，','南市买辔头，','北市买长鞭。'])
///两行一分[引](https://stackoverflow.com/q/46494380/2537458)
a=a.match(/\S{6}/g).join('\n')
eq(a.match(/(?=[\s\S])(?:.*\n?){1,2}/g)
	.map(a=>a.replaceAll('\n',''))
	,['东市买骏马，西市买鞍鞯，','南市买辔头，北市买长鞭。'])
eq(a.match(/(?:.+\n?){2}/g)
	.map(a=>a.replaceAll('\n',''))
	,['东市买骏马，西市买鞍鞯，','南市买辔头，北市买长鞭。'])

///拆分注音
///w字母 W非字母
a='长chang城长chang'
eq(a.match(/\W\w*/g),
	['长chang','城','长chang'])

///是否字母开头
eq('ttt'.match(/^\w+/g),['ttt'])
eq('长chang'.match(/^\w+/g),null)

a='1\n\n\n\n2\n'
eq(
	(a+'\n').match(/(.*\n){2}/g).map(a=>a.slice(0,-1))
	,[ '1\n', '\n', '2\n' ])
// a='1\n2\n3\n\n2\n'
// eq(
// 	a.match(/(.*\n.*)/g)
// 	,[ '1\n', '\n', '2\n' ])