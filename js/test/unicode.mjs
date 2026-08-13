import'#g'
var _
,a='♈︎♉︎♊︎♋︎♌︎♍︎♎︎♏︎♐︎♑︎♒︎♓︎'
,f=a=>a.match(/\p{Grapheme_Base}\p{Grapheme_Extend}|\p{Grapheme_Base}/gu)
eq(f(a),['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'])