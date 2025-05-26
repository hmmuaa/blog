import'#glob'
const st='Error',ed=`
    at ModuleJob.run (node:internal/modules/esm/module_job:195:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:337:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12)`
/*
这段ed通常都出现在stack结尾 但也有极偶尔时不出现
同一个mjs 在一个路径下每次都有 另一路径下则每次都没有
无法确定其规律
猜测和取stack时是否同时在async loadESM有关
(async导致了规律的随机性)
有时在其stack下 有时不在 通常都在 但并不一定
所幸是否有这段ed似乎和其前部分内容无关 可忽略*/
const p=console.error
export const shorts=(a,b=a)=>({}
	,as(b.startsWith(st)),b=b.slice(st.length)
	,b.endsWith(ed)&&(p('*ed'),b=b.slice(0,-ed.length))
	// ,p(b)
	,b=b.split('\n    at ')
	,eq(b[0],'')
	,b=b.slice(1)
	,b=b.map(b=>b.split(' '))
	,b.every(b=>as(b[b.length-1].includes('file:///')))
	,b=b.map(b=>b.slice(0,-1))
	,b=b.map(b=>b.join(' '))
	,eq(b[0],'p','***'+b+'***'+a+'***')
	,b=b.slice(1).reverse().join('/')
)
// p(compile(Error().stack))