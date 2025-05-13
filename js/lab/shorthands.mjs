import'#glob'
///ternary/三元`:?`
var a=0
!0?a=1:_,eq(a,1)
a=!0?2:_,eq(a,2)
a=0?_:3,eq(a,3)
a=0?_:0?_:4,eq(a,4)

///`&&||??`需要加括号 `:?`则不需要 加括号的格式都非常累赘
var a=0
!0&&(a=1),eq(a,1)
0||(a=2),eq(a,2)
undefined??(a=3),eq(a,3)

///Nullish coalescing assignment/空赋值
var b
eq(typeof b,'undefined')
b??=1
eq(b,1)

eq(typeof t,'undefined')
throws(()=>t,ReferenceError)
global.t??=1
eq(t,1)

///object map
var name='true'
var hasName=({'true':'Y','false':'N'})[name]
eq(hasName,'Y')
var name='fileNotFound'
var hasName = ({
        'true'          : 'Y',
        'false'         : 'N',
        'fileNotFound'  : 'O'})[name];
assert(hasName=='O')

///dictionary
var fruitColors = {
 apple : 'green',
 banana : 'yellow',
 kiwi : 'green',
 plum : 'red'
};
eq(fruitColors['plum'],'red')
eq(fruitColors.plum,'red')
eq(fruitColors[''],undefined)

const fruitColor = fruit =>
  ({ apple: 'green', banana: 'yellow', kiwi: 'green'
  , plum: 'red' }[fruit] ||
  'Nothing');
eq(fruitColor('plum'),'red')
eq(fruitColor(),'Nothing')

///Optional chaining (?.)
function printCustomerCity(customer) {
  return customer?.city ?? 'Unknown city'
}
eq(printCustomerCity({
  name: 'Nathan',
  city: 'Paris',
}),'Paris')
eq(printCustomerCity({
  name: 'Carl',
  details: { age: 82 },
}),'Unknown city')