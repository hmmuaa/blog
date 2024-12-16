import as,{equal as eq,deepEqual as deq}from'node:assert/strict'
const log=console.log
,_方案=((
	lit=`\
qiu wia/ua e ruan tue/ve ying/uai ush ich ouo pun
a siong/ong diang/uang fen geng hang jan kao lai
zei xie ciao vzh/ui bou nin mian`,
	a=lit.split(/\n|\s/).map(a=>!a[1]?[a]
		:[a[0]].concat(a.slice(1).split('/')))
	)=>a)()
,getKey=a=>_方案.find(b=>b.includes(a))[0]
,splitAt = (i, xs) => [xs.slice(0,i), xs.slice(i)]
,split声韵母=_拼=>((
	[_声,_韵]=['a','e','o'].includes(_拼[0])?['',_拼]
		:_拼[1]=='h'?splitAt(2,_拼):splitAt(1,_拼)
	)=>[_声,_韵])()
,_字=_拼=>((
	[_声,_韵]=split声韵母(_拼),
	[a,b]=_声?[getKey(_声),getKey(_韵)]
		:_韵[2]?[_韵[0],getKey(_韵)]
		:_韵[1]?_韵.split(''):[_韵,_韵]
	)=>a+b)()
deq(split声韵母('chang'),['ch','ang'])
deq(split声韵母('hong'),['h','ong'])
eq(_字('chang'),'ih')
eq(_字('hong'),'hs')
eq(_字('ang'),'ah')
eq(_字('an'),'an')
eq(_字('a'),'aa')
export const char=_字