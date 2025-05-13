import'#glob'
import{format as uf,inspect as insp}from'util'
///参数不能多次使用 引https://nodejs.org/api/util.html#utilformatformat-args
eq('foo:%s',uf('%s:%s','foo'))

const refFn=Math.floor,arFn=(a,b)=>a+b,curFn=a=>b=>a+b
,a={i:11,n:22.2,s:'abc',a:[33,44.4,'def',[55,66.6],{s:'hij'}]
	,o:{i:77,n:88.8,s:'fizz',a:[99,11.1,'buzz'],o:{s:'klm',n:88.8}}
	,refFn,arFn,curFn
}

const sort=a=>a.replaceAll(': ',':').replaceAll(', ',',')
	.replaceAll('{ ','{').replaceAll(' }','}')
	.replaceAll('[ ','[').replaceAll(' ]',']')
	.replaceAll('\n  ','\n')
,o=a=>`,s=\`${sort(uf('%s',a))}\`
	,O=\`${sort(uf('%O',a))}\`
	,o=\`${sort(uf('%o',a))}\`
	,j=\`${sort(uf('%j',a))}\``
//p(o(a))
///object
;(()=>{
	const _=0
	,s=`{\ni:11,\nn:22.2,\ns:'abc',\na:[Array],\no:[Object],
refFn:[Function:floor],\narFn:[Function:arFn],
curFn:[Function:curFn]\n}`
	,O=`{\ni:11,\nn:22.2,\ns:'abc',
a:[33,44.4,'def',[55,66.6],{s:'hij'}],
o:{\n  i:77,\n  n:88.8,\n  s:'fizz',
  a:[99,11.1,'buzz'],\n  o:{s:'klm',n:88.8}\n },
refFn:[Function:floor],\narFn:[Function:arFn],
curFn:[Function:curFn]\n}`
	,o=`{\ni:11,\nn:22.2,\ns:'abc',
a:[\n  33,\n  44.4,\n  'def',\n  [55,66.6,[length]:2],
  {s:'hij'},\n  [length]:5\n ],
o:{\n  i:77,\n  n:88.8,\n  s:'fizz',
  a:[99,11.1,'buzz',[length]:3],\n  o:{s:'klm',n:88.8}\n },
refFn:[Function:floor] {[length]:1,[name]:'floor'},
arFn:[Function:arFn] {[length]:2,[name]:'arFn'},
curFn:[Function:curFn] {[length]:1,[name]:'curFn'}\n}`
	,j=`{"i":11,"n":22.2,"s":"abc","a":[33,44.4,"def",[55,66.6],{"s":"hij"}],"o":{"i":77,"n":88.8,"s":"fizz","a":[99,11.1,"buzz"],"o":{"s":"klm","n":88.8}}}`
	eq(''+a,'[object Object]')//不展开对象和数组
	eq(''+[1,a],'1,[object Object]')
	eq(sort(uf('%s',a)),s)//只展开第一层
	eq(uf('%s',[1,a]),'[ 1, [Object] ]')
	
	eq(sort(uf('%O',a)),O),eq(uf('%O',a),insp(a))//会展开3层
	eq(uf('%O',[1,a]),insp([1,a]))
	// console.log(a)//默认log与O相同
	// console.log([1,a]),console.log(uf('%O',[1,a]))
	
	eq(sort(uf('%o',a)),o)//好像是包括getter
	
	eq(uf('%j',a),j),eq(uf('%j',a),JSON.stringify(a))//Json
	eq(uf('%j',[1,a]),uf('[1,%s]',j))
	eq(uf('%j',[1,a]),JSON.stringify([1,a]))
})()

const v=(f,s,i,o)=>{
	eq(''+f,s)
	eq(uf('%s',f),s)
	eq(insp(f),i)///log()没有format时使用insp
	eq(uf('%O',f),i)
	eq(uf('%o',f),o)
	eq(uf('%j',f),'undefined')
	eq(JSON.stringify(f),undefined)
}
///arrow fn
v(a.arFn,'(a,b)=>a+b',
	'[Function: arFn]',`[Function: arFn] { [length]: 2, [name]: 'arFn' }`)
///currying
v(a.curFn,'a=>b=>a+b'
	,'[Function: curFn]',`[Function: curFn] { [length]: 1, [name]: 'curFn' }`)
///fn ref
v(a.refFn,'function floor() { [native code] }'
	,'[Function: floor]',`[Function: floor] { [length]: 1, [name]: 'floor' }`)

///date
;((a=new Date(0)
	,s='Thu Jan 01 1970 08:00:00 GMT+0800 (China Standard Time)'
	,o='1970-01-01T00:00:00.000Z'
	,j='"1970-01-01T00:00:00.000Z"'
)=>{
	eq(''+a,s)
	eq(uf('%s',a),o)
	eq(insp(a),o)///log()没有format时使用insp
	eq(uf('%O',a),o)
	eq(uf('%o',a),o)
	eq(uf('%j',a),j)
	eq(JSON.stringify(a),j)
	eq(a.toString(),s)
	eq(a.toISOString(),o)
})()