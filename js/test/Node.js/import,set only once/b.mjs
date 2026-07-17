import'#g';import{f}from'./be import.mjs';import'./a.mjs'
eq(f(import.meta).split(/[/.]/).at(-2),'a')
eq(j,16)
///b.mjs内容会最后执行 a执行在前
///只有import链上最内一级最先被执行会传入
g(import.meta)
eq(url2.split(/[/.]/).at(-2),'a')