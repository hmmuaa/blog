
///DOM/“Document-Object Model” 写了但暂时用不上
var md2dom,row,rx,f,prep
///tr
,prep=a=>a.replace(/^(\|?)(.*)/,'|$2|')
,rx=/(?<=\|)([^|]+)(\|+)/g
,f=a=>ma(a,rx)
,row=a=>f(prep(a)).map(([a,i])=>[a,i.length])
,md2dom=a=>a.split('\n').map(row)
eq(row('a|b||c'),[['a',1],['b',2],['c',1]])
eq(md2dom(samples.md),[[['a',1],['b',1],['c',1]],[],[['h',1],['i',1],['j',1]],[['o',1],['p',1],['q',1]]])
