// ==UserScript==
// @name         知乎去强制下载app
// @namespace    https://greasyfork.org/zh-CN/users/329780-zs6
// @version      1.9
// @description  知乎去强制下载app,评论关闭按钮优化单手操作
// @author       zs6
// @license      GPL-3.0-only
// @match        https://www.zhihu.com/*
// @grant GM_addStyle
// @run-at document-start
// @downloadURL https://update.greasyfork.org/scripts/389371/%E7%9F%A5%E4%B9%8E%E5%8E%BB%E5%BC%BA%E5%88%B6%E4%B8%8B%E8%BD%BDapp.user.js
// @updateURL https://update.greasyfork.org/scripts/389371/%E7%9F%A5%E4%B9%8E%E5%8E%BB%E5%BC%BA%E5%88%B6%E4%B8%8B%E8%BD%BDapp.meta.js
// ==/UserScript==

(function() {
    'use strict';
    function setUserAgent(window, userAgent) {
        if (window.navigator.userAgent != userAgent) {
            var userAgentProp = { get: function () { return userAgent; } };
            try {
                Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
            } catch (e) {
                window.navigator = Object.create(navigator, {
                    userAgent: userAgentProp
                });
            }
        }
    }
    setUserAgent(window, 'Mozilla/5.0 (Windows Phone 10)');
    GM_addStyle(".css-1cqr2ue{width:auto!important;} .css-1x9te0t{position: relative!important;padding: 0px!important;} .Menu-item{padding:0px!important;width: 10%!important;}.ContentItem-action{margin-left:8px!important;}");
})();