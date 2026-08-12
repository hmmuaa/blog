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
f=a=>inspect(a)
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
eq(f(a),'{a:[],i:1}')
a={*g(){yield 1}}.g()
eq(f(a),'Object [Generator] {}')
f=a=>inspect(a)
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replace(' [Generator] ','[Generator]')
eq(f(a),'Object[Generator]{}')

a=Object.assign('a',{i:1})
eq(f(a),$`[String:'a'] {i:1}`)
var g=f,f=a=>g(a)
	.replace('] {',']{')
eq(f(a),$`[String:'a']{i:1}`)

f=a=>inspect(a)
	.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replace(' [Generator] ','[Generator]')
	.replace('] {',']{')