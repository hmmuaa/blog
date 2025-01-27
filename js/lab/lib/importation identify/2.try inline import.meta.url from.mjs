import'#lab'
export const aMeta=m=>m.url
,aMetaDefault=(m=import.meta)=>m.url
,aMetaF=(m=()=>import.meta)=>m().url

,aUrl=(a=import.meta.url)=>a
,aTl=(a=`${import.meta.url}`)=>a
,aTlr=(a=String.raw`${import.meta.url}`)=>a

,iMeta=function(m=import.meta){return m.url}
,iTlr=function(a=String.raw`${import.meta.url}`){return a}