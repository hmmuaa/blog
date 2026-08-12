import'#g'
// import{stampms}from'./date.mjs'
import{readFile as rd,writeFile as wt}from'fs/promises'
import{join,extname as xn}from'path'
var
modify=async(f,t,m)=>{
	let a=await rd(f,'utf8')
	a=await m(a)
	await wt(t,a)
}
,output=(f,t,p=join('output',f))=>wt(p,t)
// ,output=(n,t,f=join('output',n+1+'.z'))=>wt(f,t,{flag:'wx'})
,getSample=n=>rd(join('samples',n),'utf8')
,samples=new Proxy({},{get:(_,v)=>getSample(v)})
export default{modify,output,samples}