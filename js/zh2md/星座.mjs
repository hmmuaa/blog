import'#g'
///以星座灵活的分类做演示数据
var rotate = (arr, steps=1) => {
  const offset = ((steps % arr.length) + arr.length) % arr.length;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}
Array.prototype.rotate=function(){return rotate(this)}
var _
,Zodiacs='Aries/♈︎  Taurus/♉︎  Gemini/♊︎  Cancer/♋︎  \
Leo/♌︎  Virgo/♍︎  Libra/♎︎  Scorpio/♏︎  \
Sagittarius/♐︎  Capricorn/♑︎  Aquarius/♒︎  Pisces/♓︎'
,Elements='Air/🜁  Earth/🜃  Fire/🜂  Water/🜄'
,Modalities='Cardinal/🜍  Fixed/🜔  Mutable/☿'
,Planets='Sun/☉  Moon/☽  Mercury/☿  Venus/♀  Mars/♂  Jupiter/♃  Saturn/♄'
,Modern_Planets='Uranus/♅  Neptune/♆  Pluto/⯓'
// ,f=a=>a.match(/\p{Grapheme_Base}\p{Grapheme_Extend}|\p{Grapheme_Base}/gu)
,f=a=>a.split('  ').map((a,_,__,[nm,sy]=a.split('/'))=>sy)
,{entries,keys,fromEntries}=Object
,zd=fromEntries(f(Zodiacs).map(a=>[a,{}]))
,el=f(Elements),mo=f(Modalities)
,pl=f(Planets),mp=f(Modern_Planets)
,mp={8:mp[2],11:mp[0],12:mp[1]}
Object.values(zd).forEach((a,i)=>(
	a.el=el.at(-i%4+2),a.mo=mo[i%3]
	,a.ru=i==4?pl[0]:i==3?pl[1]
		:(i=>(i=i-3,i=i<0?-i+1:i>6?6-i:i,pl.at(i)))(i)
	,++i in mp?a.mr=mp[i]:_
	))
eq(dataTable(fromEntries(entries(zd).slice(-3,-1)))
	,'||el|mo|ru|mr\n|---\n♑︎|🜃|🜍|♄|\n♒︎|🜁|🜔|♄|♅')
eq(xt(zd),'||🜂|🜃|🜁|🜄\n|---\n**🜍**|♈︎|♑︎|♎︎|♋︎\n**🜔**|♌︎|♉︎|♒︎|♏︎\n**☿**|♐︎|♍︎|♊︎|♓︎')
var tt=a=>'#### #'+a
eq(tt`Zodiacs`,'#### #Zodiacs')
await fs.output('zodiac',[tt`Zodiacs`,dt(zd)
	,tt`Categorized`,xt(zd)
	,tt`Rulers`,xt(zd,a=>a.ru,a=>a.el,pl,el)
	].join('\n'))