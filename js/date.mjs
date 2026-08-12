import'#g'
makeTimestamp = () =>
		new Date(new Date().setUTCHours(new Date().getUTCHours() + 8))
		.toJSON().slice(2, -5).replace(/(-)|(T)|(:)/g, '')
code=(a=new Date)=>asLocal(a).toISOString().slice(2,-5)
	.replace('T','').replaceAll('-','').replaceAll(':','')