import'#lab'
import{resolve}from'path'
import{fileURLToPath}from'url'
eq(process.argv[1],fileURLToPath(import.meta.url))
const g=a=>a.split('/').slice(-1)[0].slice(0,-4)
eq(g(process.argv[1]),'1.try local')
const entry=resolve(process.argv[1])
///引“https://stackoverflow.com/a/66309132
const throughImportMeta=(
	m,p=resolve(fileURLToPath(m.url))
	)=>!p.includes(entry)
///currying又是一种特殊情况，二次调用时完全不产生记录
,forCurrying=()=>
	p(fileURLToPath(import.meta.url),stack())

throws(()=>module.parent,ReferenceError)
throws(()=>module.main,ReferenceError)
throws(()=>module,ReferenceError)
throws(()=>require.main,ReferenceError)
throws(()=>require,ReferenceError)