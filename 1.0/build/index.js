/*
combined files : 

gallery/floatNotify/1.0/index

*/
/**
 * @fileoverview 
 * @author 夕剑<xijian.py@taobao.com>
 * @module floatNotify
 **/
KISSY.add('gallery/floatNotify/1.0/index',function (S,Base) {
    var EMPTY = '';
    var $ = Node.all;
    var win = window;

    var doc = win.document,
        body = doc.body,
        E_float, E_floatMsg, E_floatContent, E_floatOk, E_floatCancel,
        initDom = false,
        flashTimeoutId;

    E_float = doc.createElement('div');
    E_float.className = 'c-float-popWrap msgMode hide';
    E_float.innerHTML = ['<div class="c-float-modePop">',
        '<div class="warnMsg"></div>',
        '<div class="content"></div>',
        '<div class="doBtn">',
        '<button class="ok">确定</button>',
        '<button class="cancel">取消</button>',
        '</div>',
        '</div>'].join('');

    E_floatMsg = E_float.querySelector('.warnMsg');
    E_floatContent = E_float.querySelector('.content');
    E_floatOk = E_float.querySelector('.doBtn .ok');
    E_floatCancel = E_float.querySelector('.doBtn .cancel');

    function _extend(a, b) {
        for (var k in b) {
            a[k] = b[k];
        }
        return a;
    }

    function successHandler(e) {
        this.callback && this.callback(e, true);
    }

    function failureHandler(e) {
        this.callback && this.callback(e, false);
    }
    /**
     * 
     * @class FloatNotify
     * @constructor
     * @extends Base
     */
    function FloatNotify(comConfig) {
        var self = this;
        //调用父类构造函数
        FloatNotify.superclass.constructor.call(self, comConfig);
        this._options = _extend({
            mode : 'msg',
            text : '网页提示',
            useTap : false
        }, comConfig || {});
        self.init();
    }
    S.extend(FloatNotify, Base, /** @lends FloatNotify.prototype*/{
        init:function(){
            var that = this,
                opt = that._options,
                mode = opt.mode,
                text = opt.text,
                content = opt.content,
                callback = opt.callback,
                background = opt.background,
                clickEvent = opt.useTap ? 'touchend' : 'click'
                ;

            // set mode
            var classTxt = E_float.className;
            classTxt = classTxt.replace(/(msg|alert|confirm)Mode/i, mode + 'Mode');
            E_float.className = classTxt;

            // set background
            background && (E_float.style.background = background);

            // set text & content
            text && (E_floatMsg.innerHTML = text);
            content && (E_floatContent.innerHTML = content);

            // click event
            E_floatOk.removeEventListener('touchend', successHandler);
            E_floatOk.removeEventListener('click', successHandler);
            E_floatCancel.removeEventListener('touchend', successHandler);
            E_floatCancel.removeEventListener('click', successHandler);
            E_floatOk.addEventListener(clickEvent, successHandler, false);
            E_floatCancel.addEventListener(clickEvent, failureHandler, false);
            E_floatOk.callback = E_floatCancel.callback = function() {
                callback.apply(that, arguments);
            };

            if (!initDom) {
                initDom = true;
                doc.body.appendChild(E_float);
                win.addEventListener('resize', function() {
                    setTimeout(function() {
                        that._pos();
                    }, 500);
                }, false);
            }

        },
        _pos : function() {
            var that = this,
                top, left, iW, iH, rect, eW, eH
                ;

            if (!that.isHide()) {
                top = body.scrollTop;
                left = body.scrollLeft;
                iW = win.innerWidth;
                iH = win.innerHeight;
                rect = E_float.getBoundingClientRect();
                eW = rect.width;
                eH = rect.height;

                E_float.style.top = (top + (iH - eH) / 2) + 'px';
                E_float.style.left = (left + (iW - eW) / 2) + 'px';
            }
        },

        isShow : function() {
            return E_float.className.indexOf('show') > -1;
        },

        isHide : function() {
            return E_float.className.indexOf('hide') > -1;
        },

        _cbShow : function() {
            var that = this,
                opt = that._options,
                onShow = opt.onShow
                ;

            E_float.style.opacity = '1';
            E_float.className += ' show';
            onShow && onShow.call(that);
        },

        show : function() {
            var that = this
                ;

            if (flashTimeoutId) {
                clearTimeout(flashTimeoutId);
                flashTimeoutId = undefined;
            }

            if (!that.isShow()) {

                E_float.style.opacity = '0';
                E_float.className = E_float.className.replace('hide', '');
                that._pos();

                setTimeout(function() {
                    that._cbShow();
                }, 300);
                setTimeout(function() {
                    E_float.style.webkitTransition = 'opacity 0.4s linear 0';
                    E_float.style.opacity = '1';
                    //E_float.animate({'opacity': '1'}, 300, 'linear');
                }, 1);

            } else {
                that._cbShow();
            }
        },

        _cbHide : function() {
            var that = this,
                opt = that._options,
                onHide = opt.onHide
                ;

            E_float.style.opacity = '0';
            E_float.className += ' hide';
            onHide && onHide.call(that);
        },

        hide : function() {
            var that = this;

            if (!that.isHide()) {
                E_float.style.opacity = '1';
                E_float.className = E_float.className.replace('show', '');

                setTimeout(function() {
                    that._cbHide();
                }, 300);
                setTimeout(function() {
                    E_float.style.webkitTransition = 'opacity 0.4s linear 0';
                    E_float.style.opacity = '0';
                }, 1);

            } else {
                that._cbHide();
            }
        },

        flash : function(timeout) {
            var that = this
            opt = that._options
            ;

            opt.onShow = function() {
                flashTimeoutId = setTimeout(function() {
                    if (flashTimeoutId) {
                        that.hide();
                    }
                }, timeout);
            }

            that.show();
        }

    }, {ATTRS : /** @lends FloatNotify*/{

    }});

    window.floatNotify = new function() {

        this.simple = function(text, bg, timeout) {
            if (arguments.length == 2) {
                if (typeof arguments[1] == 'number') {
                    timeout = arguments[1];
                    bg = undefined;
                }
            }

            var pop = new FloatNotify({
                mode : 'msg',
                text : text,
                background : bg
            });

            pop.flash(timeout || 2000);
            return pop;
        }

        this.msg = function(text, options) {
            return new FloatNotify(_extend({
                mode : 'msg',
                text : text
            }, options || {}));
        }

        this.alert = function(text, callback, options) {
            return new FloatNotify(_extend({
                mode : 'alert',
                text : text,
                callback : callback
            }, options || {}));
        }

        this.confirm = function(text, content, callback, options) {
            return new FloatNotify(_extend({
                mode : 'confirm',
                text : text,
                content : content,
                callback : callback
            }, options || {}));
        }

        this.pop = function(options) {
            return new FloatNotify(options);
        }

    };
    return FloatNotify;
}, {requires:['base','./index.css']});




