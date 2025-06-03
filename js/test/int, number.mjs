import'#glob'

//isNaN是界面层用的 会隐含转型~
as(!isNaN('123'))
as(isNaN('abc'))
as(!isNaN(null))///注意会转为0
eq(Number(null),0)
as(isNaN(undefined))
eq(Number(undefined),NaN)

eq(typeof 123,'number')
eq(typeof'123','string')

as(Number.isInteger(123))
as(Number.isInteger(123.0))
as(!Number.isInteger(12.3))

as(-0==0)
as(-0===0)
neq(-0,0)
neq(0,-0)
eq(0,+0)

///int-obj
let f=a=>({valueOf:_=>a
,get char(){return String.fromCharCode(97+a)}})
,a=f(5)
eq(+a,5),eq(Math.pow(a,2),25)
eq(a.char,'f')