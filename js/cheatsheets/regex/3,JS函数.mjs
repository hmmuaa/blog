import'#g'
import{format as uf}from'util'
let a
///把字符串转成正则
eq(`aaa aaa`.replace(RegExp('aa'),'bb'),`bba aaa`)
eq(`aaa aaa`.replace(RegExp('aa$'),'bb'),`aaa abb`)
eq(`aaa aaa`.replace(RegExp('aa','g'),'bb'),`bba bba`)

///避免字符串需多余escape
eq('abc def'.match(RegExp('(\\w*) (\\w*)')).slice(1),['abc','def'])
const regr=(...a)=>RegExp(String.raw(...a))
eq('abc def'.match(regr`(\w*) (\w*)`).slice(1),['abc','def'])
///拼接 其实很繁琐不实用
const part=a=>(''+a).slice(1,-1)
a=part(/(\w*)/)
eq('abc def'.match(RegExp(a+' '+a)).slice(1),['abc','def'])

///拼接 看起来tl最舒服
let w='(\\w*)'
eq('abc def'.match(RegExp	(w+' '+w)).slice(1),['abc','def'])
w=`(\\w*)`
eq('abc def'.match(RegExp	(w+' '+w)).slice(1),['abc','def'])
w=String.raw`(\w*)`
eq('abc def'.match(regr		`${w} ${w}`).slice(1),['abc','def'])
w=part(/(\w*)/)
eq('abc def'.match(RegExp		(w+' '+w)).slice(1),['abc','def'])
eq('abc def'.match(RegExp(uf	('%s %s',w,w))).slice(1),['abc','def'])

///with line break
eq(`aaa aaa`.replace(/aa/,'bb'),`bba aaa`)
eq(`aaa\naaa`.replace(/aa/,'bb'),`bba\naaa`)
eq(`ab c
 de`.replace(RegExp(` c(
 de)?$`),'12'),'ab12')

///replace支持g或非g replaceAll则强制检查非g报错
///以g为准 不管是否All 有g就是All
a='a apple, a elephant'
eq(a.replace(/a /,'an '),'an apple, a elephant')
eq(a.replace(/a /g,'an '),'an apple, an elephant')
//log(b=a.replaceAll(/a /,'an '))报错
eq(a.replaceAll(/a /g,'an '),'an apple, an elephant')

///split也可以用正则
eq(a.split(/a /g),['','apple, ','elephant'])
///处理评分
a=`
5abcde
4一二三四五
3~！@#%`
eq(a.split(/\n[1-9]/g),['','abcde','一二三四五','~！@#%'])