import'#glob'
import{showToast}from'toast'
import{stopAll}from'engines'
import{packageName,launch}from'app'
const backToAjs=()=>(launch(packageName),stopAll())
,toast=a=>showToast(a,{log:a})
,t=(...a)=>toast('#⃣️ '+String.raw(...a))

//import{recorder2 as recorder}from'./lib/records,fsdb/2.renewing.mjs'

Object.assign(global,{t,_:{backToAjs,/*recorder*/}})
//export default undefined