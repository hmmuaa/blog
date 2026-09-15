import'#g'//md表格行格式
const
///标准完整表格行 头尾都加一个竖线
,fullRow=a=>`|${a}|`
,unfull=a=>a.slice(1,-1)
///化简格式时 头尾竖线都可去掉
///但当行第一个格是空格时 不可去掉行首竖线

,escape=a=>a.replace(/[\[\]]/g,$`\$&`)
,unescape=a=>a.replaceAll('\\','')
,txt2md=a=>a,md2txt=unescape
///当行第一格为空格时 需增加一个竖线
,fixRow=a=>a!=`|`&&a[0]=='|'?'|'+a:a
,dom2md=({h,b})=>[h,['|'],...b]
	.map(a=>a.map(txt2md).join('|')).map(fixRow).join('\n')

,tds=(a,_,__
	,prep=a=>a.replace(/^(\|?)(.*?)(\|?)$/,'|$2|')
	,rx=/(?<=\|)([^|]+)(\|+)/g
	,f=a=>ma(a,rx)
)=>(_
	,f(prep(a)).flatMap(([a,i])=>array(i.length,a))
)
,heads=a=>(_
	,a.split('\n').map(tds).transpose().map(a=>a.join('-'))
)
,set='\n|\n'//setup/辨识行 不同md版本辨识行略有区别
,md2dom=(a,[h,b]=a.split(set)
)=>({h:heads(h)
	,b:b.split('\n').map(a=>a.split('|').map(md2txt))})

,md2mk=a=>a.replace('\n|\n','\n|---\n')
,mk2md=a=>a.replace('\n|---\n','\n|\n')