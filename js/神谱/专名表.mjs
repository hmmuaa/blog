import'#g'
import{readFile as rd}from'fs/promises'
let l=()=>rd('专名表.txt','utf8').then(a=>a.split('\n'))
,r=l.join('|')
,mark=a=>a.
p(await l())