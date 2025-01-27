import{resolve}from'path'
import{fileURLToPath}from'url'
import{full,stack,skipFile,getFiles}from'./error stack.mjs'
const log=(...a)=>(console.log(...a),a)
,entry=resolve(process.argv[1])
///引“https://stackoverflow.com/a/66309132
export const throughImportMeta=(
	m,p=resolve(fileURLToPath(m.url))
	)=>!p.includes(entry)
///自己写的
,throughErrorStack_old=()=>!skipFile()[0].reverse()[0].startsWith('file://'+entry)
/*
当前入口文件（non-import）特点：入口文件下直接是tdd.mjs；
但好像有不同情况即attempt返回的“非固定的”函数o和x，
这种情况下追踪中没有tdd.mjs而会直接跳到`imp~id~.mjs`
*/
,throughErrorStack=(a=skipFile(2).reverse())=>a[0][1].startsWith(
	'file:///storage/emulated/0/a_a/repos/ajs/lib/tdd.mjs:')
///currying又是一种特殊情况，二次调用时完全不产生记录
,forCurrying=()=>
	console.log(fileURLToPath(import.meta.url),stack())
,isImported=debug=>debug?console.log(entry,full())
	:throughErrorStack()//&&forCurrying()