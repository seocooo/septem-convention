(function (window, $) {
  // 활성화시 사용될 클레스 명.
  const actived = "ng-active";

  // 초기 화면 (documnet가 최초 로드 후 동작될 ui component )
  const componentUI = {
    tabs: function () {
      const $tabs = $(this);
      const $tabNav = $tabs.find(">.ng_tabs-nav");
      const $tabList = $tabNav.find(">.ng_tabs-list");
      const $tabBtns = $tabNav.find(".ng_tabs-item");
      const $tabPanels = $tabNav.find("+.ng_tabs-container>.ng_tabs-panel");
      const $tabTarget = $tabList.get(0) ? $tabList : $tabBtns;
      const thisCurrentIndex = Math.max(
        $tabTarget.filter(`.${actived}`).index(),
        0
      );

      const tabClick = function (forced) {
        const currentIndex = $tabBtns.index(this);
        if (!$tabTarget.eq(currentIndex).hasClass(actived) || forced) {
          $tabTarget.removeClass(actived).eq(currentIndex).addClass(actived);
          $tabPanels.get(0) &&
            $tabPanels.removeClass(actived).eq(currentIndex).addClass(actived);
        }
        return false;
      };

      $tabBtns.off(".ng-tabs").on("click.ng-tabs", tabClick);
      $tabBtns.eq(thisCurrentIndex).trigger("click", true);
    },
  };

  const App = (function () {
    const _init = function () {
        window.addEventListener("DOMContentLoaded", this.welcome.bind(this));
        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener("scroll", this.scroll.bind(this));
        return this;
      },
      _hello = function () {
        // for(const properties in componentUI) {
        //     typeof componentUI[properties] == 'function' && componentUI[properties].apply(this);
        // }

        const $tabs = $(".ng_tabs");
        $tabs.each(componentUI.tabs);

        window.$App = this;
      },
      _scroll = function () {},
      _resize = function () {};
    return {
      init: _init,
      resize: _resize,
      scroll: _scroll,
      welcome: _hello,
    };
  })().init();
})(window, jQuery);

// 툴팁
$(function () {
  const bodyW = $(document.body).width();
  const tooltipCont = $(".tooltip .tooltip-cont");
  const tootipFull = $(".tooltip.js_tooltip-full .tooltip-cont");
  const tooltipW = Math.floor(bodyW / 2);
  const tooltipMargin = 40;

  tooltipCont.css("width", tooltipW + "px");
  tootipFull.css("width", bodyW - tooltipMargin + "px");
});

// 팝업
$(function () {
  $(".btn-modal").click(function () {
    const targetPopup = $(this).attr("aria-controls");
    $("#" + targetPopup)
      .show()
      .attr("aria-hidden", "false");
    // $("#popupDim").show();
  });

  $(".btn-close, .modal-dim").click(function () {
    $(".modal").hide().attr("aria-hidden", "true");
  });

  $(".modal").click(function (event) {
    event.stopPropagation(); // 팝업 내부를 클릭하면 닫히지 않도록 중지
  });
});
