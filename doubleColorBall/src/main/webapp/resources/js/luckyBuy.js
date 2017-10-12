!function(e, i, n, t, a) {
    var r = t.regBaseCom2Lib("ssq.luckyBuy", "onChange", {
        config: {
            wrap: "",
            currentPeriod: "",
            tabWrap: ".luckbuy_nav",
            numSelector: ".zhushu dd a"
        },
        init: function(e) {
            var n = t.getType(e)
              , a = this;
            switch (n) {
            case "string":
            case "element":
                this.config = i.extend({}, this.config, {
                    wrap: e
                });
                break;
            case "object":
                if (e.jquery) {
                    this.config = i.extend({}, this.config, {
                        wrap: e
                    });
                    break
                }
                this.config = i.extend({}, this.config, e || {});
                break;
            default:
                return
            }
            var r = i(this.config.wrap);
            t.loadMolude("ssq.clientRandom");
            if (r[0]) {
                this.cache = {
                    wrap: r
                };
                __initCtrl.call(this, r)
            }
        },
        getData: function() {
            var e = this.getKey(true);
            if (e.key)
                e.data = this.getDataCore(this.config.currentPeriod, e.key, e.num);
            else
                e.data = [];
            return e
        },
        setPeriod: function(e) {
            if (e)
                this.config.currentPeriod = e;
            return this
        },
        getKey: function(e) {
            if (!this.cache) {
                alert("无用户界面，无法获取数据，请访问getDataCore接口。");
                return {}
            }
            if (!this.config.currentPeriod) {
                alert("请先设定期次信息！");
                return {}
            }
            var n = this.cache.wrap, t = n.find(this.config.tabWrap).find(".active").attr("rel").substr(1), a = i("#" + t), r, l = {
                key: null,
                num: ""
            }, c = a.find(this.config.numSelector).filter(".active").html();
            switch (t) {
            case "luckyShengxiao":
            case "luckyXingzuo":
                r = a.find(".buyList .active");
                if (r[0])
                    l.key = "li" + r.parent()[0].className;
                else
                    l.err = "luckyXingzuo" == t ? "您还没有选择星座，请选择星座后再获取幸运号码。" : "您还没有选择生肖，请选择生肖后再获取幸运号码。";
                if (e) {
                    r.removeClass("active");
                    this.callEvent(100, "onChange", "src")
                }
                break;
            case "luckyShengri":
                l.key = "brithday" + a.find("[name=year]").val() + a.find("[name=month]").val() + a.find("[name=day]").val();
                break;
            case "luckyXingming":
                r = a.find("[name=yourName]").val().trim();
                if (r)
                    l.key = "yourName" + r;
                else
                    l.err = "姓名不能为空，请输入姓名后再获取幸运号码。";
                break;
            case "luckyQinglv":
                r = {
                    girl: a.find("[name=girlName]").val().trim(),
                    boy: a.find("[name=boyName]").val().trim()
                };
                if (r.girl && r.boy)
                    l.key = "lover" + r.girl + "love" + r.boy;
                else
                    l.err = !r.girl && !r.boy ? "姓名不能为空，请输入姓名后再获取幸运号码。" : !r.girl ? "女生姓名不能为空，请输入女生姓名后再获取幸运号码。" : "男生姓名不能为空，请输入男生姓名后再获取幸运号码。";
                break;
            case "luckyShoujihao":
                r = a.find("[name=phone]").val().trim();
                if (r)
                    if (/^(?:13|14|15|18)\d{9}$/.test(r))
                        l.key = "phone" + r;
                    else
                        l.err = "您输入的号码格式有误，请输入正确的手机号码。";
                else
                    l.err = "手机号码不能为空，请输入手机号码后再获取幸运号码。"
            }
            l.num = +(c || 5);
            return l
        },
        getDataCore: function(n, t, a) {
            if (!t)
                return [];
            var r = "MC_" + t, c = e.LS.get("ssqLuckyData") || "", o = {
                period: n || this.config.currentPeriod,
                data: {}
            }, s, u = a || 1;
            if (c)
                o = e.JSON.parse(c);
            if (o.period !== n)
                o = {
                    period: n,
                    data: {}
                };
            s = o.data[r] || [];
            if (s.length < u) {
                s = s.concat(l(a - s.length));
                o.data[r] = s;
                e.LS.set("ssqLuckyData", e.JSON.stringify(o))
            }
            s = s.slice(0, u);
            i.each(s, function(e, i) {
                i.random = 1;
                i.type = "lucky"
            });
            return s
        }
    });
    var l = function(e) {
        if (t.ssq.clientRandom)
            return t.ssq.clientRandom(e);
        else {
            var i = [], n, a;
            for (a = 0; a < e; a++) {
                n = [t.random("1-33", 6), t.random("1-16", 1)];
                n.random = 1;
                i[a] = n
            }
            return i
        }
    };
    __initCtrl = function(e) {
        var a = this;
        e.find(this.config.tabWrap).bindTab(function() {
            a.callEvent(100, "onChange", "tab")
        });
        e.delegate(this.config.numSelector, "click focus", function() {
            var e = i(this);
            e.siblings(".active").removeClass("active");
            e.addClass("active");
            a.callEvent(100, "onChange", "num")
        });
        i("#luckyShengxiao,#luckyXingzuo").delegate("li a", "click focus", function() {
            var e = i(this);
            e.closest("ul").find(".active").removeClass("active");
            e.addClass("active");
            a.callEvent(100, "onChange", "src")
        });
        n.loadCdnJS("js2/jselect.js", function() {
            return !!i.fn.jSelect && !!i.fn.bindLiveCheck
        }, function() {
            var e = n.serverTime()
              , a = i("#luckyShengri")
              , r = e.getFullYear() + 1
              , l = r - 93;
            a.find(".mcSelectBox").jSelect(function(e) {
                if (!i(e.wrap).hasClass("day"))
                    _updateDayList(s, c.val(), o.val())
            });
            a.find(".mcSelectBox input").mouseenter(function() {
                this.select()
            });
            var c = i("#luckyShengri").find("[name=year]").val("1980").blur(function() {
                var e = +(this.value || 1980);
                e = e < l || e > r ? 1980 : e;
                this.value = e;
                _updateDayList(s, e, o.val())
            })
              , o = i("#luckyShengri").find("[name=month]").val("08").blur(function() {
                var e = this.value || 8;
                e = e > 12 ? 8 : e;
                this.value = t.fillZero(e);
                _updateDayList(s, c.val(), e)
            })
              , s = i("#luckyShengri").find("[name=day]").val("08").blur(function() {
                var e = c.val()
                  , i = o.val()
                  , n = this.value || 8
                  , a = _getMaxDay(e, +i - 1);
                n = n > a ? 8 : n;
                this.value = t.fillZero(n)
            });
            _initYearList(c, l, r);
            _initMonthList(o, 1, 12);
            _updateDayList(s, 1980, 8)
        });
        n.loadCdnJS("js2/liveCheck.js", function() {
            return !!i.fn.bindLiveCheck
        }, function() {
            i("#luckyShengri .mcSelectBox input").bindNumberLiveCheck();
            i("#luckyShoujihao input").bindNumberLiveCheck().keyup(function() {
                a.callEvent(100, "onChange", "phone")
            }).val("")
        });
        i("#luckyXingming input,#luckyQinglv input").keyup(function() {
            a.callEvent(100, "onChange", "name")
        }).val("")
    }
    ,
    _daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    _getMaxDay = function(e, i) {
        return 1 == i ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? 29 : 28 : _daysInMonth[i]
    }
    ,
    _initYearList = function(e, i, n) {
        var t = []
          , a = +n
          , r = +i;
        for (; a >= r; a--)
            t.push('<a href="#' + a + '">' + a + "</a>");
        e.closest(".mcSelectBox").find(".optionList").html(t.join(""))
    }
    ,
    _initMonthList = function(e) {
        var i = []
          , n = 1
          , a = 12;
        for (; n <= a; n++)
            i.push('<a href="#' + t.fillZero(n) + '">' + t.fillZero(n) + "</a>");
        e.closest(".mcSelectBox").find(".optionList").html(i.join(""))
    }
    ,
    _updateDayList = function(e, n, a) {
        var r = []
          , l = 1
          , c = _getMaxDay(+n, +a - 1);
        for (; l <= c; l++)
            r.push('<a href="#' + t.fillZero(l) + '">' + t.fillZero(l) + "</a>");
        e.closest(".mcSelectBox").find(".optionList").html(r.join(""));
        var o = i("#luckyShengri").find("[name=day]")
          , s = +(o.val() || 99);
        s > c && o.val(c)
    }
}(window, jQuery, Core, Game);
