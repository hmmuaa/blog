import'#glob'
const gFn=a=>Object.getOwnPropertyNames(a).filter(b=>
	typeof a[b]=='function')
let a=''
eq(Object.getOwnPropertyNames(a),['length'])
eq(gFn(a),[])
eq(Object.keys(a),[])
eq(Object.values(a),[])
eq(Object.entries(a),[])
eq(a.prototype,undefined)

a=console
eq(Object.getOwnPropertyNames(a),[
	'log','warn','dir','time','timeEnd','timeLog','trace','assert',
	'clear','count','countReset','group','groupEnd','table',
	'debug','info','dirxml','error','groupCollapsed',
	'_stdout','_stderr','_stdoutErrorHandler',
	'_stderrErrorHandler','_ignoreErrors','_times',
	'Console','profile','profileEnd','timeStamp','context',
	'setLogFilePath'])
eq(gFn(a),[
	'log','warn','dir','time','timeEnd','timeLog','trace','assert',
	'clear','count','countReset','group','groupEnd','table',
	'debug','info','dirxml','error','groupCollapsed',
	'_stdoutErrorHandler','_stderrErrorHandler',
	'Console','profile','profileEnd','timeStamp','context',
	'setLogFilePath'])
eq(Object.keys(a),[
	'log','warn','dir','time','timeEnd','timeLog','trace','assert',
	'clear','count','countReset','group','groupEnd','table',
	'debug','info','dirxml','error','groupCollapsed',
	'Console','profile','profileEnd','timeStamp','context',
	'setLogFilePath'])
eq(a.prototype,undefined)

a=Math
eq(Object.getOwnPropertyNames(a),[
	'abs','acos','acosh','asin','asinh','atan','atanh','atan2',
	'ceil','cbrt','expm1','clz32','cos','cosh','exp','floor',
	'fround','hypot','imul','log','log1p','log2','log10','max',
	'min','pow','random','round','sign','sin','sinh','sqrt',
	'tan','tanh','trunc',
	'E','LN10','LN2','LOG10E','LOG2E','PI','SQRT1_2','SQRT2'])
eq(gFn(a),[
	'abs','acos','acosh','asin','asinh','atan','atanh','atan2',
	'ceil','cbrt','expm1','clz32','cos','cosh','exp','floor',
	'fround','hypot','imul','log','log1p','log2','log10','max',
	'min','pow','random','round','sign','sin','sinh','sqrt',
	'tan','tanh','trunc'])
eq(Object.keys(a),[])
eq(Object.values(a),[])
eq(Object.entries(a),[])