// ==UserScript==
// @name         autoGetYuwan
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动领取鱼丸
// @author       BQsummer
// @match        https://www.douyu.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    var thread1;
    var thread2;
    var dom1;
    var dom2;
    var interval = 150000;
    function search(interval) {
        dom1 = document.getElementsByClassName("peck-cdn");
        dom2 = document.getElementById("right_col_peck");
        console.log("function search:");
        if(thread2 !== undefined) {
            window.clearInterval(thread2);
            console.log("clear thread2");
        }
        var whethersearch  = window.setInterval(function() {
            console.log("检测是否有鱼丸");
            dom2 = document.getElementById("right_col_peck");
            if(!(dom2 === null || dom2 === undefined)) {
                if(!(dom2.style === undefined || dom2.style === null)) {
                    if(dom2.style.display == "block") {
                        thread2 = douyuClick();
                    }
                }
            }
        }, interval);
        return whethersearch;
    }

    function douyuClick() {
        dom1 = document.getElementsByClassName("peck-cdn");
        dom2 = document.getElementById("right_col_peck");
        console.log("function douyuClick:");
        if(thread1 !== undefined) {
            window.clearInterval(thread1);
            console.log("clear thread1");
        }
        var thread = window.setInterval(function() {
            dom1[0].click();
            if(dom2.style.display == "none") {
                thread1 = search(interval);
            }
        }, 500);
        return thread;
    }

    thread1 = search(interval);


})();