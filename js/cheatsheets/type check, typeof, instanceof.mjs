import'#glob'
eq(typeof'','string')
eq(String('abc'),'abc')
eq(typeof String('abc'),'string')
eq(typeof new String('abc'),'object')
as(new String('abc')instanceof String)

eq(typeof Date(),'string')
eq(typeof Date(0),'string')//实际同上 参数0无效
eq(''+new Date(0),'Thu Jan 01 1970 08:00:00 GMT+0800 (China Standard Time)')
eq(typeof new Date(0),'object')
as(new Date(0)instanceof Date)

eq(typeof/rx/,'object')
as(/rx/ instanceof RegExp)//需要空一格或加括号
as((/rx/)instanceof RegExp)