import'#g'
/*思路备忘
.json本身就是序列和反序列
.浏览器js有dom nodejs没有 (有npm)
*/
/*Logical tree, fixed
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