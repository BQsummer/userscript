// ==UserScript==
// @name         chinasoftWorkingHoursCalculator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  中软国际工时计算器
// @author       BQsummer
// @match        http://kq.chinasoftosg.com/workAttendance/loginAction
// @grant        none
// @require      //cdn.bootcss.com/jquery/3.1.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    $(".l-topmenu-logo").click(function(){
        console.log("refresh click");
        var iframe = document.getElementById("97").contentWindow.document;
        function enEdit() {
            if($(iframe).find("#resultText"). length <= 0) {
                $(iframe).find("#maingrid\\|hcell\\|c109").after("<td id='resultText'>result</td>");
            }
            $(iframe).find(".l-grid-row-cell-inner").each(function() {
                $(this).click(function(){
                    edit(this, $(this).html());
                });
            });
            $(iframe).find(".l-grid-row-cell-inner").each(function(){
                $(this).mouseleave(function() {
                    removeEdit(this);
                });
            });
        }
        function calculate() {
            var currentMonth =getTdValue(0,4).split("-")[1];
            var lastLine;
            var total = Number(0);
            var sum = Number(0);
            $(iframe).find(".calc").each(function() {
                $(this).remove();
            });
            for(var i = 0; i < 23; i++) {
                if(getTdValue(i, 4).split("-")[1] == currentMonth) {
                    var endTime = convertTime(getTdValue(i, 6));
                    var difference = endTime - convertTime(getTdValue(i, 5))- 9.5;
                    if(endTime >= 17.5) {
                        if(endTime < 18) {
                            difference = difference - (endTime -17.5);
                        } else {
                            difference = difference - 0.5;
                        }
                    } else {
                        difference += 24;
                    }
                    sum = sum + 8 + difference;
                    total += difference;
                    $(iframe).find(".l-grid-body-table:last").children("tbody:first").children("tr").eq(i).children('td').eq(6).after("<div class='calc'>" + (difference+"").substr(0,8) + "<div>");
                    lastLine = i;
                }
            }
            console.log("total time: " + sum);
            $(iframe).find(".l-grid-body-table:last").children("tbody:first").children("tr").eq(lastLine + 1).children('td').eq(6).after("<td class='calc'>total: " + (total + "").substr(0,8) + "</td>");
        }
        function getTdValue(tr, td) {
            var iframe = document.getElementById("97").contentWindow.document;
            $tdValue = $(iframe).find(".l-grid-body-table:last").children("tbody:first").children("tr").eq(tr).children('td').eq(td).children("div:first");
            if($tdValue.children("input").length > 0) {
                $value = $tdValue.children("input:first").val();
            } else {
                $value = $tdValue.html();
            }
            return $value;
        }
        function convertTime(ori) {
            return Number(ori.split(":")[0]) + Number((ori.split(":")[1]/60));
        }
        function edit(obj, context) {
            if(context.indexOf("input") > 0) {
                return;
            }
            $(obj).html("<input type='text' value=" + context + " />");
        }
        function removeEdit() {}
        enEdit();
        calculate();
    });
})();