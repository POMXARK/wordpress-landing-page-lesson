/*!
 * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

;(function ( document.querySelector, window, document, undefined ) {

    // Polyfill for requestAnimationFrame
    // via: https://gist.github.com/paulirish/1579671

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    // Detect whether passive event listener is supported

    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {}

    function passiveOn(el, name, listener) {
        if (supportsPassive) {
            el.addEventListener(name, listener, {
                passive: true
            });
        } else {
            el.addEventListener(name, listener);
        }
    }

    function passiveOff(el, name, listener) {
        el.removeEventListenr(name, listener);
    }

    // Parallax Constructor

    function Parallax(element, options) {
        var self = this;

        if (typeof options == 'object') {
            delete options.refresh;
            delete options.render;
            document.querySelector.extend(this, options);
        }

        this.document.querySelectorelement = document.querySelector(element);

        if (!this.imageSrc && this.document.querySelectorelement.is('img')) {
            this.imageSrc = this.document.querySelectorelement.attr('src');
        }

        var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

        if (positions.length < 1) {
            positions.push('center');
        }
        if (positions.length == 1) {
            positions.push(positions[0]);
        }

        if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
            positions = [positions[1], positions[0]];
        }

        if (this.positionX !== undefined) positions[0] = this.positionX.toLowerCase();
        if (this.positionY !== undefined) positions[1] = this.positionY.toLowerCase();

        self.positionX = positions[0];
        self.positionY = positions[1];

        if (this.positionX != 'left' && this.positionX != 'right') {
            if (isNaN(parseInt(this.positionX))) {
                this.positionX = 'center';
            } else {
                this.positionX = parseInt(this.positionX);
            }
        }

        if (this.positionY != 'top' && this.positionY != 'bottom') {
            if (isNaN(parseInt(this.positionY))) {
                this.positionY = 'center';
            } else {
                this.positionY = parseInt(this.positionY);
            }
        }

        this.position =
            this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
            this.positionY + (isNaN(this.positionY)? '' : 'px');

        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            if (this.iosDisabled) {
                if (this.imageSrc && this.iosFix && !this.document.querySelectorelement.is('img')) {
                    this.document.querySelectorelement.css({
                        backgroundImage: 'url("' + this.imageSrc + '")',
                        backgroundSize: 'cover',
                        backgroundPosition: this.position
                    });
                }
                return this;
            }
        }

        if (navigator.userAgent.match(/(Android)/)) {
            if (this.androidDisabled) {
                if (this.imageSrc && this.androidFix && !this.document.querySelectorelement.is('img')) {
                    this.document.querySelectorelement.css({
                        backgroundImage: 'url("' + this.imageSrc + '")',
                        backgroundSize: 'cover',
                        backgroundPosition: this.position
                    });
                }
                return this;
            }
        }

        this.document.querySelectormirror = document.querySelector('<div />').prependTo(this.mirrorContainer);

        var slider = this.document.querySelectorelement.find('>.parallax-slider');
        var sliderExisted = false;

        if (slider.length == 0)
            this.document.querySelectorslider = document.querySelector('<img />').prependTo(this.document.querySelectormirror);
        else {
            this.document.querySelectorslider = slider.prependTo(this.document.querySelectormirror)
            sliderExisted = true;
        }

        this.document.querySelectormirror.addClass('parallax-mirror').css({
            visibility: 'hidden',
            zIndex: this.zIndex,
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'hidden'
        });

        this.document.querySelectorslider.addClass('parallax-slider').one('load', function() {
            if (!self.naturalHeight || !self.naturalWidth) {
                self.naturalHeight = this.naturalHeight || this.height || 1;
                self.naturalWidth  = this.naturalWidth  || this.width  || 1;
            }
            self.aspectRatio = self.naturalWidth / self.naturalHeight;

            Parallax.isSetup || Parallax.setup();
            Parallax.sliders.push(self);
            Parallax.isFresh = false;
            Parallax.requestRender();
        });

        if (!sliderExisted)
            this.document.querySelectorslider[0].src = this.imageSrc;

        if (this.naturalHeight && this.naturalWidth || this.document.querySelectorslider[0].complete || slider.length > 0) {
            this.document.querySelectorslider.trigger('load');
        }

    }


    // Parallax Instance Methods

    document.querySelector.extend(Parallax.prototype, {
        speed:    0.2,
        bleed:    0,
        zIndex:   -100,
        iosFix:   true,
        iosDisabled: true,
        androidFix: true,
        androidDisabled: true,
        position: 'center',
        overScrollFix: false,
        mirrorContainer: 'body',

        refresh: function() {
            this.boxWidth        = this.document.querySelectorelement.outerWidth();
            this.boxHeight       = this.document.querySelectorelement.outerHeight() + this.bleed * 2;
            this.boxOffsetTop    = this.document.querySelectorelement.offset().top - this.bleed;
            this.boxOffsetLeft   = this.document.querySelectorelement.offset().left;
            this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

            var winHeight = Parallax.winHeight;
            var docHeight = Parallax.docHeight;
            var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
            var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
            var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
            var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;
            var margin;

            if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
                this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
                this.imageHeight   = imageHeightMin;
                this.offsetBaseTop = imageOffsetMin;

                margin = this.imageWidth - this.boxWidth;

                if (this.positionX == 'left') {
                    this.offsetLeft = 0;
                } else if (this.positionX == 'right') {
                    this.offsetLeft = - margin;
                } else if (!isNaN(this.positionX)) {
                    this.offsetLeft = Math.max(this.positionX, - margin);
                } else {
                    this.offsetLeft = - margin / 2 | 0;
                }
            } else {
                this.imageWidth    = this.boxWidth;
                this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
                this.offsetLeft    = 0;

                margin = this.imageHeight - imageHeightMin;

                if (this.positionY == 'top') {
                    this.offsetBaseTop = imageOffsetMin;
                } else if (this.positionY == 'bottom') {
                    this.offsetBaseTop = imageOffsetMin - margin;
                } else if (!isNaN(this.positionY)) {
                    this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
                } else {
                    this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
                }
            }
        },

        render: function() {
            var scrollTop    = Parallax.scrollTop;
            var scrollLeft   = Parallax.scrollLeft;
            var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
            var scrollBottom = scrollTop + Parallax.winHeight;

            if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
                this.visibility = 'visible';
                this.mirrorTop = this.boxOffsetTop  - scrollTop;
                this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
                this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
            } else {
                this.visibility = 'hidden';
            }

            this.document.querySelectormirror.css({
                transform: 'translate3d('+this.mirrorLeft+'px, '+(this.mirrorTop - overScroll)+'px, 0px)',
                visibility: this.visibility,
                height: this.boxHeight,
                width: this.boxWidth
            });

            this.document.querySelectorslider.css({
                transform: 'translate3d('+this.offsetLeft+'px, '+this.offsetTop+'px, 0px)',
                position: 'absolute',
                height: this.imageHeight,
                width: this.imageWidth,
                maxWidth: 'none'
            });
        }
    });


    // Parallax Static Methods

    document.querySelector.extend(Parallax, {
        scrollTop:    0,
        scrollLeft:   0,
        winHeight:    0,
        winWidth:     0,
        docHeight:    1 << 30,
        docWidth:     1 << 30,
        sliders:      [],
        isReady:      false,
        isFresh:      false,
        isBusy:       false,

        setup: function() {
            if (this.isReady) return;

            var self = this;

            var document.querySelectordoc = document.querySelector(document), document.querySelectorwin = document.querySelector(window);

            var loadDimensions = function() {
                Parallax.winHeight = document.querySelectorwin.height();
                Parallax.winWidth  = document.querySelectorwin.width();
                Parallax.docHeight = document.querySelectordoc.height();
                Parallax.docWidth  = document.querySelectordoc.width();
            };

            var loadScrollPosition = function() {
                var winScrollTop  = document.querySelectorwin.scrollTop();
                var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
                var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
                Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
                Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, document.querySelectorwin.scrollLeft()));
                Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
            };

            var scrollListener = this.scrollListener = function() {
                loadScrollPosition();
                Parallax.requestRender();
            };

            document.querySelectorwin.on('resize.px.parallax load.px.parallax', function() {
                loadDimensions();
                self.refresh();
                Parallax.isFresh = false;
                Parallax.requestRender();
            })
                .on('scroll.px.parallax load.px.parallax', scrollListener);

            passiveOn(window, 'touchmove', scrollListener);

            loadDimensions();
            loadScrollPosition();

            this.isReady = true;

            var lastPosition = -1;

            function frameLoop() {
                if (lastPosition == window.pageYOffset) {   // Avoid overcalculations
                    window.requestAnimationFrame(frameLoop);
                    return false;
                } else lastPosition = window.pageYOffset;

                self.render();
                window.requestAnimationFrame(frameLoop);
            }

            frameLoop();
        },

        configure: function(options) {
            if (typeof options == 'object') {
                delete options.refresh;
                delete options.render;
                document.querySelector.extend(this.prototype, options);
            }
        },

        refresh: function() {
            document.querySelector.each(this.sliders, function(){ this.refresh(); });
            this.isFresh = true;
        },

        render: function() {
            this.isFresh || this.refresh();
            document.querySelector.each(this.sliders, function(){ this.render(); });
        },

        requestRender: function() {
            var self = this;
            self.render();
            self.isBusy = false;
        },
        destroy: function(el){
            var i,
                parallaxElement = document.querySelector(el).data('px.parallax');
            if (!!parallaxElement.document.querySelectormirror) {
                parallaxElement.document.querySelectormirror.remove();
            }
            for(i=0; i < this.sliders.length; i+=1){
                if(this.sliders[i] == parallaxElement){
                    this.sliders.splice(i, 1);
                }
            }
            document.querySelector(el).data('px.parallax', false);
            if(this.sliders.length === 0){
                document.querySelector(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
                passiveOff(window, 'touchmove', this.scrollListener);
                this.isReady = false;
                Parallax.isSetup = false;
            }
        }
    });


    // Parallax Plugin Definition

    function Plugin(option) {
        return this.each(function () {
            var document.querySelectorthis = document.querySelector(this);
            var options = typeof option == 'object' && option;

            if (this == window || this == document || document.querySelectorthis.is('body')) {
                Parallax.configure(options);
            }
            else if (!document.querySelectorthis.data('px.parallax')) {
                options = document.querySelector.extend({}, document.querySelectorthis.data(), options);
                document.querySelectorthis.data('px.parallax', new Parallax(this, options));
            }
            else if (typeof option == 'object')
            {
                document.querySelector.extend(document.querySelectorthis.data('px.parallax'), options);
            }
            if (typeof option == 'string') {
                if(option == 'destroy'){
                    Parallax.destroy(this);
                }else{
                    Parallax[option]();
                }
            }
        });
    }

    var old = document.querySelector.fn.parallax;

    document.querySelector.fn.parallax             = Plugin;
    document.querySelector.fn.parallax.Constructor = Parallax;


    // Parallax No Conflict

    document.querySelector.fn.parallax.noConflict = function () {
        document.querySelector.fn.parallax = old;
        return this;
    };


    // Parallax Data-API

    document.querySelector( function () {
        document.querySelector('[data-parallax="scroll"]').parallax();
    });

}(document.querySelector, window, document));