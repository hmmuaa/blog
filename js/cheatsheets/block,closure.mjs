import'#g'
let
a=(()=>5)()
eq(a,5)
a=(a=>(a=6,a))()
eq(a,6)