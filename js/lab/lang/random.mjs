import'#glob'
const random=(l,m)=>Math.random()*(m-l)+l,
r=random,l=.1,m=.5,a=[...Array(1e2)].map(_=>r(l,m))
p(a.sort())
a.forEach(a=>assert(l<a&&a<m,a))