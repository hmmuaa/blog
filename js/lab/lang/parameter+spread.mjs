import'#glob'

let
f=(...a)=>a
eq(f(11,22),[11,22])

///旧引擎不支持，v9支持
eq([...'abcdefghijklmnopqrstuvwxyz']
	.flatMap((i,_,a)=>a.map(j=>i+j)).slice(0,100),[
	'aa','ab','ac','ad','ae','af','ag','ah','ai','aj',
	'ak','al','am','an','ao','ap','aq','ar','as','at',
	'au','av','aw','ax','ay','az','ba','bb','bc','bd',
	'be','bf','bg','bh','bi','bj','bk','bl','bm','bn',
	'bo','bp','bq','br','bs','bt','bu','bv','bw','bx',
	'by','bz','ca','cb','cc','cd','ce','cf','cg','ch',
	'ci','cj','ck','cl','cm','cn','co','cp','cq','cr',
	'cs','ct','cu','cv','cw','cx','cy','cz','da','db',
	'dc','dd','de','df','dg','dh','di','dj','dk','dl',
	'dm','dn','do','dp','dq','dr','ds','dt','du','dv'])

let a,b,c,d
[a,b,c,...d]=[...'abcdefghijklmnopqrstuvwxyz']
eq([a,b,c,d],['a','b','c',[...'defghijklmnopqrstuvwxyz']])
;[a,b,...[c,d]]=[...'abcdefghijklmnopqrstuvwxyz']
eq([a,b,c,d],['a','b','c','d'])///不可行