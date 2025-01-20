const log=console.log
log`测试……`
console.assert(false)
log`console.assert(false)之后会继续执行`
import assert from'node:assert/strict'
assert(false)
log`node:assert失败则会中断并列出深度比对差异。`
///console.assert失败不会中断，
///node:assert则会中断。（strict和legacy都会）
///传统JS作为纯浏览器脚本，数据到服务端存数据库前会再验证，
///JS准确性不敏感的前提上，
///作为网页特效则忽略错误不中断执行。
///Node.js则本身做服务端，数据保存是基本功能，需要准确：
///Auto.js中作为完整的应用程序，也涉及数据，
///不能按网页特效的标准，因此应当在断言失败时中断。
///不中断的console.assert可考虑应用在没有TDD工具时。