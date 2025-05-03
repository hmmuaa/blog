///成功 已整理合并在broadcast.mjs
// 定义一个回调函数，用于屏幕旋转后执行
function onScreenRotate(newOrientation) {
	toastLog('屏幕已旋转，新方向：' + newOrientation)
	// 在这里添加你需要在屏幕旋转后执行的代码
}

// 获取当前的Configuration
let lastOrientation = context.getResources().getConfiguration().orientation

// 注册一个广播接收器来监听Configuration变化
const BroadcastReceiver1 = android.content.BroadcastReceiver
const IntentFilter = android.content.IntentFilter

const receiver = new BroadcastReceiver1({
	onReceive: function (context, intent) {
		// 获取当前的屏幕方向
		let currentOrientation = context
			.getResources()
			.getConfiguration().orientation
		if (currentOrientation !== lastOrientation) {
			// 屏幕方向发生变化
			let orientationName =
				currentOrientation ===
				android.content.res.Configuration.ORIENTATION_LANDSCAPE
					? '横屏'
					: '竖屏'
			onScreenRotate(orientationName)
			lastOrientation = currentOrientation
		}
	}
})

// 注册广播接收器
const configChangeFilter = new IntentFilter(
	android.content.Intent.ACTION_CONFIGURATION_CHANGED
) // 修正为 ACTION_CONFIGURATION_CHANGED
context.registerReceiver(receiver, configChangeFilter)

// 在脚本结束时取消注册广播接收器
events.on('exit', function () {
	context.unregisterReceiver(receiver)
})
setInterval(() => {}, 6666)
console.show()
