let window = $floaty.rawWindow(
  <frame id="root" bg="#80ff0038" w="400dp" h="400dp">
    <text
      text="安卓12以上实现悬浮窗穿透效果"
      gravity="center"
      textColor="#ffffff"
      textSize="24sp"
    />
  </frame>
);
window.setPosition(0, 500); // 将alpha设置为最大遮挡不透明度
window.root.getRootView().getLayoutParams().alpha = 0.8;
window.setTouchable(false);
setInterval(() => {}, 1000);