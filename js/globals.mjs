/*给log一个短名
只有调试时用log 调试后都去掉 测试中用eq
如果log不清理就会很难找到当前需要的
/$要到第二页找 也很麻烦 所以用_*/
import{inspect as _nsp}from'util'
let _
,g=globalThis
,l=console.log
///输出表达式 用在eq中
,nsp=a=>_nsp(a)
	.replaceAll(': ',':').replaceAll(/,\s+/g,',')
	.replaceAll('\n  ','')
	.replaceAll(/\[\s+/g,'[').replaceAll(' ]',']')
	.replaceAll(/{\s+/g,'{').replaceAll(/\s+}/g,'}')
	.replace(' [Generator] ','[Generator]')
	.replaceAll('] {',']{')
,p=(...a)=>(l(a.map(nsp).join('\n')),a[1]?a:a[0])
// ,p=(...a)=>(l(...a),a[1]?a:a[0])
///forEach(log)会输出整个数组 用log1
,p1=a=>(p(a),a)
,n='p'
Object.assign(g,{[n]:p,[n+1]:p1,[n+'o']:l,nsp,logFnName:n})
// Object.assign(g,{[n+'o']:po})

///assert msg非常难找
import _as,{deepEqual as _eq,notDeepEqual as _neq
	,throws,rejects}from'assert/strict'
let{}=0
,f=(msg,_,l='❗'
	,r=l)=>l+msg+r
,as=(a,msg)=>msg?_as(a,f(msg)):_as(a)
,eq=(a,b,msg)=>msg?_eq(a,b,f(msg)):_eq(a,b)
// function eq(a,b,msg){
// 	Error.captureStackTrace(globalThis,eq)
// 	msg?_eq(a,b,f(msg)):_eq(a,b)
// }//不会用

///not-equal增加一个but-equal参数 忽略原message参数
,neq=(a,b,c)=>(_neq(a,b),c&&(eq(a,c)))
Object.assign(g,{as,eq,neq,throws,rejects})

let $=String.raw
import fs from'./fs.mjs'
import array from'./array.mjs'
Object.assign(g,{$,fs,array})