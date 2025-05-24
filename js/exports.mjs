import'./array.mjs'
import{random,ranged}from'./random.mjs'
import*as date from'./date.mjs'
Object.assign(global,{random,ranged,...date})