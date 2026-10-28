import'#g'
const{}={}
,_curves/*bezier curves*/=(cp,t,_
	,cx=3.0*(cp[1].x-cp[0].x)
	,bx=3.0*(cp[2].x-cp[1].x)-cx
	,ax=cp[3].x-cp[0].x-cx-bx
	,cy=3.0*(cp[1].y-cp[0].y)
	,by=3.0*(cp[2].y-cp[1].y)-cy
	,ay=cp[3].y-cp[0].y-cy-by
	,sq/*uared*/=t*t,cub/*ed*/=sq*t
	)=>({x:ax*cub+bx*sq+cx*t+cp[0].x
	,y:ay*cub+by*sq+cy*t+cp[0].y})
,t=(x,y)=>({x,y})
// ,f=(x,y,x2,y2,x3,y3,x4,y4,steps)=>
// 	[{x:x,y:y}].concat(
// 		array(steps-1,i=>curves([t(x,y),t(x2,y2),t(x3,y3),t(x4,y4)],1/steps*++i)))
export const{}={}
,curves=(x,y,x2,y2,x3,y3,x4,y4,steps,__,m1=steps-1)=>
	[{x:x,y:y}].concat(
		array(m1,i=>_curves([t(x,y),t(x2,y2),t(x3,y3),t(x4,y4)],1/m1*++i)))
let{}={}
,f=curves
,a=[0,0 ,1,-1 ,2,1 ,3,0]
eq(f(...a,4),[{x:0,y:0},{x:1,y:-0.2222222222222222},{x:2,y:0.22222222222222232},{x:3,y:0}])
eq(f(...a,5),[{x:0,y:0},{x:0.75,y:-0.28125},{x:1.5,y:0},{x:2.25,y:0.28125},{x:3,y:0}])
//https://share.google/aimode/I4E4oBcx4HVwBuvCl