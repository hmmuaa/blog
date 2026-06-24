import'#g'
import{pinyin}from'pinyin-pro'
let{}={}
,/*encode*/nc=(a
	,[o,n]='oei|eio'.split('|').map(a=>a.split(''))
	,map=Object.fromEntries([o,n].transpose())
	)=>pinyin(a,{toneType:'num',v:true})
	.replace(RegExp(o.join('|'),'g'),a=>map[a])
	.replace(/0\b/g,5)
eq(nc('撞的律师的'),'zhuang4 di5 lv4 sho1 di5')
eq(nc('波').localeCompare(nc('比')),-1)
eq(nc('巴').localeCompare(nc('吧')),-1)

let compareByPinyin=(a,b
	)=>nc(a).localeCompare(nc(b))
,a=['张三','李四','王五']
eq(a.toSorted(compareByPinyin),['李四','王五','张三'])
export{compareByPinyin}