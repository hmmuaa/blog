import'#g'//md-table解析生成整理

const{}=0
,{entries,keys,fromEntries}=Object
,obj2ent=a=>entries(a).map(([k,v])=>({'':k,...v}))
,ent2dom=(a
	,h=a.flatMap(a=>keys(a)).unique()
	,b=a.map(a=>[...h.map(h=>a[h])])
	)=>({h,b})

let ent,dom,md,mk
ent=[{'':'Capricorn',el:'Earth',mo:'Cardinal',ru:'Saturn'}
	,{'':'Aquarius',el:'Air',mo:'Fixed',ru:'Saturn',mr:'Uranus'}]
dom={h:['','el','mo','ru','mr']
	,b:[['Capricorn','Earth','Cardinal','Saturn',undefined]
	,['Aquarius','Air','Fixed','Saturn','Uranus']]}
md=`||el|mo|ru|mr\n|\nCapricorn|Earth|Cardinal|Saturn|\nAquarius|Air|Fixed|Saturn|Uranus`
mk='||el|mo|ru|mr\n|---\nCapricorn|Earth|Cardinal|Saturn|\nAquarius|Air|Fixed|Saturn|Uranus'
import{sample as zd}from'./星座.mjs'
eq(obj2ent(zd),ent)
eq(ent2dom(ent),dom)
eq(dom2md(dom),md)
eq(md2mk(md),mk)
eq(mk2md(mk),md)
await fs.output('星座.md',mk)
// var tt=a=>'#### #'+a
// eq(tt`Zodiacs`,'#### #Zodiacs')
// await fs.output('zodiac',[tt`Zodiacs`,dt(zd)
// 	,tt`Categorized`,xt(zd)
// 	,tt`Rulers`,xt(zd,a=>a.ru,a=>a.el,pl,el)
// 	].join('\n'))