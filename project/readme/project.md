# 프로젝트 참고 자료

## 1. 자주 쓰는 네이밍 규칙 만들기

1. 예시

   ```css
   .modal {
   }
   .modal-inner {
   }
   .modal-araa {
   }
   .modal-header {
   }
   .modal-title {
   }
   .modal-desc {
   }
   .modal-container {
   }
   .modal-content-title {
   }
   .modal-content-desc {
   }
   .modal-content {
   }
   .modal-footer {
   }
   .modal-btn-wrap {
   }
   ```

   ### 1.1 하위뎁스 사용시

   `-inner`, `-wrap`, `-area`, `-header`, `-container`, `-content`, `-footer`,
   `-group`, `-item`, `-list`, `-box`, `-sub`, `-side`, `-title`, `-desc`, `-cell`
   `-info`, `-data`, `-link`, `-label`, `-unit`

   ***

   ### 1.2 속상 값 적용시

   ```css
   // st - Style Type
   .table {
   }
   .table.st_borderless {
   }
   .table.st_striped {
   }

   .text-list {
   }
   .text-list.st_dot {
   }
   .text-list.st_dash {
   }

   // cs - Change Status
   .modal.cs_show {
   }
   .radio.cs_active {
   }
   .input.cs_disabled {
   }

   // css animation
   .modal.ani_fade-in {
   }
   .modal.ani_slidedown {
   }

   // js control
   .btn.js_btn-modal {
   }
   .btn.js_btn-modal-close {
   }
   .accodien.js_accordion {
   }
   .accodien.js_accordion {
   }
   ```

   > 가급적 접두어를 붙여 상황에 맞는 값을 적용한다.
   >
   > 1. `st_[name]` : name 부분에는 번호가 아닌 의미있는 값을 적용한다.
   > 2. `cs_[value]` : 변경되는 상태값을 의미한다.

   ***

   ### 1.3 별도 속성 값 적용시

   ```
   .ta-center {}
   .bg-primary {}
   .c-primary {}
   .dp-flex {}
   ```

   > `emmet` 을 이용한 약어 사용으로 추가 속성을 지정한다.
   > `bg-primary`, `ta-center`, `c-primary`, `dp-flex`
