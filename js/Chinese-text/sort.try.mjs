import'#g'
///ajs不支持
eq(Intl.Collator.supportedLocalesOf(['fr','de','es']),[])
eq('ä'.localeCompare('z','de'),-1)
eq('ä'.localeCompare('z','sv'),-1)
let a=['重庆','长沙','长春','北京','上海','广州','厦门','曾']
,x=['上海','北京','厦门','广州','曾','重庆','长春','长沙']
eq(a.toSorted((a,b)=>a.localeCompare(b,'zh-Hans-CN')),x)
eq(a.toSorted((a,b)=>a.localeCompare(b,'zh-Hant')),x)
eq(a.toSorted((a,b)=>a.localeCompare(b,'zh-Hans')),x)
eq(a.toSorted((a,b)=>a.localeCompare(b,'zh-CN')),x)
eq(a.toSorted((a,b)=>a.localeCompare(b,'zh-TW')),x)
eq(a.toSorted((a,b)=>a.localeCompare(b,'zh')),x)
// 正确预期结果应为：['北京', '长春', '长沙', '重庆', '广州', '上海', '厦门', '曾']

import{pinyin}from'pinyin-pro'
///手册:pinyin-pro.cn/use/pinyin.html

let py=pinyin
eq([py('巴'),py('拔'),py('把'),py('罢'),py('吧')]
,['bā','bá','bǎ','bà','ba'])
eq(py('啊').localeCompare(py('呃')),-1)
///声调排序错
neq(py('巴').localeCompare(py('拔')),-1)
neq(py('巴').localeCompare(py('拔'),'zh-CN'),-1)

///撰写数字修正
py=a=>pinyin(a,{toneType:'num'})
eq([py('巴'),py('拔'),py('把'),py('罢'),py('吧')]
,['ba1','ba2','ba3','ba4','ba0'])
eq(py('巴').localeCompare(py('拔')),-1)
///但轻声仍然错 后文修正
neq(py('巴').localeCompare(py('吧')),-1)

a='张三'
eq(py(a),'zhang1 san1')
eq(py('长大'),'zhang3 da4')
eq(py('周长'),'zhou1 chang2')
eq(py('好的'),'hao3 de0')
eq(py('深情地一吻'),'shen1 qing2 di4 yi4 wen3')
eq(py('跑得快'),'pao3 de2 kuai4')

/*
#排序细节
..ba排ban前面 ba1nian2排ban1a前面
*/
eq(py('巴').localeCompare(py('班')),-1)
eq(py('八年').localeCompare(py('班啊')),-1)
/*
..按拼音bo应该排bi前面(aoeiuv)
但实际只能按英文习惯排(aeiouv)
这个暂时不管 暂时按英文排 可接受
*/
neq(py('波').localeCompare(py('比')),-1)
/*
在拼音基础上自定义编码 使韵母、声调正确排序
*/
let{}={}
,transpose=a=>a[0].map((_,i)=>a.map(a=>a[i]))
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
a=['张三','李四','王五']
eq(a.toSorted(compareByPinyin),['李四','王五','张三'])