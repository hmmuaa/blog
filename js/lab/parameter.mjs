import'#glob'
let f=(a,b=a*2)=>a+b
eq(f(1),3)
throws((a,b=a*2,c=d*3,d=4)=>[a,b,c,d])//ReferenceError: Cannot access 'd' before initialization
f=(a,b=a*2,c=_=>d*3,d=4)=>[a,b,c(),d]
eq(f(1),[1,2,12,4])