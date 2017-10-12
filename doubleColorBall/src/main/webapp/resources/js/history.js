!function(t, s) {
    "use strict";
    var a = function(s, a) {
        t.dialog(t.extend({
            title: "提示",
            css: "betDialog history_dialog",
            button: ["*确定"],
            content: "",
            dragable: 1,
            animate: 0
        }, s), a || t.noop)
    };
    function i(a, i, n, e) {
        n = n || t.noop;
        s.post(a, i, n, e)
    }
    function n(t) {
        a({
            content: '<div class="history_alert"><em class="ico_gantan"></em><span>' + t + "</span></div>",
            width: 430,
            height: 245
        })
    }
    function e(s, a, i, n, e) {
        this.$el = t(s);
        this.gameEn = a;
        this.gameCn = i;
        this.getDataFun = n;
        this.randomFun = e;
        this.$el.bind("click", t.proxy(this.open, this));
        return this
    }
    t.extend(e.prototype, {
        open: function() {
            var t = this;
            this.stakeNumber = this.getDataFun();
            if (!this.stakeNumber.length)
                a({
                    button: ["*机选一注", "返回选号"],
                    content: '<div class="history_alert"><em class="ico_gantan"></em><span>号码篮至少有一注号码才能验证。</span></div>',
                    width: 430,
                    height: 245
                }, function(s) {
                    if (1 === s)
                        t.randomFun()
                });
            else
                this.getWinningRecordsStatistics()
        },
        getWinningRecordsStatistics: function(s) {
            var a = this;
            i("/calcHistory/winningRecordsStatistics.html", {
                stakeNumber: this.stakeNumber,
                gameEn: this.gameEn,
                periods: s || 0
            }, function(s, i) {
                var e, o, l, c, r = '<dd><span class="co1">{levelName}</span><span class="co2">{awardNum}</span><span class="co3">{lastTime}</span><span class="co4">{awardNo}</span><span class="co5">{detail}</span></dd><dd class="history_level_detail js_level_{levelId} hide"></dd>';
                try {
                    o = JSON.parse(i)
                } catch (d) {}
                if (!o || !t.isArray(o.data)) {
                    o = parseInt(o, 10);
                    var p = "";
                    switch (o) {
                    case -2:
                        p = "选号过多，无法统计中奖历史。";
                        break;
                    default:
                        p = "服务器有点忙，稍候再试吧。"
                    }
                    n(p);
                    return
                }
                e = o.data;
                c = o.currentPeriod;
                l = t.map(e, function(s) {
                    var a = s.awardNo
                      , i = a.split(":");
                    return t.format(r, t.extend({}, s, 0 == s.awardNum ? {
                        detail: "--",
                        lastTime: "--",
                        awardNo: "--"
                    } : {
                        detail: '<a href="javascript:;" data-award-num="' + s.awardNum + '" data-level="' + s.levelId + '">明细<i></i></a>',
                        awardNo: '<em class="c_ba2636">' + i[0] + "</em>" + '<em class="c_1e50a2">:' + i[1] + "</em>"
                    }))
                }).join("");
                if (l) {
                    var h;
                    if (0 == e[0].awardNum && 0 == e[1].awardNum)
                        h = "截至" + c + "期，该组号码历史上没有中出过一等奖或二等奖，可以放心投注";
                    else
                        h = "截至" + c + "期，该组号码中过一等奖" + e[0].awardNum + "次、二等奖" + e[1].awardNum + "次，投注请注意";
                    l = '<dt><span class="co1">奖级</span><span class="co2">中奖次数</span><span class="co3">最新中奖</span><span class="co4">当期号码</span><span class="co5">查看</span></dt>' + l + "</dl>";
                    if (!a.$statisticsDialog)
                        a.openWinningRecordsStatisticsDialog(function() {
                            var t = a.$statisticsDialog.find(".history_table");
                            t.html(l).end().find(".history_tip p").html(h);
                            t.height(t.height())
                        });
                    else {
                        var u = a.$statisticsDialog.find(".history_table");
                        u.html(l).end().find(".history_tip p").html(h);
                        u.height(u.height())
                    }
                }
            }, "main")
        },
        openWinningRecordsStatisticsDialog: function(s) {
            var i = this;
            a({
                title: "该组号码与" + this.gameCn + '<select class="history_periods_select"><option value="0">全部期次</option><option value="30">最近30期</option><option value="100">最近100期</option><option value="500">最近500期</option></select>开奖号对比如下',
                width: 550,
                height: 0,
                button: [],
                content: '<dl class="history_table"></dl>' + '<div class="history_tip"><p></p><a href="javascript:;" rel="1" class="iDialogBtn focusBtn"><span>确定</span></a></div>',
                init: function() {
                    i.$statisticsDialog = t(this);
                    i.initEvent();
                    s && s()
                },
                check: function() {
                    i.$statisticsDialog = null
                }
            }, function() {
                i.$statisticsDialog = null
            })
        },
        initEvent: function() {
            var s = this
              , a = this.$statisticsDialog.find(".history_periods_select");
            a.change(function() {
                s.getWinningRecordsStatistics(t(this).val())
            });
            this.$statisticsDialog.delegate("a[data-level]", "click", function() {
                var e = t(this)
                  , o = e.parents(".history_table")
                  , l = e.parents("dd")
                  , c = e.attr("data-level")
                  , r = s.$statisticsDialog.find(".js_level_" + c)
                  , d = +e.attr("data-award-num");
                if (l.is(".history_open_row")) {
                    l.removeClass("history_open_row");
                    r.hide()
                } else
                    i("/calcHistory/winningRecordsDetail.html", {
                        stakeNumber: s.stakeNumber,
                        gameEn: s.gameEn,
                        levelId: c,
                        periods: a.val()
                    }, function(a, i) {
                        var e, c;
                        try {
                            e = JSON.parse(i)
                        } catch (p) {}
                        if (!t.isArray(e)) {
                            e = parseInt(e, 10);
                            var h = "";
                            switch (e) {
                            default:
                                h = "服务器有点忙，稍候再试吧。"
                            }
                            n(h);
                            return
                        }
                        c = t.map(e, function(s, a) {
                            var i = s.concat([a % 2 === 0 ? "" : "history_even_row"])
                              , n = i[2].split(":");
                            i[2] = '<em class="c_ba2636">' + n[0] + "</em>" + '<em class="c_1e50a2">:' + n[1] + "</em>";
                            return t.format('<dd class="{3}"><span class="co1">{0}</span><span class="co2">{1}</span><span class="co3">{2}</span></dd>', i)
                        }).join("");
                        if (c) {
                            c = "<div>" + c + "</div>";
                            if (d > 10)
                                c += '<dd class="history_detail_tip">*共中奖' + d + "次，以上为近10次中奖明细</dd>";
                            c = '<dl><dt><span class="co1">期次</span><span class="co2">开奖日</span><span class="co3">开奖号码</span></dd></dt>' + c + "</dl>";
                            s.$statisticsDialog.find(".history_open_row").removeClass("history_open_row").end().find(".history_level_detail:visible").hide();
                            l.addClass("history_open_row");
                            r.html(c).show();
                            o.scrollTop(l.offset().top + o.scrollTop() - o.offset().top)
                        }
                    }, "detail")
            })
        }
    });
    s.CompareHistory = e
}(window.jQuery, window.Core);
