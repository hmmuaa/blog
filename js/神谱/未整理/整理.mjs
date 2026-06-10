import'#g'
let d='未整理'
,f='sacred-texts-gtheo.txt'
/*全选文本复制<https://sacred-texts.com/cla/hesiod/gtheo.htm>
1.该文用空格排版 源码大量`&nbsp;` 估计处理文本比html方便
.与其它源对比 以及AI核实 第4-5行中间空行错 可能还有其它错空行
.全部行首空四格也错*/
import{readFile as rd,writeFile as wt}from'fs/promises'
import{join as jn,extname as xn}from'path'
const 
mod=async(f,t,m)=>{
	let a=await rd(f,'utf8')
	a=await m(a)
	await wt(join(o,f),a)
}
await mod(jn(d,f),'希腊语.txt')