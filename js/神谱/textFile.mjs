import'#g'
import{readFile as rd,writeFile as wt}from'fs/promises'
import{join as jn,extname as xn}from'path'
let
mod=async(f,t,m
	,a=rd(f,'utf8')
	)=>a.then(m).then(a=>wt(t,a))
,list=a=>rd(a,'utf8').then(a=>a.split('\n'))
,asList=(a,f)=>mod(a,a,a=>f(a.split('\n')).join('\n'))
// ,collator=new Intl.Collator('zh-CN',{//不准
// 	collation:'pinyin',usage:'sort',numeric:true})
// ,sort=a=>asList(a,a=>a.toSorted(collator.compare))
// ,sort=a=>asList(a,a=>a)
,sort=(a,cpr)=>asList(a,a=>a.toSorted(cpr))
,listed=a=>({all:()=>list(a)
	,sort:c=>sort(a,c)
})
export{listed,mod,sort}