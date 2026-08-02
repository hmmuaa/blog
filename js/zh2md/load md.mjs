import'#g'
/*剪贴板转md-table*/
let toMap=(k,v)=>k.map((k,i)=>[k,v[i]])
,toObj=(k,v)=>Object.fromEntries(toMap(k,v))
///data-table
,dt=(a
	,[h,b]=a.split(/\n[: -\|]+\n/)
)=>(h=h.split('|'),b.split('\n').map(a=>toObj(h,a.split('|'))))
eq(dt('a|b|c\n|---\nh|i|j\no|p|q')
	,[{a:'h',b:'i',c:'j'},{a:'o',b:'p',c:'q'}])
///cross-table, categorying-table, 2D-table
let row2ob=(a,k,[n,...v]=a.split('|')
)=>[n,toObj(k,v)]
,xt=(a
	,[h,b]=a.split(/\n[: -\|]+\n/)
)=>(h=h.split('|').slice(1)
	,Object.fromEntries(b.split('\n').map(a=>row2ob(a,h))))
eq(xt('a|b|c|d\n|---\nh|o|p|q\ni|u|v|w')
	,{h:{b:'o',c:'p',d:'q'},i:{b:'u',c:'v',d:'w'}})