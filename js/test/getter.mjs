import'#lab'
const a={
	get g(){p(2);return 3},
	get er(){p(4);unexpected}}
p(1)
p(a.g)
throws(()=>a.er,ReferenceError)

Object.defineProperty(global,'g',{get(){p(6);return 7}})
Object.defineProperty(global,'er',{get(){p(8);unexpected}})
p(5)
p(g)
throws(()=>er,ReferenceError)