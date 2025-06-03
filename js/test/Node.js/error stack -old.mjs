///error stack util，作者欸欸
///只配合`log with error stack.mjs”使用
const assert=console.assert,
st=`Error
    at full (file:///storage/emulated/0/a_a/repos/ajs/lib/error stack.mjs:16:33)
    at file:///storage/emulated/0/a_a/repos/ajs/lib/error stack.mjs:17:19
    at get (file:///storage/emulated/0/a_a/repos/ajs/lib/error stack.mjs:19:2)
    at `,
ed=`
    at ModuleJob.run \\(node:internal/modules/esm/module_job:195:25\\)
    at async Promise.all \\(index 0\\)
    at async ESMLoader.import \\(node:internal/modules/esm/loader:337:24\\)
    at async loadESM \\(node:internal/process/esm_loader:88:5\\)(
    at async handleMainPromise \\(node:internal/modules/run_main:61:12\\))?$`,
sp='\n    at ',
ref=':[0-9]{1,3}:[0-9]{1,3}',
ignoreRef=a=>a.replaceAll(RegExp(ref,'g'),ref),
fix=a=>'^'+ignoreRef(a).replaceAll('(','\\(').replaceAll(')','\\)'),
stx=RegExp(fix(st)),edx=RegExp(ed),
valid=a=>assert(a.match(stx)&&a.match(edx),a)
export const full=()=>decodeURI(Error().stack)
const get=()=>((a=full())=>
	valid(a)??a.replace(stx,'').replace(edx,'').split(sp)
)()
export default get