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
      if ($modalId.hasClass("st_bottom-sheet") === true) {
        // console.log("bottom-sheet");
        $modalId.find(".modal-inner").css("bottom", "0%");
      }
    })
    .attr("aria-hidden", "false");
  $("body").css("overflow", "hidden");
}
function closeModal(modalID) {
  // 이미 #이 있는지 확인 후 처리
  if (!modalID.startsWith("#")) {
    modalID = "#" + modalID;
  }

  const $modalId = $(modalID);
  if ($modalId.hasClass("st_bottom-sheet") === true) {
    $modalId.find(".modal-inner").css("bottom", "-100%");
  }
  $modalId.fadeOut().attr("aria-hidden", "true");
  $("body").css("overflow", "");
}

// 모달 셀렉트
$(function () {
  $(".modal-select-item a").on("click", function () {
    const $selectedItem = $(this).closest(".modal-select-item");
    const selectedText = $selectedItem.text();

    $selectedItem.addClass("cs_active").siblings().removeClass("cs_active");

    const $modal = $(this).closest(".modal");
    closeModal($modal.attr("id"));

    const $formSelect = $modal.prev(".form-group").find(".form-select");
    $formSelect.text(selectedText).val(selectedText);
  });
});

// 아코디언
$(function () {
  const $accordionItems = $(".accordion-item");

  $accordionItems.each(function () {
    const $accordionBtn = $(this).find(".js_accordion-btn");
    const $accordionCollapse = $(this).find(".accordion-collapse");
    const $accordionWrapBtn = $(this).find(
      ".accordion-btn-wrap .js_accordion-btn"
    );

    $accordionBtn.on("click", function () {
      const isCollapsed = $accordionBtn.hasClass("cs_collapsed");

      if (isCollapsed) {
        $accordionBtn.removeClass("cs_collapsed");
        $accordionBtn.attr("aria-expanded", "true");
        $accordionWrapBtn.text("상세닫기");
      } else {
        $accordionBtn.addClass("cs_collapsed");
        $accordionBtn.attr("aria-expanded", "false");
        $accordionWrapBtn.text("상세보기");
      }

      $accordionCollapse.toggleClass("cs_show", isCollapsed);
    });
  });
});

// 탭
$(function () {
  $(".tab-item").on("click", function () {
    const $clickedTab = $(this);
    const panelId = $clickedTab.attr("aria-controls");

    $clickedTab
      .addClass("cs_active")
      .attr("aria-selected", "true")
      .parent()
      .siblings()
      .find(".tab-item")
      .removeClass("cs_active")
      .attr("aria-selected", "false");

    $("#" + panelId)
      .addClass("cs_active")
      .siblings(".tab-panel")
      .removeClass("cs_active");
  });
});

//스크롤 스파이
$(function () {
  //가이드 헤더크기로 잡혀있음 차후 수정 필요
  const $headerHeight = $(".ng_header-inner").outerHeight();
  const $thisTop = $(".scrollspy-nav").offset().top;
  const $spyItem = $(".scrollspy-nav .nav-item");
  $(window).on("scroll", function () {
    const $scrollTop = $("html, body").scrollTop();
    const $scrollMove = $thisTop - $headerHeight;
    const $contHeight = $(".scrollspy-cont").outerHeight();
    const $scrollMoveEnd = $scrollMove + $contHeight;
    if ($scrollTop > $scrollMove && $scrollTop <= $scrollMoveEnd) {
      $(".scrollspy-nav").addClass("st-sticky");
    } else {
      $(".scrollspy-nav").removeClass("st-sticky");
    }
  });

  $spyItem.focus(function () {
    var $this = $(this);
    var $thisPosLeft = $this.position().left;
    // console.log($thisPosLeft);
    $(".scrollspy-nav")
      .stop()
      .animate({ scrollLeft: $thisPosLeft }, 400, function () {});
  });

  $spyItem.on("click", function () {
    const $thisBtn = $(this);
    const $thisAttrMenu = $thisBtn.attr("anchor-title");
    const $scrollspy = $thisBtn.closest(".scrollspy"); // closest(".scrollspy")를 사용하여 현재 메뉴의 부모 요소를 찾습니다.
    const $contList = $scrollspy.find(".cont-list"); // 해당 스크롤 스파이 컨테이너 내에서 컨텐츠 리스트를 찾습니다.

    $contList.each(function () {
      const $cont = $(this);
      const $thisAttrCont = $cont.attr("anchor-cont");

      if ($thisAttrCont === $thisAttrMenu) {
        const $thisOffSet = $cont.offset().top;

        $("html, body")
          .stop()
          .animate(
            { scrollTop: $thisOffSet - $headerHeight - 36 },
            400,
            function () {
              $(".scrollspy-nav .nav-item")
                .removeClass("cs_active")
                .attr("aria-selected", "false");
              $thisBtn.addClass("cs_active").attr("aria-selected", "true");
              $cont.find(".cont-header").focus();
            }
          );
      }
    });
  });
});
