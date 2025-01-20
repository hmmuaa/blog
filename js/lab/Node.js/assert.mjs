import as from'assert'
let{deepEqual:eq,notDeepEqual:neq}=as
eq(1,true),eq(1,'1')
eq([1,2],[1,2])
neq([1,2],[2,1])//需要顺序一致

import st from'assert/strict'
({deepEqual:eq,notDeepEqual:neq}=st)
neq(1,true),neq(1,'1')
eq([1,2],[1,2])
neq([1,2],[2,1])//需要顺序一致