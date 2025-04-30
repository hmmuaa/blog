import'#lab'
import acc,{select as _select}from'accessibility'
import{device}from'device'
	const{widthPixels:w,heightPixels:h}=device.displayMetrics
	p(w)
	const swipe=(x1,y1,x2,y2,d=2)=>
		acc.swipe(x1*w,y1*h,x2*w,y2*h,d*1e3)
	await swipe(.5,.8,.5,.9)//,await swipe(.5,.9,.5,.8,.1)