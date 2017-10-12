!function(window, $) {
    var Select = function(e, t) {
        this.config = e;
        this.change = t
    }
      , Target = null
      , ME = null
      , FalseFn = function() {
        return false
    };
    Select.dealConfig = function(e, t) {
        var i = {
            callback: $.noop
        };
        if ($.isFunction(e)) {
            i.callback = e;
            e = {}
        } else if ($.isFunction(t))
            i.callback = t;
        i.config = $.extend({}, Select.config, e || {});
        return i
    }
    ;
    Select.hide = function() {
        if (ME) {
            ME.list.find("a").removeClass("." + ME.config.hoverCss).end().hide();
            ME.wrap.removeClass(ME.config.hitCss);
            ME = null
        }
        $(document).unbind("mousedown", Select.hide);
        Target = null
    }
    ;
    Select.config = {
        wrap: ".mcSelectBox",
        holder: ".imitateSelect",
        list: ".optionList",
        hoverCss: "iSelectHover",
        minHeight: 0,
        flowCss: "listOverFlow",
        hitCss: "opened",
        method: "click"
    };
    Select.prototype = {
        init: function() {
            var wrap = $(this.config.wrap), list = wrap.find(this.config.list), holder = wrap.find(this.config.holder), w, com = this, hoverCss = com.config.hoverCss, method = this.config.method;
            this.type = holder[0].tagName.toLowerCase();
            this.holder = holder;
            this.wrap = wrap;
            this.list = list;
            if ("click" == method)
                holder.parent().mousedown(function(e) {
                    if (e.button == (eval('"\\v"=="v"') ? 1 : 0)) {
                        com.show();
                        if ("a" == com.type)
                            e.preventDefault();
                        if (!$(e.target).closest(com.config.list).length)
                            e.stopPropagation()
                    }
                });
            if ({
                mouseover: 1,
                mouseenter: 1
            }[method]) {
                var clearTimer = function() {
                    this.stimer && window.clearTimeout(this.stimer);
                    this.htimer && window.clearTimeout(this.htimer)
                };
                holder.parent().bind({
                    mouseenter: function() {
                        clearTimer.call(this);
                        this.stimer = window.setTimeout(function() {
                            com.show()
                        }, 200)
                    },
                    mouseleave: function() {
                        clearTimer.call(this);
                        this.htimer = window.setTimeout(function() {
                            Select.hide()
                        }, 100)
                    }
                })
            }
            if ("a" == this.type)
                holder.click(FalseFn);
            list.delegate("a", "mouseenter", function() {
                list.find("." + hoverCss).removeClass(hoverCss);
                $(this).addClass(hoverCss)
            }).delegate("a", "mousedown", function(e) {
                var t = com.type
                  , i = {
                    oldVal: {
                        a: holder[0].href,
                        span: holder.text(),
                        input: holder[0].value
                    }[t],
                    newVal: {
                        a: this.href
                    }[t] || this.hash.substr(1)
                };
                if (i.oldVal != i.newVal) {
                    switch (t) {
                    case "a":
                        holder[0].href = this.href;
                        holder.text($(this).text());
                        break;
                    case "span":
                        holder.text(this.hash.substr(1));
                        holder[0].title = $(this).text();
                        break;
                    case "input":
                        holder[0].value = this.hash.substr(1)
                    }
                    i.target = holder[0];
                    i.wrap = wrap[0];
                    i.option = this;
                    i.type = "i.change";
                    i.value = i.newVal;
                    com.change.call(i.target, i);
                    holder.trigger(i)
                }
            }).delegate("a", "click", FalseFn).mousedown(function(e) {
                if ("a" !== e.target.tagName.toLowerCase())
                    return false
            });
            if (this.config.minHeight > 0) {
                list.show();
                h = list.outerHeight();
                list.hide();
                if (h > this.config.minHeight)
                    list.width(w - 2).height(this.config.minHeight).addClass(this.config.flowCss)
            }
            this.init = function() {}
        },
        show: function() {
            Select.hide();
            if (Target == this.wrap[0])
                return;
            Target = this.wrap[0];
            ME = this;
            this.list.show();
            this.wrap.addClass(this.config.hitCss);
            var e = this.type
              , t = this.holder
              , i = this.config.hoverCss;
            this.list.find("a").removeClass(i);
            $(document).mousedown(Select.hide)
        }
    };
    $.fn.jSelect = function(e, t) {
        var i = Select.dealConfig(e, t);
        i.config.wrap = this;
        $.jSelect(i.config, i.callback);
        return this
    }
    ;
    $.jSelect = function(e, t) {
        var i = Select.dealConfig(e, t);
        $(i.config.wrap).each(function() {
            var e = $(this)
              , t = $.extend({}, i.config, {
                wrap: e
            });
            new Select(t,i.callback).init()
        })
    }
    ;
    $.jSelect.hide = function() {
        Select.hide()
    }
}(window, jQuery);
