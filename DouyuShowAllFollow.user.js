// ==UserScript==
// @name         DouyuShowAllFollow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  显示所有关注的斗鱼主播列表，默认是只显示5个
// @author       BQsummer
// @match        https://www.douyu.com/*
// @exclude      https://www.douyu.com/room/my_follow
// @grant        none
// @require      //cdn.bootcss.com/jquery/3.1.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    //div.o-follow  ul.f-list
    $("div.o-follow").mouseenter(function(){
        //$("ul.f-list").mouseover(function(){
        $.ajax({
            type: "GET",
            url: "https://www.douyu.com/room/my_follow",
            success: function(data){
                //讲获取到的已关注主播信息添加到document中
                var body_reg = /<div id="live-list-content"[^>]*>([\s\S]*)<\/div>/;
                var result = body_reg.exec(data)[1];
                $("body").append("<div id='ajaxCon' class='mySel' style='display: none;'>" + result+ "</div>");
                //删除原主播列表
                $("ul.f-list").children().remove();
                //填充主播列表
                if(!$("div.o-follow").hasClass("bq-change")) {
                    $("div.o-follow").addClass("bq-change");
                    var $titles = $("li[data-is-on='1']");
                    var title;
                    var href;
                    var player;
                    var num;
                    $titles.each(function(index) {
                        //console.log(index + ": " + $(this).children("a").children("div").children("div").children("h3").attr("title"));
                        //console.log(index + ": " + $(this).attr("data-rid"));
                        //console.log(index + ": " + $(this).children("a").children("div").children("p").children("span[class~='dy-name']").text());
                        //console.log(index + ": " + $(this).children("a").children("div").children("p").children("span[class~='dy-num']").text());
                        title = $(this).children("a").children("div").children("div").children("h3").attr("title");
                        href = "/" + $(this).attr("data-rid");
                        player =  $(this).children("a").children("div").children("p").children("span[class~='dy-name']").text();
                        num = $(this).children("a").children("div").children("p").children("span[class~='dy-num']").text();
                        $("ul.f-list").append("<li><p><a href='" + href + "' target='_blank'>" + title + "</a></p><span><a href='" + href + "' class='head-ico1'>已播　　分钟</a><a href='" + href + "' class='head-ico2'>" + player + "</a><a href='" + href + "' class='head-ico3'>" + num + "</a></span></li>");
                    });
                    $("div.f-pop").css({'height' : '375px', 'width' : '365', 'overflow-y' :'auto'});
                }
            }
        });
    });
    $("div.f-pop").mouseleave(function(){
        //删除body后添加的主播信息
        $(".mySel").remove();
        $('div[style="display: none; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; cursor: move; opacity: 0; background: rgb(255, 255, 255);"]').remove();
        //移除bq-change
        $("div.o-follow").removeClass("bq-change");
    });
})();
