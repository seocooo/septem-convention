;(function(win, $, undefined) {
    'use strict';

    const APP_NAME = 'core_ui';
    const core = window[APP_NAME] || {};

    core.$window = $(window);
    core.$html = $(document.documentElement);
    core.$documnet = $(document);

    const initalize = function() {
        console.log('@@ initalize @@');
    };

    const detech = (function() {
        const ua = navigator.userAgent;
        const detechBrowser = {
            touch  = !!("ontouchstart" in window),
            mobile = !!("orientation" in window),
            retina = !!("devicePixelRatio" in window && window.devicePixelRatio > 1),
            webkit = /\b(iPad|iPhone|iPod)\b/.test(ua) && /WebKit/.test(ua) && !/Edge/.test(ua) && !window.MSStream;
        };
        
        return detechBrowser;
    })();

    
    initalize();
})(window, jQuery)