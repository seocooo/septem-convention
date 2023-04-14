;(function(window, $) {

    // 활성화시 사용될 클레스 명.
    const actived = 'ng-active';

    // 초기 화면 (documnet가 최초 로드 후 동작될 ui component )
    const componentUI = {
        tabs: function () {
            const $tabs = $(this);
            const $tabNav = $tabs.find('>.ng_tabs-nav');
            const $tabList = $tabNav.find('>.ng_tabs-list');
            const $tabBtns = $tabNav.find('.ng_tabs-item');
            const $tabPanels = $tabNav.find('+.ng_tabs-container>.ng_tabs-panel');
            const $tabTarget = $tabList.get(0) ? $tabList : $tabBtns;
            const thisCurrentIndex = Math.max($tabTarget.filter(`.${actived}`).index(), 0);

            const tabClick = function(forced) {
                const currentIndex = $tabBtns.index(this);
                if ( !$tabTarget.eq(currentIndex).hasClass(actived) || forced ) {
                    $tabTarget.removeClass(actived).eq(currentIndex).addClass(actived);
                    $tabPanels.get(0) && $tabPanels.removeClass(actived).eq(currentIndex).addClass(actived);
                }
                return false;
            };

            $tabBtns.off('.ng-tabs').on('click.ng-tabs', tabClick);
            $tabBtns.eq(thisCurrentIndex).trigger('click', true);
        }
    };

    const App = (function() {
        const _init = function() {
            window.addEventListener('DOMContentLoaded', this.welcome.bind(this));
            window.addEventListener('resize', this.resize.bind(this));
            window.addEventListener('scroll', this.scroll.bind(this));
            return this;
        },
        _hello = function() {
            // for(const properties in componentUI) {
            //     typeof componentUI[properties] == 'function' && componentUI[properties].apply(this);
            // }

            const $tabs = $('.ng_tabs');
            $tabs.each(componentUI.tabs);

            window.$App = this;
        },
        _scroll = function() {

        },
        _resize = function() {

        }
        ;

        return {
            init: _init,
            resize: _resize,
            scroll: _scroll,
            welcome: _hello
        }
    })().init();
})(window, jQuery);
