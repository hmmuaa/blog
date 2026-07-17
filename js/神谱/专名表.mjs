import'#g'
import{listed}from'./textFile.mjs'
let data=listed(new URL('./专名表.txt',import.meta.url))
,rg=data.all().then(l=>RegExp(l.join('|'),'g'))
/*
有三个单词:“mark､sign､score” 简单记一下
(还有check 勾划 具体暂略)
最简单的mark 指标记､标
sign强调依其规则 恰如其分地标记
就是说 “sign”一个词表示“mark names”
score对应“划” 划价､划分､划定､划掉､笔划､比划
表示做一个或确切含义的标记
可见mark是最不准确的 但是大家最熟最易懂的
*/
,mark=a=>rg.then(r=>a.replace(r,'_$&_'))
eq(await mark('荷马是古希腊诗人'),'_荷马_是古_希腊_诗人')
export default mark

let sortFile=()=>data.sort(compareByPinyin)
await sortFile()