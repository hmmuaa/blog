/*豆包md转z
*/
import'#g'
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
,trans=a=>maps.reduce((z,[a,b])=>z.replaceAll(b,a)
	,a.replace(/\u200B/g,''))
	.trimEnd()
p(maps)
import{getClip,setClip}from'clip_manager'
setClip(trans(getClip()))