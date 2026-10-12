import'#g'
let
a=[[`\\n`,`\n`]]
p(a)
let maps=a
,trans=a=>maps.reduce((z,[a,b])=>z.replaceAll(a,b),a)
a=`曹操\\n当然大家一看邹氏就是 纯白给\\n典韦`
eq(a,'曹操\\n当然大家一看邹氏就是 纯白给\\n典韦')
p(trans(a))
export default trans