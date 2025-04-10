import'#lab'
let f,a='江河湖海'.split(''),b
f=(a,i)=>{return{next(){return{value:a[i++],done:i==a.length}}}}
f=(a,i)=>{return{next:()=>({value:a[i++],done:i==a.length})}}
f=(a,i=0)=>({next:()=>({value:a[i++],done:i==a.length})})
b=f(a)
eq(b.next().value,'江')
a.slice(1).every(a=>eq(b.next().value,a))

///一行行读文件 proc每次读一行删一行 f把proc封装成f
import{readFileSync as rd,writeFileSync as wt}from'fs'
import{mkdir as md}from'fs/promises'
f='.tmp/sample.dat'
await md(f.split('/')[0],{recursive:true})
rd(f,'utf8')||wt(f,'小米\nOPPO\nvivo\n中兴\n华为')

let fileProc=(f=>p=>(
	a=rd(f,'utf8'),a&&///判断文件是否空了
	p((b=a.split('\n'))[0])
		&&wt(f,b.slice(1).join('\n'))
))(f)
fileProc(p)

///没写好
f=i=>{return{
	next(){
		if (a=i()) {
			return { value: a, done: false }
		}
		return { done: true }
	}
}}
a=f(()=>fileProc(p))
let g
while(g=a.next().value)g()