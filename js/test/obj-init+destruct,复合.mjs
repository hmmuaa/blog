import'#g'
///复合object initializer and destructor
let a
a=Object.assign('abc'.split(''),{i:1,n:2.3})
{
	eq(nsp(a),`['a','b','c',i:1,n:2.3]`)
	let i,n,r,s,t,u
	u={0:r,1:s,2:t,i,n}=a
	eq([r,s,t,i,n],['a','b','c',1,2.3])
	,{...r}=a
	eq(r,{'0':'a','1':'b','2':'c',i:1,n:2.3})
	r=[...a]
	eq(r,['a','b','c'])
	,[...r]=a
	eq(r,['a','b','c'])
}
///Destruct array注意
{
	///使用destruct数组语法时 custom properties会被忽略 会消失
	var{i}=a
	eq(i,1)
	var[...{length,i}]=a
	eq([length,i],[3,undefined])
	
	///数组一直在被隐含重建
	eq(a.length,3)
	var[u,...{length}]=a
	eq([u,length],['a',2])
	var[u,v,...{length}]=a
	eq([u,v,length],['a','b',1])
}
{
	let b,c,d,e,i;0
	,{i,...b}=a
	eq(b,{'0':'a','1':'b','2':'c',n:2.3})
	///注意 此时b已经不是数组
	as(a instanceof Array),as(!(b instanceof Array))
	eq(b[0],'a')
	eq([...a],['a','b','c'])
	throws(()=>[...b],/TypeError: b is not iterable/)
}
{
	///用链赋值
	let i,n,r,s,t,u,v
	r=[s,t,...u]={i,n,...v}=a
	eq([i,n,r,s,t,u,v],[1,2.3,a,'a','b',['c'],{'0':'a','1':'b','2':'c'}])
}