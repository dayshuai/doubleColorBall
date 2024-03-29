!function(e, t, n, r, a) {
    r.ssq = r.ssq || {};
    r.loadMolude("ssq.clientRandom");
    r.ssq.core = {
        maxRedNum: 33,
        wrap: "#select_list_box",
        useServerRandom: false,
        serverRandomUrl: "http://caipiao.163.com/order/getRandomStakeNumber.html?play=zx_fs&betCount={n}&gameEn=ssq",
        random: function(e, n) {
            var a = [], s, i, l;
            if (e) {
                s = e.split(",");
                t.each(s, function(e, t) {
                    var n = t.split(":")
                      , r = [n[0].split(" "), [n[1]]];
                    r.random = 2;
                    a.push(r)
                });
                return a
            }
            i = +n;
            if (r.ssq && r.ssq.clientRandom)
                return r.ssq.clientRandom(i);
            else
                for (l = 0; l < i; l++) {
                    d = [r.random("1-33", 6), r.random("1-16", 1)];
                    d.random = 1;
                    a[l] = d
                }
            return a
        },
        copyDataProp: function(e, t) {
            for (var n in t)
                if (t.hasOwnProperty(n) && !/^\d$/.test(n))
                    e[n] = t[n];
            return e
        },
        getMutexData: function(e, n) {
            var r = [];
            t.each(e, function(e, a) {
                if (t.inArray(+a, n) == -1)
                    r.push(+a)
            });
            return r
        },
        dataChecker: function(e) {
            var n = []
              , a = []
              , s = []
              , i = this;
            t.each(e, function(e, t) {
                var l, o, c;
                if (2 == t.length) {
                    l = r.checkArr(t[0], 1, 33, 6);
                    o = r.checkArr(t[1], 1, 16, 1);
                    if (l.err || o.err)
                        a.push(t);
                    else
                        n.push(t);
                    if (l.fix.length && o.fix.length)
                        s.push(i.copyDataProp([l.fix, o.fix], t))
                } else {
                    l = r.checkArr(t[0], 1, 33, 1, 5);
                    o = r.checkArr(t[3], 1, 16, 1);
                    c = r.checkArr(i.getMutexData(t[2], l.fix), 1, 33, 2, 31);
                    if (l.err || o.err || c.err || l.fix.length + c.fix.length <= 6)
                        a.push(t);
                    else
                        n.push(t);
                    if (l.fix.length * c.fix.length * o.fix.length > 0 && l.fix.length + c.fix.length > 6)
                        s.push(i.copyDataProp([l.fix, [], c.fix, o.fix], t))
                }
            });
            return {
                okData: n,
                errData: a,
                fixData: s,
                orgData: e
            }
        },
        htmlTmpl: ['<span class="type">{type}</span>', '<span class="nums" title="{red}|{blue} [共{num}注 {cost}元]"><strong class="c_ba2636">{red}</strong>|<strong class="c_1e50a2">{blue}</strong></span>', '<span class="edit">{edit}{del}</span>', '<span class="sum">{cost}元</span>'].join(""),
        adapter: function(e) {
            var n = function(e) {
                var t = e.length
                  , n = 0
                  , a = [];
                for (; n < t; n++)
                    a[n] = r.fillZero(e[n], 2);
                return a.join(" ")
            }
              , a = {
                lucky: "幸运选号"
            }
              , s = 2 == e.length ? {
                type: a[e.type || ""] || (e[0].length > 6 || e[1].length > 1 ? "复式" : "单式"),
                red: n(e[0]),
                blue: n(e[1])
            } : {
                type: a[e.type || ""] || "胆拖",
                red: "(" + n(e[0]) + ")" + n(e[2]),
                blue: n(e[3])
            }
              , i = this.counter(e);
            s.num = i[0];
            s.cost = i[1];
            if ("lucky" == e.type)
                s.edit = "<em></em>";
            return t.format(this.htmlTmpl, s)
        },
        counter: function(e) {
            var t = 2 == e.length ? r.c(e[0].length, 6) * e[1].length : e[0].length + e[2].length > 6 && e[0].length * e[2].length > 0 ? r.c(e[2].length, 6 - e[0].length) * e[3].length : 0;
            return [t, 2 * t]
        },
        serialize: function(e) {
            var n = [], a = function(e) {
                t.each(e, function(t, n) {
                    e[t] = r.fillZero(n)
                });
                return e.join(" ")
            }, s, i = this;
            t.each(e, function(e, t) {
                if (2 == t.length) {
                    s = i.getT(t);
                    n[e] = a(t[0]) + ":" + a(t[1]) + (s ? "t:" + s : "")
                } else
                    n[e] = "(" + a(t[0]) + ")" + a(t[2]) + ":" + a(t[3])
            });
            return n.join(",")
        },
        parse: function(e) {
            var n = []
              , r = e.split(",")
              , a = this;
            t.each(r, function(e, t) {
                var r, s, i;
                if (0 == t.indexOf("(")) {
                    r = t.substr(1).split(")");
                    s = r[1].split(":");
                    i = [r[0].split(" "), [], s[0].split(" "), s[1].split(" ")]
                } else {
                    r = t.replace(/t:/g, ":").split(":"),
                    i = [r[0].split(" "), r[1].split(" ")];
                    if (r.length > 2)
                        a.setT(i, +r[2])
                }
                n[e] = i
            });
            return n
        },
        getT: function(e) {
            var t = {
                upload: 2,
                dingdan: 3,
                lucky: 5
            }[e.type];
            return t || (e.random ? 1 : 0)
        },
        setT: function(e, t) {
            e.type = {
                2: "upload",
                3: "dingdan",
                5: "lucky"
            }[t];
            e.random = 5 == +t || 1 == +t ? 1 : a
        }
    }
}(window, jQuery, Core, Game);
