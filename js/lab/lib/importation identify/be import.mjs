import'#lab'
import{resolve}from'path'
import{fileURLToPath}from'url'
eq(decodeURI(Error().stack).split('at ')[1]
	.split(/[/.]/).at(-2),'be import')
eq(process.argv[1].split(/[/.]/).at(-2),'b')
eq(fileURLToPath(import.meta.url).split(/[/.]/).at(-2),'be import')
const entry=resolve(process.argv[1])
///引“https://stackoverflow.com/a/66309132
export const isImport=(
	m,l=resolve(fileURLToPath(m.url))
)=>(
	eq(process.argv[1].split(/[/.]/).at(-2),'b')
	//,eq(l.split(/[/.]/).at(-2),'b')//depends on caller file
	,eq(fileURLToPath(import.meta.url).split(/[/.]/).at(-2),'be import')
	,!l.includes(entry)
)
///currying又是一种特殊情况，二次调用时完全不产生记录
,forCurrying=()=>
	p(fileURLToPath(import.meta.url),stack())

throws(()=>module.parent,ReferenceError)
throws(()=>module.main,ReferenceError)
throws(()=>module,ReferenceError)
throws(()=>require.main,ReferenceError)
throws(()=>require,ReferenceError)