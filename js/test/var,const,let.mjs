import'#g'
/*2026年6月10日 之前一直用const 之后都用let
let重复声明也有检查报错 并且const并没有额外优化
换用let纯为短一点
*/

const {}=1,{}={},[]=[],_=1,a=1///占位 逗号前置用
,f=({}=1,{}={},[]=[],_=1,a=1)=>{}

///定义变量前就可以定义使用变量的函数
function fv(){return v}function fl(){return l}
function fc(){return c}function fd(){return d}
const av=()=>v,al=()=>l,ac=()=>c,ad=()=>d

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
eq(c,undefined),eq(typeof c,'undefined')
eq(d,56),eq(typeof d,'number')
var v;eq(v,12)//*并不会覆盖
//let l//SyntaxError: Identifier 'l' has already been declared
//const c=1,,

eq(fv(),12),eq(fl(),34),eq(fd(),56),eq(fc(),undefined)
eq(av(),12),eq(al(),34),eq(ad(),56),eq(ac(),undefined)
///虽然f定义在v之前 但以call时为准

///但不可以跨scope
function fw(){return w}
function scopedfw(){var w=12;return fw()}
throws(scopedfw,ReferenceError)
const scopedaw=()=>{var w=12;return fw()}
throws(scopedaw,ReferenceError)