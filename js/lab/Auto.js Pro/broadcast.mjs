import'./glob.mjs'
import{setTimeout}from'timers/promises'
import{sendBroadcast as send,
	registerBroadcastReceiver as reg,
	unregisterBroadcastReceiver as unreg}from'app'
	
(await import('rhino')).install()
const{res,Intent,IntentFilter/*,BroadcastReceiver*/}=android.content

const drain=reg(new IntentFilter(Intent.ACTION_BATTERY_CHANGED)),
	decharge=reg(new IntentFilter(Intent.ACTION_POWER_DISCONNECTED))
decharge.on('receive',_=>p('电线拔出'))
drain.on('receive',n=>t`当前电量${n.getIntExtra('level',0)}%`)

const ctx=$autojs.androidContext,
	gOrn=_=>ctx.getResources().getConfiguration().orientation,
	config=reg(new IntentFilter(Intent.ACTION_CONFIGURATION_CHANGED))
config.on('receive',_=>p(gOrn()==res.Configuration.ORIENTATION_LANDSCAPE?'横屏':'竖屏'))

/*注销注意 在脚本运行中可以正常注销
例如监听屏幕旋转一次就注销 则只会有一次log 第二次不再触发
但按旧版ajs做法在exit事件注销则会抛java.lang.IllegalArgumentException*/
///process.on('exit',()=>unreg(configChangeFilter))

const a=reg(new IntentFilter('aa.test'))
a.on('receive',n=>t`收到${n.getStringExtra('author')}!`)
send({action:'aa.test',extras:{author:'欸欸'}})
setTimeout(1e3).then(_=>
	send({action:'aa.test',extras:{author:'呦呦'}}))