!function(e, t, i, n, a) {
    var s = 0
      , l = function(n, a) {
        var l = t.browser
          , r = [];
        for (var c in l)
            if ("version" == c)
                r.push("version=" + l[c]);
            else
                r.push("browser=" + c);
        var h = e.setInterval(function() {
            if (e.neteaseTracker) {
                e.clearInterval(h);
                i.virualViewStat("http://caipiao.163.com/jsError.html?err=" + a + "&" + r.join("&") + "&page=" + encodeURIComponent(document.URL), "脚本com组件错误")
            }
        }, 200);
        if (0 == s)
            e.alert('脚本遇到错误："' + n + '"\n错误信息已经搜集，我们会尽快解决，或者联系客服解决：0571-26201163');
        else
            e.alert("该页面遇到多处脚本错误，请联系我们的客服（0571-26201163），我们会安排技术人员直接为您服务。");
        s++
    };
    var r = n.regBaseCom2Lib("COMS.PT.Timer", "onStart onStop onRunning onPause onResume", {
        config: {
            timeCount: null,
            timeInterval: 0,
            autoSaveKey: ""
        },
        STATUS: {
            inited: 0,
            running: 1,
            paused: 2,
            stoped: 3
        },
        init: function(e) {
            var i = n.getType(e), s;
            switch (i) {
            case "number":
                this.config = t.extend({}, this.config, {
                    timeCount: e
                });
                break;
            case "object":
                this.config = t.extend({}, this.config, e || {});
                break;
            default:
                this.config = t.extend({}, this.config);
                return
            }
            this.status = this.STATUS.inited;
            s = this.config.timeCount;
            if (null !== s && s !== a) {
                this.config.timeCount = +(s || 0);
                this.start()
            }
        },
        start: function(t) {
            var i = this.config;
            if (t)
                i.timeCount = +t;
            var n = i.timeInterval || 500, a, s = this, l = +new Date, r;
            this.timer && e.clearInterval(this.timer);
            this.timer = e.setInterval(a = function() {
                var e = +new Date, t;
                i.timeCount -= e - l;
                l = e;
                if (i.timeCount < 500)
                    s.stop();
                else {
                    t = s.getTimeDescription();
                    if (t.join(",") !== r.join(",")) {
                        r = t;
                        s.callEvent("onRunning", r[0], r[1], r[2], r[3])
                    }
                }
            }
            , Math.max(n, 100));
            r = this.getTimeDescription();
            if (this.status == this.STATUS.inited || this.status == this.STATUS.stoped)
                this.callEvent("onStart", r[0], r[1], r[2], r[3]);
            this.status = this.STATUS.running;
            a()
        },
        stop: function() {
            this.timer && e.clearInterval(this.timer);
            this.status = this.STATUS.stoped;
            this.started = false;
            this.callEvent("onStop")
        },
        getTimeDescription: function() {
            var e = this.config.timeCount
              , t = +e > 0 ? +e : 0
              , i = 6e4
              , n = 60 * i
              , a = 24 * n;
            return [Math.floor(t / a), Math.floor(t % a / n), Math.floor(t % a % n / i), Math.floor(t % a % n % i / 1e3)]
        },
        setAutoSaveKey: function(e) {}
    });
    r.connectTime = e.performance && e.performance.timing ? e.performance.timing.connectStart || new Date : new Date;
    r.getPageRunTime = function() {
        return new Date - r.connectTime
    }
    ;
    var c = n.regBaseCom2Lib("COMS.PT.BetArea", "onChange onBallClick onBallChange onRandom onClear", {
        config: {
            wrap: "",
            redBallSelector: ".redBallBox li a",
            redBallActive: "got",
            redBallHightL: "active",
            blueBallSelector: ".blueBallBox li a",
            blueBallActive: "got",
            blueBallHightL: "active",
            useShortCut: true,
            animate: true
        },
        init: function(e) {
            var i = n.getType(e)
              , a = this;
            switch (i) {
            case "string":
            case "element":
                this.config = t.extend({}, this.config, {
                    wrap: e
                });
                break;
            case "object":
                if (e.jquery) {
                    this.config = t.extend({}, this.config, {
                        wrap: e
                    });
                    break
                }
                this.config = t.extend({}, this.config, e || {});
                break;
            default:
                return
            }
            var s = t(this.config.wrap);
            if (!s[0]) {
                l("投注区容器设置错误，初始化失败！", "area001");
                return
            }
            s.delegate(this.config.redBallSelector, "click contextmenu", function(e) {
                return a.ballClick(this, e, "red")
            }).delegate(this.config.blueBallSelector, "click contextmenu", function(e) {
                return a.ballClick(this, e, "blue")
            });
            this.cache = {
                redBalls: s.find(this.config.redBallSelector),
                blueBalls: s.find(this.config.blueBallSelector),
                redBallLast: null,
                blueBallLast: null
            }
        },
        ballClick: function(e, i, n) {
            var a = t(e), s = this.config[n + "BallActive"], l = this.config[n + "BallHightL"], r = this, c, h = "contextmenu" == i.type, o = "click" == i.type, u = function(e, i) {
                var a = [], c;
                t.each(i, function(e, i) {
                    a[e] = +t(i).text()
                });
                if (false === r.callEvent("onBallClick", n, e, a))
                    c = false;
                if (false === r.callEvent("onBallChange", n, e, a))
                    c = false;
                if (false == c)
                    return false;
                t.each(i, function(i, n) {
                    t(n)[e ? "addClass" : "removeClass"](s + " " + l)
                });
                r.callEvent("onChange", "click")
            };
            if (!r.config.useShortCut)
                c = u(a.hasClass(s) ? 0 : 1, a);
            else if (i.ctrlKey && o)
                c = u(1, a);
            else if (i.altKey && o)
                c = u(0, a);
            else if (i.shiftKey && o || h) {
                var f = this.cache[n + "BallLast"]
                  , d = this.cache[n + "Balls"]
                  , g = f ? d.index(f) : 0
                  , v = d.index(a)
                  , C = f ? f.hasClass(s) ? 1 : 0 : 1
                  , p = []
                  , m = Math.min(g, v)
                  , b = Math.max(g, v);
                if (g == v) {
                    if (o)
                        c = u(a.hasClass(s) ? 0 : 1, a)
                } else {
                    d.each(function(e, t) {
                        if (e >= m && e <= b)
                            p.push(t)
                    });
                    c = u(C, p)
                }
                i.preventDefault()
            } else if (o)
                c = u(a.hasClass(s) ? 0 : 1, a);
            if (false !== c)
                this.cache[n + "BallLast"] = a
        },
        get: function(e, i) {
            if (!e || !{
                red: 1,
                blue: 1
            }[e])
                return [this.get("red", i), this.get("blue", i)];
            var n = this.cache[e + "Balls"]
              , a = this.config[e + "BallActive"]
              , s = [];
            n.each(function(e, n) {
                if (t(n).hasClass(a)) {
                    var l = t(n).text();
                    s.push(i ? l : +l)
                }
            });
            return s
        },
        clear: function(e, t) {
            if (!e || !{
                red: 1,
                blue: 1
            }[e]) {
                this.clear("red", t);
                this.clear("blue", t);
                return this
            }
            var i = this.cache[e + "Balls"], n = this.config[e + "BallActive"], a = this.config[e + "BallHightL"], s = this.get(e), l;
            if (!s.length)
                return this;
            if (!t)
                if (false === this.callEvent("onClear", e))
                    l = false;
            if (false === this.callEvent("onBallChange", e, 0, s))
                l = false;
            if (false == l)
                return this;
            this.__stopAniTimer(e);
            i.removeClass(n + " " + a);
            this.callEvent("onChange", "clear");
            return this
        },
        push: function(e, t, i) {
            return this.__change(e, 1, t, i)
        },
        pull: function(e, t) {
            return this.__change(e, 0, t)
        },
        __change: function(i, n, a, s) {
            if (!i || !{
                red: 1,
                blue: 1
            }[i] || !a || !a.length)
                return this;
            var l = t.map(a, function(e) {
                return +e
            })
              , r = this.config[i + "BallActive"]
              , c = this.config[i + "BallHightL"]
              , h = this
              , o = []
              , u = []
              , f = 0 == n;
            this.cache[i + "Balls"].each(function(e, i) {
                var n = t(i)
                  , a = +n.text();
                if (t.inArray(a, l) >= 0 && n.hasClass(r) === f) {
                    u.push(i);
                    o.push(a)
                }
            });
            if (!o.length)
                return this;
            if (false === this.callEvent("onBallChange", i, n, o))
                return this;
            this.__stopAniTimer(i);
            t.each(u, function(e, i) {
                if (n)
                    t(i).addClass(!h.config.animate || h._closeAnimteOnce ? r + " " + c : r);
                else
                    t(i).removeClass(r + " " + c)
            });
            if (n && h.config.animate && !h._closeAnimteOnce) {
                var d = u.length
                  , g = 0;
                this["__" + i + "hltimer"] = e.setInterval(function() {
                    if (g < d)
                        t(u[g]).addClass(c);
                    else
                        h.__stopAniTimer(i);
                    g++
                }, 50)
            }
            if (h._closeAnimteOnce)
                delete h._closeAnimteOnce;
            this.callEvent("onChange", s || (n ? "push" : "pull"));
            return this
        },
        __stopAniTimer: function(i) {
            var n = "__" + i + "hltimer"
              , s = this
              , l = s.config[i + "BallActive"]
              , r = s.config[i + "BallHightL"];
            if (s[n]) {
                e.clearInterval(s[n]);
                s[n] = a;
                s.cache[i + "Balls"].each(function(e, i) {
                    var n = t(i);
                    n[n.hasClass(l) ? "addClass" : "removeClass"](r)
                })
            }
        },
        random: function(e, i) {
            if (!e || !{
                red: 1,
                blue: 1
            }[e] || !i)
                return this;
            var a = [], s = [], l = [], r, c, h = this.config[e + "BallActive"];
            this.cache[e + "Balls"].each(function(e, i) {
                var n = t(i)
                  , r = +t(i).text();
                if (n.hasClass(h))
                    s.push(r);
                else
                    l.push(r);
                a[e] = r
            });
            if (false === this.callEvent("onRandom", e, c = Math.min(a.length, +i)))
                return this;
            if (s.length < c) {
                r = n.random(l, c - s.length).concat(s);
                this._closeAnimteOnce = s.length > 0
            } else
                r = n.random(a, c);
            return this.set(e, r, "random")
        },
        set: function(e, t, i) {
            if ("array" == n.getType(e) && 2 == e.length && "array" == n.getType(e[0]) && "array" == n.getType(e[1]))
                return this.set("red", e[0]).set("blue", e[1]);
            if (!e || !{
                red: 1,
                blue: 1
            }[e] || !t)
                return this;
            return this.clear(e, true).push(e, t, i)
        },
        toggle: function(e, i) {
            if (!e || !{
                red: 1,
                blue: 1
            }[e] || !i || !i.length)
                return this;
            var n = t.map(i, function(e) {
                return +e
            })
              , a = []
              , s = []
              , l = this.config[e + "BallActive"];
            this.cache[e + "Balls"].each(function(e, i) {
                var r = t(i)
                  , c = +r.text();
                if (t.inArray(c, n) >= 0)
                    r.hasClass(l) ? a.push(c) : s.push(c)
            });
            return !s.length ? this.pull(e, a) : this.push(e, s)
        }
    });
    var h = n.regBaseCom2Lib("COMS.PT.DingDanShaHaoArea", "onChange onBallClick onBallChange onClear", {
        config: {
            wrap: "",
            redBallSelector: ".redBallBox li a",
            redBallActive: "active",
            redBallDisable: "killNum",
            blueBallSelector: ".blueBallBox li a",
            blueBallActive: "active",
            blueBallDisable: "killNum"
        },
        init: function(e) {
            var i = n.getType(e)
              , a = this;
            switch (i) {
            case "string":
            case "element":
                this.config = t.extend({}, this.config, {
                    wrap: e
                });
                break;
            case "object":
                if (e.jquery) {
                    this.config = t.extend({}, this.config, {
                        wrap: e
                    });
                    break
                }
                this.config = t.extend({}, this.config, e || {});
                break;
            default:
                return
            }
            var s = t(this.config.wrap);
            if (!s[0]) {
                l("投注区容器设置错误，初始化失败！", "area001");
                return
            }
            s.delegate(this.config.redBallSelector, "click", function(e) {
                return a.ballClick(this, e, "red")
            }).delegate(this.config.blueBallSelector, "click", function(e) {
                return a.ballClick(this, e, "blue")
            });
            this.cache = {
                redBalls: s.find(this.config.redBallSelector),
                blueBalls: s.find(this.config.blueBallSelector)
            }
        },
        ballClick: function(e, i, n) {
            var a = t(e), s = this.config[n + "BallActive"], l = this.config[n + "BallDisable"], r = this, c, h = a.text();
            function o(e) {
                var t = true;
                if (false === r.callEvent("onBallClick", n, e, [h]))
                    t = false;
                if (false === r.callEvent("onBallChange", n, e, [h]))
                    t = false;
                return t
            }
            c = a.hasClass(s) ? -1 : a.hasClass(l) ? 0 : 1;
            if (!o(c))
                return false;
            a[1 === c ? "addClass" : "removeClass"](s);
            a[c === -1 ? "addClass" : "removeClass"](l);
            r.callEvent("onChange", "click")
        },
        get: function(e, i) {
            if (!e || !{
                red: 1,
                blue: 1
            }[e])
                return [this.get("red", i), this.get("blue", i)];
            var n = this.cache[e + "Balls"]
              , a = this.config[e + "BallActive"]
              , s = this.config[e + "BallDisable"]
              , l = {
                dan: [],
                sha: []
            };
            n.each(function(e, n) {
                if (t(n).hasClass(a)) {
                    var r = t(n).text();
                    l.dan.push(i ? r : +r)
                }
                if (t(n).hasClass(s)) {
                    var r = t(n).text();
                    l.sha.push(i ? r : +r)
                }
            });
            return l
        },
        clear: function(e, t) {
            if (!e || !{
                red: 1,
                blue: 1
            }[e]) {
                this.clear("red", t);
                this.clear("blue", t);
                return this
            }
            var i = this.cache[e + "Balls"], n = this.config[e + "BallActive"], a = this.config[e + "BallDisable"], s = this.get(e), l;
            if (!s.dan.length && !s.sha.length)
                return this;
            if (!t)
                if (false === this.callEvent("onClear", e))
                    l = false;
            if (false === this.callEvent("onBallChange", e, 0, s))
                l = false;
            if (false == l)
                return this;
            i.removeClass(n + " " + a);
            this.callEvent("onChange", "clear");
            return this
        },
        dan: function(e, t) {
            this.__change(e, 1, t)
        },
        pull: function(e, t) {
            this.__change(e, 0, t)
        },
        sha: function(e, t) {
            this.__change(e, -1, t)
        },
        __change: function(e, i, n) {
            if (!e || !{
                red: 1,
                blue: 1
            }[e] || !n || !n.length)
                return this;
            var a = t.map(n, function(e) {
                return +e
            })
              , s = this.config[e + "BallActive"]
              , l = this.config[e + "BallDisable"]
              , r = this
              , c = []
              , h = [];
            i = +i;
            this.cache[e + "Balls"].each(function(e, n) {
                var r = t(n)
                  , o = +r.text()
                  , u = false;
                if (t.inArray(o, a) >= 0)
                    if (0 == i)
                        (r.hasClass(s) || r.hasClass(l)) && (u = true);
                    else if (1 == i)
                        !r.hasClass(s) && (u = true);
                    else
                        !r.hasClass(l) && (u = true);
                if (u) {
                    h.push(n);
                    c.push(o)
                }
            });
            if (!c.length)
                return this;
            if (false === this.callEvent("onBallChange", e, i, c))
                return this;
            t.each(h, function(e, n) {
                var a = t(n);
                a.removeClass([s, l].join(" "));
                if (1 == i)
                    a.addClass(s);
                if (i == -1)
                    a.addClass(l)
            });
            this.callEvent("onChange", ["sha", "pull", "dan"][i + 1]);
            return this
        },
        random: function(e, i) {
            var a = this.get()
              , s = a[0]
              , l = a[1]
              , r = []
              , c = []
              , h = this;
            t.each(["red", "blue"], function(a, s) {
                var l = []
                  , o = h.config[s + "BallActive"]
                  , u = h.config[s + "BallDisable"]
                  , f = "red" === s ? e : i;
                h.cache[s + "Balls"].each(function(e, i) {
                    var n = t(i);
                    !n.hasClass(o) && !n.hasClass(u) && l.push(+n.text())
                });
                if ("red" == s)
                    r = n.random(l, f);
                else
                    c = n.random(l, f)
            });
            c = n.unique(l.dan, c).sort(function(e, t) {
                return +e - +t
            });
            if (s.dan.length && s.dan.length + e > 6)
                return [s.dan, [], r, c];
            else
                return [n.unique(s.dan, r).sort(function(e, t) {
                    return +e - +t
                }), c]
        }
    });
    var o = n.regBaseCom2Lib("COMS.PT.DantuoArea", "onChange onBallClick onBallChange onClear", {
        config: {
            wrap: "",
            danWrap: ".danMa",
            tuoWrap: ".tuoMa",
            redBallSelector: ".redBallBox li a",
            redBallActive: "active",
            blueBallSelector: ".blueBallBox li a",
            blueBallActive: "active"
        },
        init: function(e) {
            var i = n.getType(e)
              , a = this;
            switch (i) {
            case "string":
            case "element":
                this.config = t.extend({}, this.config, {
                    wrap: e
                });
                break;
            case "object":
                if (e.jquery) {
                    this.config = t.extend({}, this.config, {
                        wrap: e
                    });
                    break
                }
                this.config = t.extend({}, this.config, e || {});
                break;
            default:
                return
            }
            var s = t(this.config.wrap)
              , r = s.find(this.config.danWrap)
              , c = s.find(this.config.tuoWrap);
            if (!s[0] || !r[0] || !c[0]) {
                l("胆拖投注区容器设置错误，初始化失败！", "dantuo001");
                return
            }
            t.each(["dan", "tuo"], function(e, i) {
                t.each(["red", "blue"], function(e, t) {
                    s.delegate(a.config[i + "Wrap"] + " " + a.config[t + "BallSelector"], "click", function(e) {
                        return a.ballClick(this, e, i, t)
                    })
                })
            });
            this.cache = {
                danWrap: r,
                dan: {
                    redBalls: r.find(this.config.redBallSelector),
                    blueBalls: r.find(this.config.blueBallSelector)
                },
                tuoWrap: c,
                tuo: {
                    redBalls: c.find(this.config.redBallSelector),
                    blueBalls: c.find(this.config.blueBallSelector)
                }
            }
        },
        ballClick: function(e, i, n, a) {
            var s = t(e), l = this.config[a + "BallActive"], r = this, c, h = function(e, i) {
                var s = [], c;
                t.each(i, function(e, i) {
                    s[e] = +t(i).text()
                });
                if (false === r.callEvent("onBallClick", n, a, e, s))
                    c = false;
                if (false === r.callEvent("onBallChange", n, a, e, s))
                    c = false;
                if (false == c)
                    return false;
                t.each(i, function(i, n) {
                    t(n)[e ? "addClass" : "removeClass"](l)
                });
                if (1 == e)
                    r.pull({
                        dan: "tuo",
                        tuo: "dan"
                    }[n], a, s);
                r.callEvent("onChange", "click")
            };
            c = h(s.hasClass(l) ? 0 : 1, s)
        },
        get: function(e, i, n) {
            if (!e || !{
                dan: 1,
                tuo: 1
            }[e])
                return [this.get("dan", "red", n), this.get("dan", "blue", n), this.get("tuo", "red", n), this.get("tuo", "blue", n)];
            if (!i || !{
                red: 1,
                blue: 1
            }[i])
                return [this.get(e, "red", n), this.get(e, "blue", n)];
            var a = this.cache[e][i + "Balls"]
              , s = this.config[i + "BallActive"]
              , l = [];
            a.each(function(e, i) {
                if (t(i).hasClass(s)) {
                    var a = t(i).text();
                    l.push(n ? a : +a)
                }
            });
            return l
        },
        clear: function(e, t, i) {
            if (!e || !{
                dan: 1,
                tuo: 1
            }[e]) {
                this.clear("dan", "red", i);
                this.clear("dan", "blue", i);
                this.clear("tuo", "red", i);
                this.clear("tuo", "blue", i);
                return this
            }
            if (!t || !{
                red: 1,
                blue: 1
            }[t]) {
                this.clear(e, "red", i);
                this.clear(e, "blue", i);
                return this
            }
            var n = this.cache[e][t + "Balls"], a = this.config[t + "BallActive"], s = this.get(e, t), l;
            if (!s.length)
                return this;
            if (!i)
                if (false === this.callEvent("onClear", e, t))
                    l = false;
            if (false === this.callEvent("onBallChange", e, t, 0, s))
                l = false;
            if (false == l)
                return this;
            n.removeClass(a);
            this.callEvent("onChange", "clear");
            return this
        },
        push: function(e, t, i, n) {
            return this.__change(e, t, 1, i, n)
        },
        pull: function(e, t, i) {
            return this.__change(e, t, 0, i)
        },
        __change: function(e, i, n, a, s) {
            if (!e || !{
                dan: 1,
                tuo: 1
            }[e] || !i || !{
                red: 1,
                blue: 1
            }[i] || !a || !a.length)
                return this;
            var l = t.map(a, function(e) {
                return +e
            })
              , r = this.config[i + "BallActive"]
              , c = []
              , h = []
              , o = 0 == n;
            this.cache[e][i + "Balls"].each(function(e, i) {
                var n = t(i)
                  , a = +n.text();
                if (t.inArray(a, l) >= 0 && n.hasClass(r) === o) {
                    h.push(i);
                    c.push(a)
                }
            });
            if (!c.length)
                return this;
            if (false === this.callEvent("onBallChange", e, i, n, c))
                return this;
            t.each(h, function(e, i) {
                t(i)[n ? "addClass" : "removeClass"](r)
            });
            if (1 == n)
                this.__change({
                    dan: "tuo",
                    tuo: "dan"
                }[e], i, 0, c);
            this.callEvent("onChange", s || (n ? "push" : "pull"));
            return this
        },
        set: function(e, t, i, a) {
            if ("array" == n.getType(e) && 4 == e.length && "array" == n.getType(e[0]) && "array" == n.getType(e[1]) && "array" == n.getType(e[2]) && "array" == n.getType(e[3]))
                return this.set("dan", "red", e[0]).set("dan", "blue", e[1]).set("tuo", "red", e[2]).set("tuo", "blue", e[3]);
            if (!e || !{
                dan: 1,
                tuo: 1
            }[e] || !t || !{
                red: 1,
                blue: 1
            }[t] || !i)
                return this;
            return this.clear(e, t, true).push(e, t, i, a)
        },
        toggle: function(e, i, n) {
            if (!e || !{
                dan: 1,
                tuo: 1
            }[e] || !i || !{
                red: 1,
                blue: 1
            }[i] || !n || !n.length)
                return this;
            var a = t.map(n, function(e) {
                return +e
            })
              , s = []
              , l = []
              , r = this.config[i + "BallActive"];
            this.cache[e][i + "Balls"].each(function(e, i) {
                var n = t(i)
                  , c = +n.text();
                if (t.inArray(c, a) >= 0)
                    n.hasClass(r) ? s.push(c) : l.push(c)
            });
            return !l.length ? this.pull(e, i, s) : this.push(e, i, l)
        }
    });
    var u = n.regBaseCom2Lib("COMS.PT.BetPool", "onChange onDelete onAdd onEdit onRandom onClear", {
        config: {
            wrap: "",
            highlight: "ddactive",
            hover: "ddhover",
            inedit: "inEdit",
            useServerRandom: true,
            serverRandomUrl: "",
            random: null,
            edit: null,
            adapter: null,
            counter: null,
            serialize: null,
            animate: true
        },
        init: function(e) {
            this.config = t.extend({}, this.config, e || {});
            if (!t.isFunction(this.config.random)) {
                l("没有提供机选算法接口random，初始化失败！", "pool001");
                return
            }
            if (!t.isFunction(this.config.edit)) {
                l("没有提供投注数据修改接口edit，初始化失败！", "pool002");
                return
            }
            if (!t.isFunction(this.config.adapter)) {
                l("没有提供数据转化器adapter，初始化失败！", "pool003");
                return
            }
            if (!t.isFunction(this.config.counter)) {
                l("没有提供数据统计器counter，初始化失败！", "pool004");
                return
            }
            var i = t(this.config.wrap);
            if (!i[0]) {
                l("号码篮容器设置错误，初始化失败！", "pool005");
                return
            }
            if (!i.find(">dl")[0])
                i.html("<dl></dl>");
            this.config.wrap = i;
            if (t.browser.msie && t.browser.version < 7) {
                var n = this.config.hover;
                i.delegate("dd", "mouseenter", function() {
                    t(this).addClass(n)
                }).delegate("dd", "mouseleave", function() {
                    t(this).removeClass(n)
                })
            }
            var a = this;
            i.delegate("a[rel=betPoolAct]", "click", function(e) {
                var i = t(this)
                  , n = i.attr("pid") || 0
                  , s = this.hash.substr(1);
                switch (s) {
                case "del":
                    a.del(n);
                    break;
                case "edit":
                    a.__edit(n)
                }
                e.preventDefault()
            });
            this.cache = {
                list: i.find("dl"),
                data: [],
                guid: 1
            }
        },
        push: function() {
            return this.push2(Array.prototype.slice.call(arguments, 0))
        },
        push2: function(e, t) {
            if ("array" !== n.getType(e))
                return this;
            this.notHeightLight = !!t;
            this.insert(0, -1, e);
            delete this.notHeightLight;
            return this
        },
        getData: function() {
            return this.cache.data.slice(0)
        },
        serialize: function() {
            if (!t.isFunction(this.config.serialize)) {
                l("没有提供数据序列化接口serialize！", "pool006");
                return ""
            }
            return this.config.serialize(this.getData())
        },
        getCount: function(e) {
            var t = 0, i = 0, n = e || this.cache.data, a = n.length, s = 0, r;
            for (; s < a; s++) {
                r = this.config.counter(n[s]);
                if (!r || 2 != r.length)
                    l("数据统计器返回值错误！", "pool007");
                else {
                    t += r[0];
                    i += r[1]
                }
            }
            return [t, i]
        },
        insert: function(e, i, n, s) {
            var l = this.cache.data, r = l.length, c = this, h, o, u = s == a ? "onAdd" : s, f = 0 == r || 0 == e ? 0 : !e ? r : -1, d;
            if (f < 0)
                t.each(l, function(t, n) {
                    if (n.guid == +e) {
                        f = i > 0 ? t + 1 : t;
                        return
                    }
                });
            if (f < 0)
                return this;
            if (c.config.dataChecker) {
                h = c.config.dataChecker(n).fixData;
                if (!t.isArray(h)) {
                    console && console.log && console.log("数据检查器dataChecker返回值错误!");
                    h = n.slice(0)
                }
            } else
                h = n.slice(0);
            if (!h.length)
                return this;
            t.each(h, function(e, t) {
                h[e] = c.__setGuid(t)
            });
            o = [].concat(l.slice(0, f), h, l.slice(f));
            if (u)
                if (false === this.callEvent(u, h, o))
                    return this;
            d = [];
            t.each(h, function(e, t) {
                d[e] = c.__getItem(t, t.guid)
            });
            if (0 == f) {
                this.cache.list.prepend(d.join("")).scrollTop(0);
                if (1 == n.length && c.config.animate)
                    this.cache.list.find("dd:first").hide().show(300)
            } else if (!e)
                this.cache.list.append(d.join("")).scrollTop(this.cache.list[0].scrollHeight);
            else {
                var g = this.cache.list.find("dd[gid=" + e + "]")
                  , v = g.height()
                  , C = g.offset().top - this.cache.list.offset().top + v
                  , p = C - this.cache.list.height() + v
                  , m = this.cache.list.scrollTop();
                g[i > 0 ? "after" : "before"](d.join(""));
                if (curPos < p || m > C)
                    this.cache.list.scrollTop(parseInt((p + C) / 2))
            }
            this.__highlight(h);
            this.cache.data = o;
            u && this.callEvent("onChange", u.replace(/^on/g, "").toLowerCase());
            return this
        },
        del: function(e) {
            var i = this.__inCache(e), n, a, s, l;
            if (i < 0)
                return this;
            n = this.cache.data;
            a = n[i];
            s = [].concat(n.slice(0, i), n.slice(i + 1));
            if (false === this.callEvent("onDelete", a, s))
                return this;
            l = this.cache.list.find("dd[gid=" + e + "]");
            if (this.config.animate) {
                l.find("a").attr("href", "#");
                l.hide(function() {
                    t(this).remove()
                })
            } else
                l.remove();
            this.cache.data = s;
            this.callEvent("onChange", "del");
            return this
        },
        clear: function() {
            var e = this.cache.data
              , t = e.length;
            if (0 == t)
                return this;
            if (false === this.callEvent("onClear"))
                return this;
            this.cache.list.empty().html("");
            this.cache.data.length = 0;
            this.callEvent("onChange", "clear");
            return this
        },
        edit: function(e, i) {
            var n = this.__inCache(e), a, s, l = this;
            if (!i)
                return this;
            if (l.config.dataChecker) {
                newData = l.config.dataChecker([i]).fixData;
                if (!t.isArray(newData))
                    console && console.log && console.log("数据检查器dataChecker返回值错误!");
                else
                    i = newData.length ? newData[0] : null
            }
            if (!i)
                return this;
            if (n >= 0 && false === this.callEvent("onEdit", this.cache.data[n], i))
                return this;
            if (n < 0)
                return this.push(i);
            a = this.cache.list.find("dd[gid=" + e + "]");
            s = this.__setGuid(i, e);
            a.after(this.__getItem(s, s.guid));
            a.remove();
            this.cache.data[n] = s;
            this.__highlight([s]);
            this.callEvent("onChange", "edit");
            return this
        },
        __edit: function(e) {
            var t = this
              , i = t.cache.data
              , n = t.config.inedit
              , a = t.__inCache(e);
            if (a >= 0) {
                t.cache.list.find("." + n).removeClass(n).end().find("[gid=" + e + "]").addClass(n);
                t.config.edit(e, t.cache.data[a])
            }
            return this
        },
        random: function(n, a) {
            var s = n || 1, r = this, c = this.config.serverRandomUrl, h, o, u = function(e) {
                var i = r.config.random(e, s);
                if (!i || !i.length) {
                    l("机选算法接口返回值错误！", "pool008");
                    return
                }
                if (false === r.callEvent("onRandom", e ? "server" : "client", i))
                    return;
                r.insert(0, 1, i, "");
                r.callEvent("onChange", "random");
                t.isFunction(a) && a(i);
                u = t.noop
            };
            if (this.config.useServerRandom && c) {
                h = t.isFunction(c) ? c.call(this.config) || "" : c;
                !h ? u("") : i.get(h.replace(/{n}/g, s), function(t, i) {
                    o && e.clearTimeout(o);
                    u(t ? "" : i)
                }, "@randomJX");
                o = e.setTimeout(function() {
                    u("")
                }, 300)
            } else
                u("");
            return this
        },
        __getItem: function(e, t) {
            var i = "<dd gid=" + t + ">" + this.config.adapter(e) + "</dd>"
              , a = {
                del: '<a rel="betPoolAct" pid="' + t + '" href="#del">删除</a>',
                edit: '<a rel="betPoolAct" pid="' + t + '" href="#edit">修改</a>'
            };
            return n.format(i, a)
        },
        __setGuid: function(e, t) {
            if (e.guid)
                return e;
            var i = n.getType(e), a;
            switch (i) {
            case "string":
                a = new String(e);
                break;
            case "number":
                a = new Number(e);
                break;
            default:
                a = e
            }
            a.guid = t || this.cache.guid++;
            return a
        },
        __inCache: function(e, t) {
            var i = t || this.cache.data
              , n = i.length
              , a = 0;
            for (; a < n; a++)
                if (i[a].guid == +e)
                    return a;
            return -1
        },
        __highlight: function(i) {
            if (this.notHeightLight)
                return this;
            var n = this.__highlight.Cache
              , a = this
              , s = a.config.highlight
              , l = function(e) {
                var i = [];
                a.cache.list.find("dd").each(function() {
                    var n = t(this).attr("gid") || 0
                      , l = a.__inCache(n, e);
                    if (l >= 0)
                        i.push(t(this).addClass(s))
                });
                return i
            };
            if (n && n.length > 0) {
                this.__highlight.Cache = n.concat(l(i));
                return this
            }
            this.__highlight.Cache = l(i);
            e.setTimeout(function() {
                var i = a.__highlight.Cache;
                e.setTimeout(function() {
                    t.each(i, function(e, t) {
                        t.removeClass(s)
                    });
                    i = null
                }, 900);
                a.__highlight.Cache = []
            }, 500)
        }
    });
    var f = n.regBaseCom2Lib("COMS.PT.iNumber", "onChange", {
        config: {
            wrap: "",
            addSelector: ".add",
            reduceSelector: ".subtract",
            addDisCss: "addDisable",
            addDownCss: "addDown",
            reduceDisCss: "subtractDisable",
            reduceDownCss: "subtractDown",
            min: 1,
            max: 9999,
            step: 1,
            editable: true
        },
        init: function(e) {
            var a = n.getType(e)
              , s = this;
            switch (a) {
            case "string":
            case "element":
                this.config = t.extend({}, this.config, {
                    wrap: e
                });
                break;
            case "object":
                if (e.jquery) {
                    this.config = t.extend({}, this.config, {
                        wrap: e
                    });
                    break
                }
                this.config = t.extend({}, this.config, e || {});
                break;
            default:
                return
            }
            var r = t(this.config.wrap);
            if (!r[0]) {
                l("数字容器设置错误，初始化失败！", "num001");
                return
            }
            this.cache = {
                wrap: r,
                input: r.find("input"),
                add: r.find(this.config.addSelector).disableDrag(),
                reduce: r.find(this.config.reduceSelector).disableDrag()
            };
            this.cache.input.val(this.get());
            this.__initCtrl(this.config.addSelector, +s.config.step, this.config.addDownCss).__initCtrl(this.config.reduceSelector, -s.config.step, this.config.reduceDownCss);
            if (this.config.editable)
                i.loadCdnJS("js2/liveCheck.js", function() {
                    return !!t.fn.bindLiveCheck
                }, function() {
                    s.cache.input.bindLiveCheck(/\D/g, function() {
                        var e = s.get(true)
                          , t = this.value;
                        if (e + "" != t && t)
                            this.value = e;
                        t && s.callEvent(200, "onChange", +t)
                    }).blur(function() {
                        s.set(this.value)
                    }).disableIME()
                });
            else
                this.cache.input.attr("readonly", "readonly");
            s.onChange(s.__checkCtrl);
            s.__checkCtrl()
        },
        __initCtrl: function(i, n, a) {
            var s = function() {
                this.ctimer && e.clearTimeout(this.ctimer);
                this.stimer && e.clearInterval(this.stimer)
            }
              , l = this;
            this.cache.wrap.delegate(i, "click", function(e) {
                s.call(this);
                return l.__ctrlClick(this, e, n)
            }).delegate(i, "mousedown", function(t) {
                var i = this;
                this.ctimer = e.setTimeout(function() {
                    i.stimer = e.setInterval(function() {
                        l.__ctrlClick(i, t, n)
                    }, 150)
                }, 400)
            }).delegate(i, "mouseleave", function(e) {
                s.call(this)
            });
            if (t.fn.setControlEffect && a)
                this.cache.wrap.find(i).setControlEffect(a);
            return this
        },
        __ctrlClick: function(e, i, n) {
            if (t(e).hasClass("disabled"))
                return;
            this.set(this.get() + n)
        },
        __convert: function(e, t) {
            var i = (e + "").replace(/\D/g, ""), n = this.config.min, a = this.config.max, s;
            if (!i.length)
                i = n;
            s = +i;
            if (t)
                s = s > a ? a : s;
            else
                s = s < n ? n : s > a ? a : s;
            return s
        },
        __checkCtrl: function() {
            var e = this.config
              , t = e.min
              , i = e.max
              , n = this.get();
            this.cache.add[i == n ? "addClass" : "removeClass"](e.addDisCss);
            this.cache.reduce[t == n ? "addClass" : "removeClass"](e.reduceDisCss)
        },
        get: function(e) {
            return this.__convert(this.cache.input[0].value, e)
        },
        set: function(e) {
            var t = this.__convert(e)
              , i = this.cache.input[0];
            if (t + "" != i.value) {
                i.value = t;
                this.callEvent("onChange", t)
            }
            return this
        },
        hide: function() {
            this.config.wrap.hide();
            return this
        },
        show: function() {
            this.config.wrap.show();
            this.onChange();
            return this
        }
    })
}(window, jQuery, Core, Game);
