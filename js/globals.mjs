import _as,{deepEqual as _eq,notDeepEqual as neq
	,throws,rejects}from'assert/strict'
import{inspect}from'util'

/*给log一个短名
只有调试时用log 调试后都去掉 测试中用eq
如果log不清理就会很难找到当前需要的
/$要到第二页找 也很麻烦 所以用_*/
let _
,g=globalThis
,l=console.log
///输出表达式 用在eq中
,nsp=a=>inspect(a)
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replace(' [Generator] ','[Generator]')
	.replaceAll('] {',']{')
,p=(...a)=>(l(a.map(nsp).join('\n')),a[1]?a:a[0])
// ,p=(...a)=>(l(...a),a[1]?a:a[0])
///forEach(log)会输出整个数组 用log1
,p1=a=>(p(a),a)
,n='p'
Object.assign(g,{[n]:p,[n+1]:p1,nsp,logFnName:n})
// Object.assign(g,{[n+'o']:po})

let{}=0
///assert msg非常难找
,f=(msg,_,l='❗'
	,r=l)=>l+msg+r
,as=(a,msg)=>msg?_as(a,f(msg)):_as(a)
,eq=(a,b,msg)=>msg?_eq(a,b,f(msg)):_eq(a,b)
Object.assign(g,{as,eq,neq,throws,rejects})

import fs from'./fs.mjs'
import array from'./array.mjs'
Object.assign(g,{fs,array})