///data.txt是从
///https://github.com/xinglie/pinyin/blob/master/chars.txt
///复制 有多音字 没有声调 没有优化排序
///去掉了羊xiang:查无此音 乾gan:繁体读音
const log=console.log
,extract=a=>a.split('\n').map(a=>a.split(':"'))
	.map(([a,b])=>[a,b.slice(0,-1)])
import{fileURLToPath}from'url'
import{dirname,resolve}from'path'
import{readFileSync as r}from'node:fs'
const i=resolve(dirname(fileURLToPath(import.meta.url)),'data.txt')
const s=extract(r(i,'utf8'))
export const char=a=>s.filter(b=>b[1].includes(a)).map(a=>a[0])