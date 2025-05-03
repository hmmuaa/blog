/*已整理合并在broadcast.mjs
源自牙叔教程 这可能是个pro8的 9需要调整
error:Can't find method android.content.ContextWrapper.registerReceiver(adapter1,function).
*/
let receiver = new JavaAdapter(android.content.BroadcastReceiver, {
	onReceive: function (context, intent) {
		log(intent)
		switch (intent.action) {
			case Intent.ACTION_BATTERY_CHANGED:
				log('ACTION_BATTERY_CHANGED')
				let level = intent.getIntExtra('level', 0)
				toastLog('当前电量:' + level + '%')
				break
			case 'android.intent.action.yashu':
				toastLog('牙叔自定义广播')
				let value = intent.getStringExtra('author')
				log('接收到数据 author: ' + value)
				break
		}
	}
})
///注册广播
context.registerReceiver(receiver, filter)
///发送广播
app.sendBroadcast({
	action: action,
	extras: {
		author: 'yashu'
	}
})
///取消广播监听
function unregisterReceiver() {
	if (flag) {
		receiver && context.unregisterReceiver(receiver)
		flag = false
		toastLog('关闭广播')
	}
}
