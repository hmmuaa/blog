import as,{deepEqual as eq,notDeepEqual as neq,throws,rejects}from'assert/strict'
import{inspect}from'util'
const
///log+error stack (输出函数名)
log=console.log
,fix=(s,...a)=>s
	.split(' (file:///')[1]///早先写法 可能需要根据以上测试更新
	.split(' at ').last()
,p=(...a)=>(log((Error().stack),...a),a[1]?a:a[0])
Object.assign(global,{p,as,eq,neq,throws,rejects})