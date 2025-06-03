import'../global.mjs'
let
a={current:1,adv:function(steps=1){this.current+=steps;return this}}
eq(a.current,1)
a.adv(),eq(a.current,2)
eq(a.adv.bind({current:5})().current,6)

a={current:1,adv(steps=1){this.current+=steps;return this}}
eq(a.current,1)
a.adv(),eq(a.current,2)
eq(a.adv.bind({current:5})().current,6)

///对af无用
,((a, b, c) => {
  console.info(a, b, c) // 1, 2, 3
}).bind(undefined, 1, 2, 3)()