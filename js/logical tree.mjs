import'#g'
/*
#逻辑结构分几种
.1维/线性:数组 链表 队列 栈
.2维/树形:二叉树 决策树 堆
.3维/图状/网状:有向图 无向图 社交网络图
.0维/集合
*‘性､形､状’标示的种类也值得注意

##案例及细分
*网状结构有一类特殊情况
公路网是现实条件形成的特定二维网状结构
在平面上交叉自然形成路口
而加入立交桥及隧道则是三维网状结构
以及加入地铁､船､航班等构成的交通网
航班网则本身就是三维
公交线路网..需要再考虑

*树形结构也分几种情况
-行政区省-市-县､生物门-纲-目-科 是固定层级树
(但其实行政区和生物分类都允许特殊情况)
‘谱系’的系可能指有这种层级框架的
-家谱 和真实的树 是不固定层级/自然树

二维网､固定层级树
对网和树的本身特点都没有影响
/主要是和AI交流时 AI爱拿这些特殊情况抬杠

#Logical tree, fixed
按:原用在zd/md转换中
转换有两种方式 1是先建模tree-DOM 偏向OO
2是用正则全文匹配 偏向FP
tree写了基本实现 不过tree方式和FP有些不符
现暂停 转用全文正则

树状结构可分自由层级和固定层级两种
一般会认为树结构是自由层级
这里实现的是固定层级结构/“fixed-levels tree” 缩写ftree
还可以叫hierarchy/层级结构 有分固定等级的含义

比如“干-枝-叶” 或“文-段-句-语”
所有分支都到最末一级
即有段就必有句 必有语
或者反过来看 有语才有句 才有段
每级都是上级的必要成员
/这种似乎叫“矩阵”更贴切?
*/
const{}={}
/*
不同实现方式
#其它思路备忘
.json本身就是序列和反序列
.浏览器js有dom nodejs没有 (有npm)
*/
,recursive=(_=>(_={
  build:(a,fs=[],[sp,...r]=fs)=>
    !sp?a:a.split(sp).map(a=>_.build(a,r)),
  flat:(a,fs=[],[sp,...r]=fs)=>
    !sp?a:a.map(a=>_.flat(a,r)).join(sp),
},_))()
,byReduce={
  build: (a, fs = []) =>
    fs.reduceRight(
      (next, sp) => x => x.split(sp).map(next),
      x => x
    )(a),
  flat: (a, fs = []) =>
    fs.reduceRight(
      (next, sp) => x => x.map(next).join(sp),
      x => x
    )(a)
}
,_=recursive
var a,b
a=`a,b,c,d;e,f,g`
b=[['a','b','c','d'],['e','f','g']]
eq(_.build(a,`;,`.split('')),b)
eq(_.flat(b,`;,`.split('')),a)
a=`a,b;e.h,i;l,m`
b=[[['a','b'],['e']],[['h','i'],['l','m']]]
eq(_.build(a,`.;,`.split('')),b)
eq(_.flat(b,`.;,`.split('')),a)
// a=`a,b,c,d;e,f,g.h,i;l,m:o,p.u,v`
// p(_.build(a,`:.;,`.split('')))
export default _