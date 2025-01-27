import'#lab'
const fv=()=>v
,fl=()=>l
,fc=()=>c
,fd=()=>d

eq(v,undefined)//v声明对前文生效(但未赋值)
eq(typeof v,'undefined')
throws(()=>l,ReferenceError)
throws(()=>typeof l,ReferenceError)
throws(()=>c,ReferenceError)
throws(()=>typeof c,ReferenceError)
eq(fv(),undefined)
throws(fl,ReferenceError)
throws(fc,ReferenceError)
var v;let l;const c=undefined
eq(v,undefined),eq(l,undefined),eq(c,undefined)

v=12,l=34;const d=56;throws(()=>c=78,TypeError)
eq(v,12),eq(typeof v,'number')
eq(l,34),eq(typeof l,'number')
eq(d,56),eq(typeof d,'number')
eq(c,undefined),eq(typeof c,'undefined')

eq(fv(),12)
eq(fl(),34)
eq(fd(),56)
///虽然f定义在v之前 但以call时为准

var v//*并不会覆盖
eq(v,12)