import{char as py}from'./拼音/拼音.mjs'
const log=console.log
,extract=a=>((
	groups=a=>a.split('\n#')///“#”分段
	,spl=a=>a.split(a.includes('|')?'|':'')
	,words=a=>(b=>(
		[,a,b]=a.split('\n')///行1标题2符号3名称 后面都是注释
		,a=spl(a),b=spl(b)
		,a.map((a,i)=>[a,b[i]])))()
	)=>groups(a.trimEnd()).map(words))()
,addPy=a=>((
	char=a=>py(a).join('/'),
	word=a=>a.match(/^\w+/g)?a:
		a.match(/\w/)?a.slice(1):
		a.match(/\W\w*/g).map(char).join('')
	)=>a.map(a=>a.concat([word(a[1])])))()
,encodeTable=a=>a.flat().map(a=>a.join('|')).join('\n')
///多音字问题从简方案:通过括号手动指定

import{readFileSync as r,writeFileSync as w
	,existsSync,mkdirSync}from'node:fs'
const i='常用语.zh',o='常用语+标注拼音.zh'
var a=extract(r(i,'utf8')).map(addPy)
,a=encodeTable(a)
log(a)
w(o,a,'utf8')