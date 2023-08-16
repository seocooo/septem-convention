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
  $(".js_modal-open").on("click", function (e) {
    e.preventDefault();
    const targetModalId = $(this).attr("href") || $(this).data("modal");
    openModal(targetModalId);
  });
  $(".modal .js_modal-close, .modal-dim").on("click", function () {
    closeModal($(this).closest(".modal").attr("id"));
  });

  $(".modal").on("keydown", function (event) {
    if (event.key === "Escape") {
      const modalID = $(this).attr("id");
      closeModal(modalID);
    }
  });
});

function openModal(modalID) {
  // 이미 #이 있는지 확인 후 처리
  if (!modalID.startsWith("#")) {
    modalID = "#" + modalID;
  }

  const $modalId = $(modalID);
  $modalId
    .fadeIn(function () {
      const modalTitle = $modalId.find(".modal-title");
      modalTitle.attr("tabindex", -1).focus();
      //   if ($modalId.hasClass("st_bottom-sheet") === true) {
      //     console.log("bottom-sheet");
      //     const innerHeight = $modalId.find(".modal-inner").outerHeight();
      //     $modalId.find(".modal-inner").css("bottom", "-" + innerHeight + "px");
      //   }
    })
    .attr("aria-hidden", "false");
  $("body").css("overflow", "hidden");
}
function closeModal(modalID) {
  // 이미 #이 있는지 확인 후 처리
  if (!modalID.startsWith("#")) {
    modalID = "#" + modalID;
  }
  $(modalID).fadeOut().attr("aria-hidden", "true");
  $("body").css("overflow", "");
}

// 아코디안
