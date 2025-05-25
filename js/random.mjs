import'#glob'
const{random:rd,abs}=Math
/*Math.random生成的是0到1 包含0排除1的小数 0<=a<1
因为具体使用中并不像理想中 简单乘一下就行
要准确按需要生成是有些复杂的
这里并没有完成 用到哪里就做到哪里*/
export const random=(a,b,_
	,inRange=(l,m)=>rd()*(m-l)+l
)=>b?inRange(a,b):a?inRange(0,a):rd()

/*
d即st.dev:Standard Deviation:标准差 亦即σ(sigma):总体标准差
量化数据离散程度 值越小分布越集中
值越小则取值范围越窄 而曲线越陡

表面非常简单 就是生成值会乘以stdev
因为生成中心值为零 当缩小stdev时 就不影响中心值 而缩小两侧值
[更多参考](zhuanlan.zhihu.com/p/481760712)

mean→u(μ)：统计学常见
*/
///实际取值范围为±r
,gaussian=(r=1)=>
	Math.sqrt(-2*Math.log(1-rd()))
	*Math.cos(2*Math.PI*rd())/3
///skew值影响均值 0:μ=0 1:μ≈0.564 2:μ≈0.713 5:μ≈0.788 20:μ≈0.796
,_skewed=(s=2,_,z=gaussian(),z2=gaussian())=>
	(s/Math.sqrt(1+s**2))*abs(z)
	+Math.sqrt(1-(s**2)/(1+s**2))*z2
///以上是网上一般写法 以下是优化后写法效率略好 上面留着备查
,skewed=(s=2,_,z=gaussian(),z2=gaussian()
	,s2=s**2,d=Math.sqrt(1+s2)
	)=>(s/d)*abs(z)+(1/d)*z2
,clamped=(g=skewed,l=-1,m=1,v=g())=>l<v&&v<m?v:clamped(g,l,m)
,ranged=(l=1,m=100,_,r=m-l)=>(clamped()+1)/2*r+l

const proba=a=>Math.random()<a