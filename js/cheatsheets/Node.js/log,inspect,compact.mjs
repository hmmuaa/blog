import'#g'
import{inspect}from'util'
var f=inspect,a=[{}]
,$=String.raw
eq(f(a),'[ {} ]')
f=a=>inspect(a)
	.replaceAll('[ ','[').replaceAll(' ]',']')
eq(f(a),'[{}]')
a={a:[],i:1}
eq(f(a),'{ a: [], i: 1 }')
f=(...a)=>inspect(...a)
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
eq(f(a),'{a:[],i:1}')

a='.,..,...,....,.,.,.,.,.'.split(',')
eq(f(a),`[\n  '.',   '..','...',\n  '....','.', '.',\n  '.',   '.', '.'\n]`)
let opt={compact:true,breakLength:Infinity}
f=a=>inspect(a,opt)
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
a='.,..,...,....,.,.,.,.,.'.split(',')
eq(f(a),`['.','..','...','....','.','.','.','.','.']`)

a={*g(){yield 1}}.g()
eq(f(a),'Object [Generator] {}')
f=a=>inspect(a,{compact:true,breakLength:Infinity})
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replace(' [Generator] ','[Generator]')
eq(f(a),'Object[Generator]{}')

///注意 使用defaultOptions是会影响eq报错格式的
// inspect.defaultOptions.breakLength=Infinity
// inspect.defaultOptions.compact=true

a=[Object.assign('a',{i:1}),Object.assign('b',{i:2})]
/*注意在这里compact不同会出现结果“{”位置区别
“{”在前相对更合理 表示整个是对象
“{”则其实更符合Object.assign的格式
(环境是Node.JS 14)*/
// eq(f(a,$`[[String:'a'] {i:1},[String:'b'] {i:2}]`)
eq(f(a),$`[{[String:'a'] i:1},{[String:'b'] i:2}]`)
// var g=f,f=a=>g(a)
// 	.replaceAll('] {',']{')
f=a=>inspect(a,{compact:true,breakLength:Infinity})
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replaceAll('] ',']')
	.replace(' [Generator] ','[Generator]')
eq(f(a),$`[{[String:'a']i:1},{[String:'b']i:2}]`)

import{inspect as _nsp}from'util'
var _
,nsp=(a,o)=>_nsp(a,{compact:true,breakLength:Infinity,...o})
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replaceAll('] ',']')
	.replace(' [Generator] ','[Generator]')