import'#lab'
import{resolve}from'path'
import{fileURLToPath}from'url'
as(fileURLToPath(import.meta.url).endsWith('import from.mjs'))
as(process.argv[1].endsWith('import to.mjs'))
const entry=resolve(process.argv[1])
///引“https://stackoverflow.com/a/66309132
export const isImport=(
	m,p=resolve(fileURLToPath(m.url))
)=>(
	eq(process.argv[1],fileURLToPath(m.url))
	,as(fileURLToPath(m.url).endsWith('import to.mjs'))
	,!p.includes(entry)
)
///currying又是一种特殊情况，二次调用时完全不产生记录
,forCurrying=()=>
	p(fileURLToPath(import.meta.url),stack())