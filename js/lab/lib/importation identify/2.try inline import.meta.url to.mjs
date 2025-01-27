import'#lab'
import * as f from'./2.try inline import.meta.url from.mjs'
const g=a=>a.split('0').slice(-1)[0].split('.')[0]
eq(g(f.aMeta(import.meta)),'to')
eq(g(f.aMetaDefault()),'from')
eq(g(f.aMetaF()),'from')

eq(g(f.aUrl()),'from')
eq(g(f.aTl()),'from')
eq(g(f.aTlr()),'from')

eq(g(f.iMeta()),'from')
eq(g(f.iMeta(import.meta)),'to')
eq(g(f.iTlr()),'from')
///没特例