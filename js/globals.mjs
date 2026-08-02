import _as,{deepEqual as _eq,notDeepEqual as neq
	,throws,rejects}from'assert/strict'
import{inspect}from'util'
import'./array.mjs'

/*给log一个短名 只有调试时用log 调试后都去掉 测试中用eq
如果log不清理就会很难找到当前需要的*/
let l=console.log
,$=(...a)=>(l(...a),a[1]?a:a[0])
///forEach(log)会输出整个数组 用log1
,$1=a=>(l(a),a)
///输出表达式 供eq使用
,$o=a=>$1(inspect(a).replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	// .replaceAll('\n  ','\n')
)

///assert msg非常难找
,f=(msg,_,l='❗'
	,r=l)=>l+msg+r
,as=(a,msg)=>msg?_as(a,f(msg)):_as(a)
,eq=(a,b,msg)=>msg?_eq(a,b,f(msg)):_eq(a,b)
Object.assign(global,{$,$1,$o,as,eq,neq,throws,rejects})