import'#g'
let d='.'
,f='sacred-texts-gtheo.txt'
/*
以两个文本版为主 一个影印版为辅 互相核对
因预计影印版OCR工作量过大
先文字版互相核对 有出入时再以影印版为准
两版排版质量都各有问题 确定不是互相复制
纠正明显错误后 两版文本高度一致
只是有特定段落 三版的行序都不一样

##几版线上全文获取方法
-<uoa.gr>是雅典大学域名 但无确切发布者信息
-Sacred Text
-Perseus
-<physics.ntua.gr>(雅典国立技术大学)

*Perseus多个版本
<https://catalog.perseus.org/catalog/urn:cts:greekLit:tlg0020.tlg001>
在Editions下有四个版本 其中最新的是1914版
但其实“Quick-Find”是更新的1999版
区别如 99版第25行末是冒号 其他版本是间隔号
但99版处理较繁琐 实际收录14版
本站(14和99版)和UOA/ST版文本区别较多
如L15
u:“ἠδὲ Ποσειδάωνα γαιήοχον, ἐννοσίγαιον”
p:“ἠδὲ Ποσειδάωνα γεήοχον, ἐννοσίγαιον”
如L48
u:“ἀρχόμεναί θ᾽ ὑμνεῦσι θεαὶ λήγουσαί τ' ἀοιδῆς”
p:“ἀρχόμεναί θ᾽ ὑμνεῦσι καὶ ἐκλήγουσαι ἀοιδῆς”
据查 u版更符合传统写法 p版偏现代化
两版区别较多 放弃p版

*NTUA(雅典国立技术大学)
根据以上整理经验又找到这版

260609全选文本复制<https://sacred-texts.com/cla/hesiod/gtheo.htm>
1.该文用空格排版 源码大量`&nbsp;` 估计处理文本比html方便
.与其它源对比 以及AI核实 第4-5行中间空行错 可能还有其它错空行
.全部行首空四格也错
*/
let m=a=>a
	.split('this file.\n\n')[1].split('\n\n \n\n------------')[0]
	.replaceAll('\n\n','\n')
	.replaceAll('\n    ','\n')
	// .replaceAll(' \n','\n')
	.replace('Ἡσίοδος\nΘεογονία\n \n \n','Ἡσίοδος - Θεογονία\n\n')//标题
	.replaceAll('\n \n','\n\n')
	.replace('\n    (σημείωση)\n','')//,l292备注 后插内容
	.replace('\n    Αὐτὸς','\nΑὐτὸς')//l924
	.replace('\n    Κίρκη','\nΚίρκη')//l1011
	.replace('\nᾮ  δ᾽','\nᾮ δ᾽')//429
	.replace(/(?<!\n) ? + /g,'--')//l10开头有空格
	.replace('Κρονίωνος·\n\nκαί','Κρονίωνος·\nκαί')//l5错空行
	.replace(' μιγεῖσα--925',' μιγεῖσα')//错,与影印版核对
	.normalize('NFD').normalize('NFC')
	.replaceAll('·','·')
	.replaceAll('῾Ρ','Ῥ')//.replace(/Ρ\u0314/g,'Ῥ')
	.replace(
`μείλιχον ἐξ ἀρχῆς, ἀγανώτατον ἐντὸς Ὀλύμπου,--408
ἤπιον ἀνθρώποισι καὶ ἀθανάτοισι θεοῖσιν.--407`,
`ἤπιον ἀνθρώποισι καὶ ἀθανάτοισι θεοῖσιν.--407
μείλιχον ἐξ ἀρχῆς, ἀγανώτατον ἐντὸς Ὀλύμπου,--408`)
	.replace(
`καὶ γέρας ἐν γαίῃ τε καὶ οὐρανῷ ἠδὲ θαλάσσῃ·--427
οὐδ᾽, ὅτι μουνογενής, ἧσσον θεὰ ἔμμορε τιμῆς,--426`,
`οὐδ᾽, ὅτι μουνογενής, ἧσσον θεὰ ἔμμορε τιμῆς,--426
καὶ γέρας ἐν γαίῃ τε καὶ οὐρανῷ ἠδὲ θαλάσσῃ·--427`)
	.replace(
`ἔν τε δίκῃ βασιλεῦσι παρ᾽ αἰδοίοισι καθίζει,--434
ἔν τ᾽ ἀγορῇ λαοῖσι μεταπρέπει, ὅν κ᾽ ἐθέλῃσιν·--430
ἠδ᾽ ὁπότ᾽ ἐς πόλεμον φθεισήνορα θωρήσσωνται
ἀνέρες, ἔνθα θεὰ παραγίγνεται, οἷς κ᾽ ἐθέλῃσι
νίκην προφρονέως ὀπάσαι καὶ κῦδος ὀρέξαι.--433`,
`ἔν τ᾽ ἀγορῇ λαοῖσι μεταπρέπει, ὅν κ᾽ ἐθέλῃσιν·--430
ἠδ᾽ ὁπότ᾽ ἐς πόλεμον φθεισήνορα θωρήσσωνται
ἀνέρες, ἔνθα θεὰ παραγίγνεται, οἷς κ᾽ ἐθέλῃσι
νίκην προφρονέως ὀπάσαι καὶ κῦδος ὀρέξαι.--433
ἔν τε δίκῃ βασιλεῦσι παρ᾽ αἰδοίοισι καθίζει,--434`)
	.replace(
`ἀντίον ἀλλήλοισι διὰ κρατερὰς ὑσμίνας,--631
Τιτῆνές τε θεοὶ καὶ ὅσοι Κρόνου ἐξεγένοντο·--630`,
`Τιτῆνές τε θεοὶ καὶ ὅσοι Κρόνου ἐξεγένοντο·--630
ἀντίον ἀλλήλοισι διὰ κρατερὰς ὑσμίνας,--631`)
,check=a=>a.split('\n').filter(a=>a!='')
	.filter((a,i)=>i%5==4).filter(a=>!a.includes('--'))
	.forEach(p)
,work=a=>(a=m(a),check(a.slice(20)),a)
,toTranslator=a=>a.replaceAll('\n\n','\n')
	.replaceAll('--','\n---').replaceAll('\n','\n\n')
/*260610全选文本复制<http://users.uoa.gr/~nektar/history/tributes/ancient_authors/Hesiodus/Theogonia.htm>
*/
,uoa=a=>a
	.replace('\nἩσίοδος - Θεογονία\n\t','Ἡσίοδος - Θεογονία\n\n')
	.replace(' (*)','')
	.split('\nΒάσει τῶν:')[0]
	.replace('\n\nἐ καί','καί')
	.replaceAll('\t\n\n','\t')//如l66 p导致行号多空行
	.split('\n')
	.map((a=>a.split('\t').reverse().join('--').trimEnd()))
	.join('\n')
	.replace(
`Γείνατο δ᾽ Ἀστερίην ἐυώνυμον, ἥν ποτε Πέρσης
μείλιχον ἐξ ἀρχῆς, ἀγανώτατον ἐντὸς Ὀλύμπου,--408`,
`μείλιχον ἐξ ἀρχῆς, ἀγανώτατον ἐντὸς Ὀλύμπου,--408
Γείνατο δ᾽ Ἀστερίην ἐυώνυμον, ἥν ποτε Πέρσης`)
	.replace('\nἀ\n','\n')//l439
	.replace(
'ντίον ἀλλήλοισι διὰ κρατερὰς ὑσμίνας, 631',
'ἀντίον ἀλλήλοισι διὰ κρατερὰς ὑσμίνας,--631')
,perseus=a=>a
	.split('\n').map(a=>isNaN(a)?a:'').join('\n')
	.replaceAll('ʼ','᾽')//GREEK KORONIS
	.replaceAll('.','·')//GREEK ANO TELEIA
	.replaceAll('·','·')//GREEK ANO TELEIA
,ntua=a=>a.split('Θεογονία\n\n')[1]
	.split('\n').map((a,i)=>i%5==4
		// ?(a=a.split(' '),a.join('!'))
		?(a=a.split(' '),a.slice(0,-1).join(' ')+'--'+a.at(-1))
		:a)
	.join('\n')
,listWords=(a
	,sg=new Intl.Segmenter("grc", { granularity: "word" })
)=>(
	sg.segment('a')
	,[]
	)
,dict=a=>listWords(a).join('\n')
// ,listWords=a=>(a=a.slice(20)
// 	.split('\n').map(a=>a.split('--')[0])
// 	.join('\n')
// 	.replaceAll('\n',' ')
// 	.split(' ')
// 	,[...new Set(a)])
// ,dict=a=>listWords(a).join('\n')
import{readFile as rd,writeFile as wt}from'fs/promises'
import{join as jn,extname as xn}from'path'
const
mod=async(f,t,m)=>{
	let a=await rd(f,'utf8')
	a=await m(a)
	await wt(t,a)
}
await mod(jn(d,f),'希腊语.txt',work)
await mod('希腊语.txt','toTranslator.txt',toTranslator)
// await mod('uoa-gr-nektar.txt','.tmp/t.txt',uoa)
// await mod('perseus.txt','.tmp/t.txt',perseus)
// await mod('ntua.txt','.tmp/t.txt',ntua)
await mod('希腊语.txt','.tmp/t.txt',dict)