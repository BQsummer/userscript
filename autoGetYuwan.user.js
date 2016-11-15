// ==UserScript==
// @name         autoGetYuwan
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动领取鱼丸
// @author       BQsummer
// @match        https://www.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var date;
    var hour;
    var min;
    var sec;
    var thread1;
    var thread2;
    function search(interval) {
        console.log("function search:");
        if(thread2 !== undefined) {
            window.clearInterval(thread2);
            console.log("clear thread2");
        }
        var whethersearch  = window.setInterval(function() {
            date = new Date();
            hour = date.getHours();
            min = date.getMinutes();
            sec = date.getSeconds();
            console.log("检测是否有鱼丸" + "  " + hour + ":" + min + ":" + sec);
            var dom2 = document.getElementById("right_col_peck");
            if(dom2.style.display == "block") {
                thread2 = douyuClick();
            }
        }, interval);
        return whethersearch;
    }

    function douyuClick() {
        console.log("function douyuClick:");
        if(thread1 !== undefined) {
            window.clearInterval(thread1);
            console.log("clear thread1");
        }
        var whetherStop = 1;
        var time = 0;
        var dom1 = document.getElementsByClassName("peck-cdn");
        var dom2 = document.getElementById("right_col_peck");
        var thread = window.setInterval(function() {
            dom1[0].click();
            if(dom2.style.display == "none") {
                thread1 = search();
            }
        }, 500);
        return thread;
    }

    thread1 = search(10000);


})();