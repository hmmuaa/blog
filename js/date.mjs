import as,{equal as eq,deepEqual as deq}from'node:assert/strict'
const p=(...a)=>(console.error(...a),a[1]?a:a[0])
///创建
,a=new Date(0)
,b=new Date(Date.UTC(2012,11,20,3,0,0))///月份从0算 1月是0

///Calculating
eq(a.toISOString(),'1970-01-01T00:00:00.000Z')
eq(b.toISOString(),'2012-12-20T03:00:00.000Z')
eq(+a,0)
eq(a.getTime(),0)
eq(+a+5e3,5e3)
deq(new Date(+a+5e3),new Date('1970-01-01T00:00:05.000Z'))

const extendDateCalculating=(()=>{
	Object.prototype.secsLater=(s=5,a=new Date)=>new Date(+a+s*1e3)
	Object.prototype.minsLater=(m=5,s=0,a=new Date)=>new Date(secsLater(m*60+s,a))
	Object.prototype.hrsLater=(h=5,m=0,s=0,a=new Date)=>new Date(minsLater(h*60+m,s,a))
	Object.prototype.daysLater=(d=5,a=new Date)=>new Date(hrsLater(d*24,a))
	Object.prototype.monthsLater=(m=5,a=new Date)=>new Date(new Date(a).setMonth(a.getMonth()+m))
})()
eq(secsLater(5,a).toISOString(),'1970-01-01T00:00:05.000Z')
eq(minsLater(5,0,a).toISOString(),'1970-01-01T00:05:00.000Z')
eq(hrsLater(5,0,0,a).toISOString(),'1970-01-01T05:00:00.000Z')
eq(monthsLater(5,a).toISOString(),'1970-06-01T00:00:00.000Z')

///Calculating 2
as(minsLater()<hrsLater())
as(!(minsLater()>hrsLater()))
eq(new Date(hrsLater(5,0,0,b)-minsLater(5,0,b)).toISOString(),'1970-01-01T04:55:00.000Z')

///extendingDateToString
const asLocal=a=>minsLater(-a.getTimezoneOffset(),0,a),
toLog=a=>asLocal(a).toISOString().slice(5,-5).replace('T',' ')
export const stamp=(a=new Date)=>asLocal(a).toISOString().slice(0,-5)
	.replace('T','').replaceAll('-','').replaceAll(':',''),
stampms=(a=new Date)=>asLocal(a).toISOString().slice(0,-1)
	.replace('T','').replace('.','')
	.replaceAll('-','').replaceAll(':','')
Date.prototype.toAutoJsLog=function(){return toLog(this)}
Date.prototype.stamp=function(a){return stamp(this)}

eq(a.toAutoJsLog(),'01-01 08:00:00')
eq(a.stamp(),'19700101080000')
eq(stampms(a),'19700101080000000')

const sp=(a=new Date())=>asLocal(a).toISOString()
	.slice(0,-1).split(/[-T:.]/)
export const mmdd=a=>sp(a).slice(1,3).join('')
deq(sp(a),['1970','01','01','08','00','00','000'])
eq(mmdd(a),'0101')

///format
eq(new Intl.DateTimeFormat('en-US',{
	month:'2-digit',day:'2-digit',year:'numeric'
}).format(a),'01/01/1970')
eq(a.toLocaleDateString('en-US',{
	month:'2-digit',day:'2-digit',year:'numeric'
}),'01/01/1970')
eq(a.toLocaleDateString(undefined,{
	year:'numeric',month:'2-digit',day:'2-digit',
}),'01/01/1970')