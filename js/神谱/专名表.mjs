import'#g'
import{listed}from'./textFile.mjs'
let data=listed(new URL('./专名表.txt',import.meta.url))
,rg=data.all().then(l=>RegExp(l.join('|'),'g'))
,sign=a=>rg.then(r=>a.replace(r,'_$&_'))
/*sign强调依逻辑性而标记 而mark是标记
就是说 “sign”一个词表示“mark names”*/
eq(await sign('荷马是古希腊诗人'),'_荷马_是古_希腊_诗人')
export default sign

let sortFile=()=>data.sort(compareByPinyin)
await sortFile()