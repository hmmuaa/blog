import'#glob'
let a,b
/*overriding:替换一个函数 并更新引用
理想的最简写法 但错误*/
a=(f=()=>'old',g=()=>f())=>({f,g})
eq(a().g(),'old')
a={...a(),f:()=>'new'}
eq(a.g(),'old')

/*正确写法 注:只有花括号语法支持this*/
a={g(){return this.f()},f:()=>'old'}
eq(a.g(),'old')
a={...a,f:()=>'new'}
eq(a.g(),'new')

/*箭头函数的成功写法*/
a=(_={})=>(_.g=()=>_.f(),_.f=()=>'foo',_)
eq(a().g(),'foo')
b=_=>(_=a(),_.f=()=>'bar',_)
eq(b().g(),'bar')

/*居然也能这样写 但只对instance有效*/
a={f:()=>'foo',g:()=>a.f()}
eq(a.g(),'foo')
a={...a,f:()=>'bar'}
eq(a.g(),'bar')

/*却没有override(未正确更新引用) a.f的引用是死的 以下未成功*/
a={f:()=>'foo',g:()=>a.f()}
eq(a.g(),'foo')
b={...a,f:()=>'bar'}
eq(b.g(),'foo')

/*Object.assign与以上情况相同 只改了instance 未更新引用*/
a={f:()=>'foo',g:()=>a.f()}
eq(a.g(),'foo')
Object.assign(a,{f:()=>'bar'})
eq(a.g(),'bar')

/*失败*/
a={f:()=>'foo',g:()=>a.f()}
eq(a.g(),'foo')
b={...a}
Object.assign(b,{f:()=>'bar'})
eq(a.g(),'foo')
eq(b.g(),'foo')

/*以下尝试未成功*/
a=()=>({f:()=>'foo',g:()=>a().f()})
eq(a().g(),'foo')
b=()=>({...a(),f:()=>'bar'})
eq(b().g(),'foo')

a=(a={f:()=>'foo',g:()=>a.f()})=>a
eq(a().g(),'foo')
b=(c={...a(),f:()=>'bar'})=>c
eq(b().g(),'foo')

a=(a={f:()=>'foo',g:()=>a.f()})=>a
eq(a().g(),'foo')
b=(d=a(),c={...d,f:()=>'bar'})=>c
eq(b().g(),'foo')