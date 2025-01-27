import'#lab'
typeof i=='undefined'?global.i=0:{}
global.i++//多次import只会执行一次
p(i)
global.f=a=>typeof l=='undefined'?global.l=a:{}