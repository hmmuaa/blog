import'#glob'
eq('a'.match(/a/)[0],'a')
eq('b'.match(/b/)[0],'b')
eq('a'.match(/b/),null)
eq('b'.match(/a/),null)
eq('aaa'.match(/a*/)[0],'aaa')
eq('bbb'.match(/b+/)[0],'bbb')
eq('aaa'.match(/a/g),['a','a','a'])

eq('abc'.match(/a|abc/g),['a'])
eq('abc'.match(/b|abc/g),['abc'])
eq('abc'.match(/abc|a/g),['abc'])
eq('abc'.match(/abc|b/g),['abc'])

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
///lookahead不算
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

///^需在|两边都写
a='The quick brown fox jumps over the lazy dog'
eq(a.match(/The|the/g),['The','the'])
eq(a.match(/^The|^the/g),['The'])
eq(a.match(/^(The|the)/g),['The'])

///group
eq(a.toLowerCase().split(/the/)
	,['',' quick brown fox jumps over ',' lazy dog'])
eq(a.toLowerCase().split(/(the)/)
	,['','the',' quick brown fox jumps over ','the',' lazy dog'])
eq(a.toLowerCase().split(/\s?(the)\s?/)
	,['','the','quick brown fox jumps over','the','lazy dog'])

///negative lookbehind,not after,not following
///negative look forwads
eq(a.replace(/o/g,'O')
	,'The quick brOwn fOx jumps Over the lazy dOg')
eq(a.replace(/(?<! )o/g,'O')
	,'The quick brOwn fOx jumps over the lazy dOg')
eq(a.replace(/(?<! )o(?!w)/g,'O')
	,'The quick brown fOx jumps over the lazy dOg')
eq(a.replace(/o(?!w)/g,'O')
	,'The quick brown fOx jumps Over the lazy dOg')
eq(a.replace(/o(?!w|x)/g,'O')
	,'The quick brown fox jumps Over the lazy dOg')

const countChars=a=>Object.entries(
	a.replaceAll(' ','').split('').reduce((acc,char)=>
		({...acc,[char]:(acc[char]||0)+1}),{})).sort((a,b)=>b[1]-a[1])
a='The quick brown fox jumps over the lazy dog.'
eq(countChars(a).filter(([,a])=>a>2),[[ 'o', 4 ], [ 'e', 3 ]])
eq(a.match(/.e./g),[ 'he ', 'ver', 'he ' ])
eq(a.match(/.o./g),[ 'row', 'fox', ' ov', 'dog' ])
eq(a.match(/(?<=f|d)o./g),[ 'ox','og' ])
eq(a.match(/(?<!f|d)o./g),[ 'ow', 'ov' ])
eq(a.match(/(?:f|d)o./g),[ 'fox','dog' ])
eq(a.match(/(?:br|d)o./g),[ 'brow','dog' ])
eq(a.match(/(?:br|d|)o./g),['brow', 'ox', 'ov', 'dog'])

///match b but not abc
/*这个好难 问了好几个ai 最后gpt搞定的*/
eq('b'
	.replace(/b(?!(?<=a)b(?=c))/g,'B')
	,'B')
eq('b abc'
	.replace(/(?<!a)b|b(?!c)/g,'B')
	,'B abc')
eq('b abc ab bc ac abcba'
	.replace(/(?<!a)b|b(?!c)/g,'B')
	,'B abc aB Bc ac abcBa')
eq(a.replace(/(?<!d)o|o(?!g)/g,'O')
	,'The quick brOwn fOx jumps Over the lazy dog.')
	
///match b but not abc or xby
a='thequickbrownfoxjumpsoverthelazydog'
eq(a.replace(/(?<!d)o|o(?!g)/g,'O')
	,'thequickbrOwnfOxjumpsOverthelazydog')
eq(a.replace(/(?<!br)o|o(?!wn)/g,'O')
	,'thequickbrownfOxjumpsOverthelazydOg')
// eq(a.replace(/(?<!d)o|o(?!g)|(?<!br)o|o(?!wn)/g,'O')
// 	,'thequickbrownfOxjumpsOverthelazydOg')

// eq(
//   'b abc xby'.replace(/b/g, (m, i, s) =>
//     s.slice(i - 1, i + 2) === 'abc' || s.slice(i - 1, i + 2) === 'xby'
//       ? 'b'
//       : 'B'
//   ),
//   'B abc xby'
// );
// eq('b abc xby'
// 	.replace(/((?<!a)b|b(?!c))|((?<!x)b|b(?!y))/g,'B')
// 	,'B abc xby')
a= 'The quick brown fox jumps over the lazy dog'
// eq(a.replace(/(?<!d)o|o(?!g)/g,'O')
// 	,'The quick brown fOx jumps Over the lazy dog')
let x;
///a是任意字符串 匹配所有o 排除brown和fox
// a = 'thequickbrownfoxjumpsoverthelazydog'
// x =?
// eq(
//   a.replace(x, 'O'),
//   'thequickbrownfoxjumpsOverthelazydOg'
// )