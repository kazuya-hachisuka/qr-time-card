function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}).apply(this,arguments)}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var Carousel=function(g){var p="carousel",A="4.0.0",C="bs.carousel",y="."+C,e=".data-api",t=g.fn[p],D=600,S=37,V=39,b=500,x={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},P={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},L={NEXT:"next",PREV:"prev",LEFT:"left",RIGHT:"right"},N={SLIDE:"slide"+y,SLID:"slid"+y,KEYDOWN:"keydown"+y,MOUSEENTER:"mouseenter"+y,MOUSELEAVE:"mouseleave"+y,TOUCHEND:"touchend"+y,LOAD_DATA_API:"load"+y+e,CLICK_DATA_API:"click"+y+e},R={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"carousel-item-right",LEFT:"carousel-item-left",NEXT:"carousel-item-next",PREV:"carousel-item-prev",ITEM:"carousel-item"},O={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},i=function(){function r(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(t),this._element=g(e)[0],this._indicatorsElement=g(this._element).find(O.INDICATORS)[0],this._addEventListeners()}var e=r.prototype;return e.next=function t(){this._isSliding||this._slide(L.NEXT)},e.nextWhenVisible=function i(){!document.hidden&&g(this._element).is(":visible")&&"hidden"!==g(this._element).css("visibility")&&this.next()},e.prev=function n(){this._isSliding||this._slide(L.PREV)},e.pause=function s(e){e||(this._isPaused=!0),g(this._element).find(O.NEXT_PREV)[0]&&Util.supportsTransitionEnd()&&(Util.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function a(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function l(e){var t=this;this._activeElement=g(this._element).find(O.ACTIVE_ITEM)[0];var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)g(this._element).one(N.SLID,function(){return t.to(e)});else{if(i===e)return this.pause(),void this.cycle();var n=i<e?L.NEXT:L.PREV;this._slide(n,this._items[e])}},e.dispose=function o(){g(this._element).off(y),g.removeData(this._element,C),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function u(e){return e=_extends({},x,e),Util.typeCheckConfig(p,e,P),e},e._addEventListeners=function h(){var t=this;this._config.keyboard&&g(this._element).on(N.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&(g(this._element).on(N.MOUSEENTER,function(e){return t.pause(e)}).on(N.MOUSELEAVE,function(e){return t.cycle(e)}),"ontouchstart"in document.documentElement&&g(this._element).on(N.TOUCHEND,function(){t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},b+t._config.interval)}))},e._keydown=function c(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case S:e.preventDefault(),this.prev();break;case V:e.preventDefault(),this.next()}},e._getItemIndex=function _(e){return this._items=g.makeArray(g(e).parent().find(O.ITEM)),this._items.indexOf(e)},e._getItemByDirection=function d(e,t){var i=e===L.NEXT,n=e===L.PREV,s=this._getItemIndex(t),r=this._items.length-1;if((n&&0===s||i&&s===r)&&!this._config.wrap)return t;var a=(s+(e===L.PREV?-1:1))%this._items.length;return-1===a?this._items[this._items.length-1]:this._items[a]},e._triggerSlideEvent=function f(e,t){var i=this._getItemIndex(e),n=this._getItemIndex(g(this._element).find(O.ACTIVE_ITEM)[0]),s=g.Event(N.SLIDE,{relatedTarget:e,direction:t,from:n,to:i});return g(this._element).trigger(s),s},e._setActiveIndicatorElement=function E(e){if(this._indicatorsElement){g(this._indicatorsElement).find(O.ACTIVE).removeClass(R.ACTIVE);var t=this._indicatorsElement.children[this._getItemIndex(e)];t&&g(t).addClass(R.ACTIVE)}},e._slide=function m(e,t){var i,n,s,r=this,a=g(this._element).find(O.ACTIVE_ITEM)[0],l=this._getItemIndex(a),o=t||a&&this._getItemByDirection(e,a),u=this._getItemIndex(o),h=Boolean(this._interval);if(e===L.NEXT?(i=R.LEFT,n=R.NEXT,s=L.LEFT):(i=R.RIGHT,n=R.PREV,s=L.RIGHT),o&&g(o).hasClass(R.ACTIVE))this._isSliding=!1;else if(!this._triggerSlideEvent(o,s).isDefaultPrevented()&&a&&o){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(o);var c=g.Event(N.SLID,{relatedTarget:o,direction:s,from:l,to:u});Util.supportsTransitionEnd()&&g(this._element).hasClass(R.SLIDE)?(g(o).addClass(n),Util.reflow(o),g(a).addClass(i),g(o).addClass(i),g(a).one(Util.TRANSITION_END,function(){g(o).removeClass(i+" "+n).addClass(R.ACTIVE),g(a).removeClass(R.ACTIVE+" "+n+" "+i),r._isSliding=!1,setTimeout(function(){return g(r._element).trigger(c)},0)}).emulateTransitionEnd(D)):(g(a).removeClass(R.ACTIVE),g(o).addClass(R.ACTIVE),this._isSliding=!1,g(this._element).trigger(c)),h&&this.cycle()}},r._jQueryInterface=function v(n){return this.each(function(){var e=g(this).data(C),t=_extends({},x,g(this).data());"object"==typeof n&&(t=_extends({},t,n));var i="string"==typeof n?n:t.slide;if(e||(e=new r(this,t),g(this).data(C,e)),"number"==typeof n)e.to(n);else if("string"==typeof i){if("undefined"==typeof e[i])throw new TypeError('No method named "'+i+'"');e[i]()}else t.interval&&(e.pause(),e.cycle())})},r._dataApiClickHandler=function I(e){var t=Util.getSelectorFromElement(this);if(t){var i=g(t)[0];if(i&&g(i).hasClass(R.CAROUSEL)){var n=_extends({},g(i).data(),g(this).data()),s=this.getAttribute("data-slide-to");s&&(n.interval=!1),r._jQueryInterface.call(g(i),n),s&&g(i).data(C).to(s),e.preventDefault()}}},_createClass(r,null,[{key:"VERSION",get:function T(){return A}},{key:"Default",get:function T(){return x}}]),r}();return g(document).on(N.CLICK_DATA_API,O.DATA_SLIDE,i._dataApiClickHandler),g(window).on(N.LOAD_DATA_API,function(){g(O.DATA_RIDE).each(function(){var e=g(this);i._jQueryInterface.call(e,e.data())})}),g.fn[p]=i._jQueryInterface,g.fn[p].Constructor=i,g.fn[p].noConflict=function(){return g.fn[p]=t,i._jQueryInterface},i}($);