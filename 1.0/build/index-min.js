/*!build time : 2013-11-06 3:03:35 PM*/
KISSY.add("gallery/floatNotify/1.0/index",function(a,b){function c(a,b){for(var c in b)a[c]=b[c];return a}function d(a){this.callback&&this.callback(a,!0)}function e(a){this.callback&&this.callback(a,!1)}function f(a){var b=this;f.superclass.constructor.call(b,a),this._options=c({mode:"msg",text:"\u7f51\u9875\u63d0\u793a",useTap:!1},a||{}),b.init()}Node.all;var g,h,i,j,k,l,m=window,n=m.document,o=n.body,p=!1;return g=n.createElement("div"),g.className="c-float-popWrap msgMode hide",g.innerHTML=['<div class="c-float-modePop">','<div class="warnMsg"></div>','<div class="content"></div>','<div class="doBtn">','<button class="ok">\u786e\u5b9a</button>','<button class="cancel">\u53d6\u6d88</button>',"</div>","</div>"].join(""),h=g.querySelector(".warnMsg"),i=g.querySelector(".content"),j=g.querySelector(".doBtn .ok"),k=g.querySelector(".doBtn .cancel"),a.extend(f,b,{init:function(){var a=this,b=a._options,c=b.mode,f=b.text,l=b.content,o=b.callback,q=b.background,r=b.useTap?"touchend":"click",s=g.className;s=s.replace(/(msg|alert|confirm)Mode/i,c+"Mode"),g.className=s,q&&(g.style.background=q),f&&(h.innerHTML=f),l&&(i.innerHTML=l),j.removeEventListener("touchend",d),j.removeEventListener("click",d),k.removeEventListener("touchend",d),k.removeEventListener("click",d),j.addEventListener(r,d,!1),k.addEventListener(r,e,!1),j.callback=k.callback=function(){o.apply(a,arguments)},p||(p=!0,n.body.appendChild(g),m.addEventListener("resize",function(){setTimeout(function(){a._pos()},500)},!1))},_pos:function(){var a,b,c,d,e,f,h,i=this;i.isHide()||(a=o.scrollTop,b=o.scrollLeft,c=m.innerWidth,d=m.innerHeight,e=g.getBoundingClientRect(),f=e.width,h=e.height,g.style.top=a+(d-h)/2+"px",g.style.left=b+(c-f)/2+"px")},isShow:function(){return g.className.indexOf("show")>-1},isHide:function(){return g.className.indexOf("hide")>-1},_cbShow:function(){var a=this,b=a._options,c=b.onShow;g.style.opacity="1",g.className+=" show",c&&c.call(a)},show:function(){var a=this;l&&(clearTimeout(l),l=void 0),a.isShow()?a._cbShow():(g.style.opacity="0",g.className=g.className.replace("hide",""),a._pos(),setTimeout(function(){a._cbShow()},300),setTimeout(function(){g.style.webkitTransition="opacity 0.4s linear 0",g.style.opacity="1"},1))},_cbHide:function(){var a=this,b=a._options,c=b.onHide;g.style.opacity="0",g.className+=" hide",c&&c.call(a)},hide:function(){var a=this;a.isHide()?a._cbHide():(g.style.opacity="1",g.className=g.className.replace("show",""),setTimeout(function(){a._cbHide()},300),setTimeout(function(){g.style.webkitTransition="opacity 0.4s linear 0",g.style.opacity="0"},1))},flash:function(a){var b=this;opt=b._options,opt.onShow=function(){l=setTimeout(function(){l&&b.hide()},a)},b.show()}},{ATTRS:{}}),window.floatNotify=new function(){this.simple=function(a,b,c){2==arguments.length&&"number"==typeof arguments[1]&&(c=arguments[1],b=void 0);var d=new f({mode:"msg",text:a,background:b});return d.flash(c||2e3),d},this.msg=function(a,b){return new f(c({mode:"msg",text:a},b||{}))},this.alert=function(a,b,d){return new f(c({mode:"alert",text:a,callback:b},d||{}))},this.confirm=function(a,b,d,e){return new f(c({mode:"confirm",text:a,content:b,callback:d},e||{}))},this.pop=function(a){return new f(a)}},f},{requires:["base","./index.css"]});