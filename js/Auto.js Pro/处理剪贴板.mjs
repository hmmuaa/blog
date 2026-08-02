import'#g'
let esc=a=>JSON.stringify(a).slice(1,-1)
eq(esc('\n'),'\\n')
import{getClip,setClip}from'clip_manager'
$(esc(getClip()))

import pr from'../zh2md/2zhihu.mjs'
setClip(pr(getClip()))