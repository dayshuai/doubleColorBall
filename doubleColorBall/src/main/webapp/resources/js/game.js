!function(t, n, r, e) {
    "use strict";
    !function(t, n) {
        var r = 1
          , e = {}
          , i = {};
        n.getStopRecursionFn = function(o, u) {
            u = u || t;
            if (n.isFunction(o))
                if (o.__stopRecursion && i[o.__stopRecursion])
                    return function() {
                        i[o.__stopRecursion](u, arguments)
                    }
                    ;
                else {
                    o.__stopRecursion = r;
                    i[o.__stopRecursion] = function(t, n) {
                        var r = e[o.__stopRecursion] || []
                          , i = 0;
                        for (i = 0; i < r.length; i++)
                            if (r[i] === t)
                                return t;
                        r.push(t);
                        e[o.__stopRecursion] = r;
                        o.apply(t, n);
                        for (i = 0; i < r.length; i++)
                            if (r[i] === t)
                                r.splice(i, 1)
                    }
                    ;
                    r += 1;
                    return function() {
                        i[o.__stopRecursion](u, arguments)
                    }
                }
        }
    }(window, jQuery);
    var i = t.Game = t.Game || {}
      , o = function(t) {
        var n = i.getCdnUrl()
          , r = i.getVersionId()
          , e = i
          , o = "";
        n += "/js2/game";
        if ("string" === typeof t) {
            t = t.split(".");
            for (var u = 0; u < t.length; u++)
                if (e[t[u]]) {
                    e = e[t[u]];
                    continue
                } else
                    o = [n, "/", t.join("/"), ".js?", r].join("");
            if (o)
                return o;
            else
                return true
        }
        return null
    }
      , u = function(t, r, e) {
        switch (t) {
        case "link":
            n.loadCss(r);
            break;
        case "script":
            n.loadJS(r, e)
        }
    }
      , a = function(t) {
        var n = i._toStrings
          , r = Object.prototype.toString
          , o = {
            1: "element",
            3: "textnode",
            9: "document",
            11: "fragment"
        };
        if (!n) {
            n = {};
            var u = "Arguments Array Boolean Date Document Element Error Fragment Function NodeList Null Number Object RegExp String TextNode Undefined Window".split(" ");
            for (var a = u.length; a--; ) {
                var s = u[a]
                  , f = window[s];
                if (f)
                    try {
                        n[r.call(new f)] = s.toLowerCase()
                    } catch (c) {}
            }
            i._toStrings = n
        }
        return null == t && (t === e ? "undefined" : "null") || t.nodeType && o[t.nodeType] || "number" == typeof t.length && (t.callee && _arguments || t.alert && "window" || t.item && "nodelist") || n[r.call(t)]
    }
      , s = function() {};
    s.fn = s.prototype = {
        getEventCache: function() {
            return {}
        },
        regEvent: function(t) {
            var n = a(t)
              , i = this
              , o = i.getEventCache();
            switch (n) {
            case "string":
                t = t.split(" ");
            case "array":
                r.each(t, function(t, n) {
                    o[n] = o[n] || []
                })
            }
            r.each(o, function(t) {
                i[t] = function(n) {
                    if (r.isFunction(n))
                        this.bind(t, n);
                    else if (n === e)
                        this.callEvent(t);
                    return this
                }
            });
            this.regEvent = function() {}
        },
        callEvent: function(t, n, r) {
            var i, o, u, a, s, f, c, l = this, s = Array.prototype.slice.call(arguments, 1);
            if (!isNaN(t)) {
                i = parseInt(t) || 200,
                o = this.getEventCache()[n],
                u = o.length;
                if (0 === u)
                    return;
                o.paras = s;
                if (!o.t)
                    o.t = window.setTimeout(function() {
                        delete o.t;
                        l.callEvent.apply(l, o.paras)
                    }, i);
                return
            }
            n = t;
            o = this.getEventCache()[n] || [],
            u = o.length,
            a = 0;
            if (0 == u)
                return;
            for (; a < u; a++) {
                c = o[a].apply(this, s);
                if (f === e || false === c)
                    f = c
            }
            return f
        },
        bind: function(t, n) {
            if ("object" == Game.getType(t)) {
                for (var e in t)
                    this.bind(e, t[e]);
                return this
            }
            var i = this.getEventCache()[t];
            if (i)
                r.isFunction(n) && i.push(n);
            else
                window.alert("未知的事件类型（" + t + "）！请检查大小写。");
            return this
        },
        unbind: function(t, n) {
            if ("object" == Game.getType(t)) {
                for (var e in t)
                    this.unbind(e, t[e]);
                return this
            }
            var i = this.getEventCache()[t];
            if (i)
                this.getEventCache()[t] = n ? r.grep(i, function(t, r) {
                    return t !== n
                }) : [];
            else
                window.alert("未知的事件类型（" + t + "）！请检查大小写。");
            return this
        },
        extend: function(t) {
            r.extend(this, t);
            return this
        }
    };
    !function(t) {
        var e = 1, i = {}, o;
        var u = function(t, n, r) {
            this.work = t;
            this.guid = e++;
            this.runNum = 0;
            this.interval = isNaN(n) ? 0 : 1e3 * +n;
            this.maxNum = this.interval ? r || 0 : 1;
            i[this.guid] = this;
            u.start()
        };
        u.start = function() {
            if (o)
                return;
            o = window.setInterval(u.loop, 250)
        }
        ;
        u.loop = function() {
            var t = 0;
            for (var n in i) {
                t++;
                i[n].run()
            }
            if (0 == t) {
                window.clearInterval(o);
                o = 0
            }
        }
        ;
        u.prototype = {
            stop: function() {
                if (i[this.guid])
                    delete i[this.guid];
                this.running = 0;
                this.wrok = null;
                n.GC()
            },
            run: function() {
                var t = new Date;
                if (this.running)
                    return;
                if (!this.lastRunTime || t - this.lastRunTime >= this.interval && this.interval && (this.runNum < this.maxNum || !this.maxNum)) {
                    this.running = 1;
                    this.lastRunTime = t;
                    this.runNum++;
                    try {
                        this.work(r.proxy(this.notice, this), this.runNum, this.maxNum)
                    } catch (e) {
                        n.log && n.log("定时任务(" + this.guid + ")运行错误！任务已经强制终止！", e);
                        this.stop()
                    }
                }
                if (this.maxNum && this.runNum >= this.maxNum)
                    this.stop()
            },
            notice: function(t) {
                this.running = 0;
                if (t)
                    this.stop()
            }
        };
        t.setTask = function(t, n, e) {
            if (!r.isFunction(t))
                return -1;
            var i = new u(t,n,e);
            return i.guid
        }
        ;
        t.clearTask = function(t) {
            if (!t)
                return;
            i[t] && i[t].stop()
        }
    }(i);
    r.extend(i, {
        config: {
            cdnUrl: "http://img3.126.net/caipiao",
            versionId: +new Date
        },
        format: r.format,
        getType: a,
        getVersionId: function() {
            return n.version || this.config.versionId
        },
        getCdnUrl: function() {
            return n.cdnUrl || this.config.cdnUrl
        },
        c: function(t, n) {
            t = +t;
            n = +n;
            if ("number" === a(t) && "number" === a(n)) {
                var r = 1
                  , e = 1;
                for (var i = t, o = 1; o <= n; r *= i--,
                e *= o++)
                    ;
                return r / e
            }
            return 0
        },
        CR: function(t, n) {
            var r = []
              , e = function(t, n, r, i, o) {
                var u, a = t.length - o, s;
                for (s = i; s <= a; s++) {
                    u = r.slice(0);
                    u.push(t[s]);
                    if (1 == o)
                        n.push(u);
                    else
                        e(t, n, u, s + 1, o - 1)
                }
            };
            e(t, r, [], 0, n);
            return r
        },
        c1: function(t, n) {
            var e = 0, o, u = i, s, f, c = 0;
            if ("array" !== a(t[0]))
                t = u.groupNum(t);
            if ("array" !== a(n))
                n = [n];
            o = t.length;
            f = function(n, r) {
                s.push(Math.pow(t[n][0], r) * u.c(t[n][1], r))
            }
            ;
            !function l(i, a) {
                if (a == o) {
                    c = 0;
                    s = u.addArr(i);
                    for (var a = 0; a < n.length; a++)
                        if (n[a] == s)
                            c += 1;
                    if (c > 0) {
                        s = [];
                        r.each(i, f);
                        e += u.multipleArr(s) * c
                    }
                    return
                }
                for (var h = 0; h <= t[a][1]; h++)
                    l(i.concat(h), a + 1)
            }([], 0);
            return e
        },
        c2: function(t, n, e) {
            var o = 0
              , u = 1
              , s = 0
              , f = i;
            if ("array" !== a(t[0]))
                t = f.groupNum(t);
            if ("array" !== a(n[0]))
                n = f.groupNum(n);
            if ("array" !== a(e))
                e = [e];
            for (var c = 0, l = n.length; c < l; c++) {
                o += n[c][1];
                u *= Math.pow(n[c][0], n[c][1])
            }
            if (0 == o)
                s = f.c1(t, e);
            else
                r.each(e, function(r) {
                    s += e[r] > o ? f.c1(t, e[r] - o) * u : f.c1(n, e[r])
                });
            return s
        },
        groupNum: function(t) {
            var n = []
              , r = {};
            if ("array" === a(t)) {
                for (var e = 0, i = t.length; e < i; e++)
                    r[t[e]] ? r[t[e]]++ : r[t[e]] = 1;
                for (var o in r)
                    n.push([o, r[o]])
            }
            return n
        },
        multipleArr: function(t) {
            var n = 1;
            if ("array" === a(t)) {
                for (var r = 0, e = t.length; r < e; r++)
                    n *= t[r];
                return n
            } else
                return 0
        },
        sortNum: function(t, n) {
            var r = "desc" != n ? function(t, n) {
                return t - n
            }
            : function(t, n) {
                return n - t
            }
            ;
            if ("array" === a(t))
                return t.sort(r);
            else
                return t
        },
        addArr: function(t) {
            var n = 0;
            if ("array" === a(t))
                for (var r = 0, e = t.length; r < e; r++)
                    n += t[r];
            return n
        },
        indexOf: function(t, n) {
            if ("array" === a(t) && t.length) {
                if (Array.prototype.indexOf)
                    return Array.prototype.indexOf.call(t, n);
                else
                    for (var r = 0; r < t.length; r++)
                        if (t[r] == n)
                            return r;
                return -1
            }
            return -1
        },
        random: function(t, n, e) {
            var i = [], o, u, a = 0, n = +n, s = /^\d+$/;
            if ("string" === typeof t) {
                t = t.split("-");
                if (2 === t.length) {
                    o = +t[0];
                    u = +t[1];
                    t = [];
                    if ("number" == typeof o && u && o < u)
                        for (a = o; a <= u; a++)
                            t.push(a)
                }
            }
            if (r.isArray(t) && n && n < t.length) {
                t = t.slice(0);
                i = this.randomSortArr(t).slice(0, n)
            } else if (n == t.length) {
                if (!e)
                    s.test(t.join("")) && t.sort(function(t, n) {
                        return +t - +n
                    });
                return t
            }
            if (!e)
                s.test(t.join("")) && i.sort(function(t, n) {
                    return +t - +n
                });
            return i
        },
        randomWeight: function(t, n) {
            var e = [], o, u, a, s, f, c = 0, l, h = {}, g = [], p, d, v, m = /^\d+$/;
            n = +n;
            if (t && r.isArray(t) && n) {
                s = 0;
                for (o = 0,
                a = t.length; o < a; o++)
                    if (r.isArray(t[o]) && 2 == t[o].length) {
                        if (t[o][0] && r.isArray(t[o][0]) && t[o][0].length) {
                            l = +t[o][1];
                            if (!l || l < 0)
                                l = 0;
                            l = Math.round(l);
                            s += t[o][0].length;
                            if (h[l])
                                h[l] = h[l].concat(t[o][0]);
                            else {
                                h[l] = t[o][0].slice(0);
                                g.push(l);
                                c += l
                            }
                        }
                    } else
                        return e;
                g.sort(function(t, n) {
                    return t - n
                });
                if (n < s) {
                    d = {};
                    for (o = 0; o < n; o++) {
                        v = ~~(Math.random() * c + 1);
                        d[v] ? d[v] += 1 : d[v] = 1
                    }
                    p = {};
                    for (v in d) {
                        f = 0;
                        for (u = 0,
                        a = g.length; u < a; u++)
                            if (v > f && v <= (f += g[u])) {
                                p[g[u]] ? p[g[u]] += d[v] : p[g[u]] = d[v];
                                break
                            }
                    }
                    for (v in p)
                        e = e.concat(i.random(h[v], p[v]))
                } else if (n == s)
                    for (o = 0,
                    a = t.length; o < a; o++)
                        e = e.concat(t[o][0]);
                if (e.length && m.test(e.join("")))
                    e.sort(function(t, n) {
                        return +t - +n
                    })
            }
            return e
        },
        randomNum: function(t, n) {
            t = +t;
            if (null == n) {
                n = t;
                t = 0
            }
            return t + Math.floor(Math.random() * (n - t + 1))
        },
        randomSortArr: function(t) {
            if (!t || !t.length)
                return [];
            var n, r = [], e = 0, o = t.length, u;
            for (; e < o; e++) {
                u = t[e];
                n = i.randomNum(e);
                r[e] = r[n];
                r[n] = u
            }
            return r
        },
        fillZero: function(t, n) {
            var r = Math.floor(+t)
              , e = r + ""
              , i = []
              , o = n || 2
              , u = o - e.length
              , a = 0;
            for (; a < u; a++)
                i[a] = "0";
            return u > 0 ? i.join("") + r : r + ""
        },
        unique: function(t) {
            var n = [], e = Array.prototype.slice.call(arguments, r.isArray(t) ? 0 : 1), i = e.length, o = 0, u;
            if (0 == i)
                return;
            for (; o < i; o++) {
                u = e[o];
                r.each(u, function(t, e) {
                    if (r.inArray(e, n) < 0)
                        n.push(e)
                })
            }
            true !== t && n.sort();
            return n
        },
        checkArr: function(t, n, e, i, o, u) {
            var a = 0
              , s = [];
            if (!r.isArray(t))
                return {
                    err: 1,
                    org: t,
                    fix: []
                };
            if ("boolean" == typeof o) {
                u = o;
                o = 0
            }
            o = o || Math.abs(e - n + 1);
            var f = {};
            r.each(t, function(t, r) {
                var i = +((r + "").replace(/\D/g, "") || -1);
                if (i < n || i > e)
                    a++;
                else if (f[i])
                    a++;
                else {
                    f[i] = 1;
                    s[s.length] = i
                }
            });
            if (s.length < i) {
                a++;
                s = []
            }
            if (s.length > o) {
                a++;
                s.length = o
            }
            !u && s.sort(function(t, n) {
                return +t - +n
            });
            return {
                err: a,
                org: t,
                fix: s
            }
        },
        getStopRecursionFn: function(t, n) {
            return r.getStopRecursionFn(t, n)
        },
        loadMolude: function(t, n) {
            var e;
            n = r.isFunction(n) ? n : r.noop;
            if ("string" === typeof t) {
                e = o(t);
                if (e)
                    true === e ? n() : u("script", e, n)
            } else if (r.isArray(t)) {
                var i = t.length
                  , a = 0
                  , s = i
                  , f = r.isFunction(n) ? function() {
                    0 == --s && n()
                }
                : r.noop;
                for (; a < i; a++) {
                    e = o(t[a]);
                    if (e)
                        true === e ? f() : u("script", e, f)
                }
            }
        },
        checkGamePause: function(t, e) {
            var e = e || r.noop;
            n.checkGamePause(t, function(t) {
                e(t);
                if (1 == t || 999 === t) {
                    i.gameStop = true;
                    r.sendMsg("gameOver")
                }
            });
            if ("string" === typeof t)
                r(function() {
                    n.popularizeConfigForBetPage(t)
                })
        },
        regBaseCom2Lib: function(t, n, e) {
            var i = function(t) {
                var r = {};
                this.getEventCache = function() {
                    return r
                }
                ;
                n && this.regEvent(n);
                this.init(t);
                return this
            };
            i.fn = i.prototype = new s;
            if (!e || !e.init) {
                alert("原型链数据错误，缺少init构造函数！");
                return
            }
            r.extend(i.fn, e);
            var o = t.split(".")
              , u = o.length
              , a = 0
              , f = this;
            for (; a < u; a++)
                if (a < u - 1)
                    f = f[o[a]] = f[o[a]] || {};
                else
                    f[o[a]] = i;
            return i
        },
        createCom: function(t, n, e) {
            var o = function(t) {
                var n = i || {}
                  , r = t.split(".")
                  , e = r.length
                  , o = 0;
                for (; o < e; o++) {
                    n = n[r[o]];
                    if (!n)
                        break
                }
                return n
            };
            var u = o(t)
              , a = u ? new u(n) : null;
            if (a) {
                r.isFunction(e) && e(a);
                return a
            }
            this.loadMolude(t, function() {
                var i = o(t)
                  , u = i ? new i(n) : null;
                r.isFunction(e) && e(u)
            })
        },
        dialog: function(t, n) {
            return r.dialog(r.extend({}, t, {
                title: t.title || "提示",
                css: t.className || "betDialog",
                button: t.button || ["*确定"],
                content: "<div class='betDialogContent'><em></em><div class='betDialogContent2'>" + t.content + "</div></div>",
                width: t.width == e ? 430 : t.width,
                height: t.height || 0,
                dragable: 1,
                animate: 0,
                check: t.check || r.noop
            }), n || r.noop)
        },
        alert: function(t, n, e, o) {
            if (r.isFunction(n)) {
                e = n;
                n = null
            }
            i.dialog({
                content: t,
                button: n || o
            }, e)
        },
        confirm: function(t, n, r) {
            i.alert(t, n, r, ["*确定", "取消"])
        },
        getMoneyText: function(t) {
            if (isNaN(t))
                return t;
            var n = 1e8
              , r = 1e12;
            return t < n ? t : t < r ? "<span title='" + t + "元！\n土豪，我们做朋友吧！'>" + (t / n).Round(2) + "亿</span>" : "<span title='" + t + "元！\n震精！请问您是哪路高人？'>" + (t / r).Round(2) + "万亿</span>"
        },
        setTimeout: function(t, n) {
            if (!r.isFunction(t) || n === e)
                return;
            var i, o = 36e5, u = function(n) {
                if (n < 0)
                    i = window.setTimeout(t, 0);
                else if (n <= o)
                    i = window.setTimeout(t, n);
                else
                    i = window.setTimeout(function() {
                        u(n - o)
                    }, o)
            };
            u(+n);
            return {
                clear: function() {
                    i && window.clearTimeout(i)
                }
            }
        }
    });
    r(document).ready(function() {
        if (n.saveData2LS)
            r.bindMsg("login.jump", function() {
                n.saveData2LS()
            })
    })
}(window, Core, jQuery);
