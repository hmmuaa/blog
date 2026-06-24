/*豆包md转z
*/
import'#g'
import markNames from'../神谱/专名表.mjs'
let
maps=`\
﹑	、
(	（
)	）
-	- 
.	. 
\\n	。
\\n	；
 	，
:	：
￫	→

￫	￫ 
/	/ 
+	+ 

\\n\\n	\\n \\n
\\n\\n	\\n\\n\\n
`.split('\n').filter(a=>a).map(a=>a.replaceAll('\\n','\n').split('\t'))
,pr=a=>Promise.resolve().then(()=>a)
,trans=a=>pr(a).then(a=>maps.reduce((z,[a,b])=>z.replaceAll(b,a)
	,a.replace(/\u200B/g,''))
	.trimEnd())
	.then(markNames)
import{getClip,setClip}from'clip_manager'
p(await trans(getClip()))