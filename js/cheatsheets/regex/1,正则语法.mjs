import'#g'
///非g模式 从整个str一级级向下定位 和g模式很不同
eq('aaaaaaa'.match(/(aa)a(aa)a/).slice(1),['aa','aa'])
///Non-capturing group只在非g模式有效
eq('aaaaaaaaa'.match(/(?:(aa){1,2}a){1,3}/).slice(1),['aa'])

let a,b,r
///以结尾为参照点
let m=(a,b)=>[...a.match(b)??[]]
a='abc'
eq(m(a,/./),['a'])
eq(m(a,/.$/),['c'])
eq(m(a,/(.).$/),['bc','b'])
eq(m(a,/^.(.).$/),['abc','b'])
eq(m(a,/^(.).(.)$/),['abc','a','c'])

///排除最后一个字 (参考输血措辞 匹配的反义词是排异)
eq(m(a,/^.(.)(?=.$)/),['ab','b'])
eq(m(a,/^.(.(?=.$))/),['ab','b'])
eq(m(a,/^.(.)(?=.$)(.)/),['abc','b','c'])

///匹配最后一个a
a='ababa',b='abab'
eq(m(a,/a$/),['a'])
eq(m(a,/a?$/),['a'])
eq(m(b,/a?$/),[''])
eq(m(a,/(a?)$/),['a','a'])
eq(m(b,/(a?)$/),['',''])
eq(m(a,/(a?$)/),['a','a'])
eq(m(b,/(a?$)/),['',''])
r=/(a$|$)/
eq(m(a,r),['a','a'])
eq(m(b,r),['',''])

///不匹配最后一个a
r=/(.*)(?=a$|$)/
eq(m(a,/(.*)(?=a$|$)/),['ababa','ababa'])//失败
eq(m(a,/(.*(?=a$|$))/),['ababa','ababa'])//失败
/*non-greedy(?)即匹配最少内容
第一次就匹配最少内容 如“*?”即匹配空
就向后匹配 如果向后匹配失败
就继续non-greedy匹配 达到第二小匹配
再向后匹配 如果再向后匹配失败
再继续non-greedy匹配 达到第三小匹配 如此重复
直到成功向后匹配
greedy则正好相反*/
r=/(.*?(?=a$|$))/
eq(m(a,r),['abab','abab'])//成功
eq(m(b,r),['abab','abab'])
///如果不用non-greedy 用排除可能也能实现 但就复杂多了

///最后的a单一组
r=/(.*?)(a$|$)/
eq(m(a,r),['ababa','abab','a'])
eq(m(b,r),['abab','abab',''])

///输出格式
eq('abcde'.match(/a(b)c(d)e/),Object.assign(['abcde','b','d'],{index:0,input:'abcde',groups:undefined}))
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
a='东市买骏马，西市买鞍鞯，南市买辔头，北市买长鞭。'
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