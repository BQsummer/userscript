// ==UserScript==
// @name         miaobo
// @namespace    bqsummer.com
// @version      0.1
// @description  喵播自动整点打卡
// @author       BQsummer
// @match        https://www.douyu.com/71771
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    window.setInterval(function() { 
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        if((min == 0 && sec == 30) || (min == 0 && sec == 31)) {
            console.log("测试时间" + "  " + hour + ":" + min + ":" + sec);
            console.log(date + "打卡");
            var textareas = document.getElementsByClassName("cs-textarea");
            textareas[0].innerHTML = "*test1";
            var btn = document.getElementsByClassName("b-btn");
            btn[0].click();
        }
    }, 1000);
})();