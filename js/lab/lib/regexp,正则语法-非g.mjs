import'#lab'
///非g模式 从整个str一级级向下定位 和g模式很不同
///不能仿g模式(或者我没想到怎么写)
eq('aaaaaaa'.match(/(aa)a(aa)a/).slice(1),['aa','aa'])
///Non-capturing group只在非g模式有效
eq('aaaaaaaaa'.match(/(?:(aa){1,2}a){1,3}/).slice(1),['aa'])

let
///输出格式
b=['abcde','b','d']
Object.assign(b,{index:0,input:'abcde',groups:undefined})
eq('abcde'.match(/a(b)c(d)e/),b)
eq('abcde'.match(/a(b)c(d)e/).slice(1),['b','d'])

///字或段（词）
eq('foooo'.match(/foo{3,}/)[0],'foooo')
eq('foofoofoo'.match(/(?:foo){3,}/)[0],'foofoofoo')
eq('上下下下下'.match(/上下下{3,}/)[0],'上下下下下')
eq('上下下上下下上下下'.match(/(?:上下下){3,}/)[0]
	,'上下下上下下上下下')

///non-capturing group，match好像没区别，不知道会不会省内存？
eq('foofoofoo'.match(/(?:foo){3,}/)[0],'foofoofoo')
eq('foofoofoo'.match(/(foo){3,}/)[0],'foofoofoo')

///跳过部分
let a='东市买骏马，西市买鞍鞯，南市买辔头，北市买长鞭。'
eq(a.match('(东市买骏马)，(西市买鞍鞯)').slice(1),
	['东市买骏马','西市买鞍鞯'])

///商品标题
eq('40罐赛园李干150克（至1.04）'
.match(/^([0-9]+)(.)(\W+)([0-9]+)\/?([0-9]*)(.)/).slice(1)
,['40','罐','赛园李干','150','','克'])

eq('40罐赛园李干150/200克（至1.04）'
.match(/^([0-9]+)(.)(\W+)([0-9]+)\/?([0-9]*)(.)/).slice(1)
,['40','罐','赛园李干','150','200','克'])

eq('饼干1.5斤（3月4日到期）'
.match(/^(.\W+)([0-9.]{1,3})斤（/).slice(1)
,['饼干','1.5'])