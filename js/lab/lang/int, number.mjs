import'#glob'

//isNaN是界面层用的 会隐含转型~
assert(!isNaN('123'))
assert(isNaN('abc'))
assert(!isNaN(null))///注意会转为0
eq(Number(null),0)
assert(isNaN(undefined))
eq(Number(undefined),NaN)

eq(typeof 123,'number')
eq(typeof'123','string')

assert(Number.isInteger(123))
assert(Number.isInteger(123.0))
assert(!Number.isInteger(12.3))