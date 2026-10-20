import'#g'
import zd2md from'./zd2md,261012.mjs'
const{readFile,writeFile,exists,readdir,mkdir}=await import('fs/promises')
// ,{allNest}=await import('../lib/_collected/fs.mjs')
,{parse,format,dirname,join}=await import('path')
,i=`/storage/emulated/0/a_a/gh/hmmuaa/blog/哲学/央视三国  260929`
// ,i='/sdcard/a_a/Markor/文学/个人注解'
,o=i+`/.output`
// ,o=''//'/sdcard/a_a/Markor/zh2md'
,wr=(p,t,d=dirname(p))=>(
	mkdir(d,{recursive:true}).then(writeFile(p,t,'utf8')))
,l=(await readdir(i)).map(a=>join(i,a))
l.filter(a=>a.endsWith('.zd'))
	.map(a=>[a,format({...parse(a),base:'',ext:'.zd.md'})])
	// .map(a=>[a,format((a=>({...a,dir:join(o,a.dir),ext:'zh2.md'}))(parse(a)))]))
	.forEach(async([i,o])=>wr(o,zd2md(await readFile(i,'utf8'))))