import{isImported,throughErrorStack,throughImportMeta}from'./importation identify.mjs'
var f=a=>console.log(a?'引用':'非引用')
var a=throughErrorStack();f(a)
var a=throughImportMeta(import.meta);f(a)

console.log('是不是引用都会执行')

var f=async()=>console.log('非引用时执行')
var g=async()=>console.log('引用时执行')
isImported()||(async()=>await f())()
export const go=g