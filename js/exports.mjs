import{random,ranged}from'./random.mjs'
import*as date from'./date.mjs'

import{shorts}from'./error stack.mjs'
const l=console.debug
,p=(...a)=>(l(shorts(Error().stack),...a),a[1]?a:a[0])

import{compareByPinyin}from'./Chinese-text/sort.mjs'

Object.assign(global,{p,random,ranged,...date
	,compareByPinyin})