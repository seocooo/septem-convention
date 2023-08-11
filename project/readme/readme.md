# 셉템 코딩 컨벤션

셉템 코딩 컨벤션은 유연하고 지속 가능한 코드 작성을 위한 사내 표준입니다
[Code Guide by @mdo](http://mdo.github.io/code-guide)를 기반으로 상식적인 내용과 장황한 내용은 제거했으며 팀에서 논의한 내용을 추가했습니다.

---

1. [기본 규칙](#basic)
2. [에디터 설정](#editor)
3. [파일 구조](#file)
4. [CSS](#css)
   1. [파일명](#css-file)
   2. [CSS 문법](#css-syntax)
   3. [클래스 작명](#css-naming)
   4. [속성(property) 선언 순서](#css-property-order)
   5. [전처리문 중첩](#css-preprocessor-nesting)
5. [HTML](#html)
   1. [HTML 문법](#html-syntax)
   2. [HTML5 doctype](#html-doctype)
   3. [언어(lang) 속성](#html-lang)
   4. [인코딩 설정](#html-charset)
   5. [IE 호환모드 설정](#html-ie-compatible)
   6. [CSS, JavaScript 삽입](#html-type-attr)
   7. [속성(attr) 선언 순서](#html-attr-order)
   8. [Boolean 속성](#html-boolean-attr)
   9. [마크업 간소화](#html-simplification)
   10. [문서 개요(HTML5 아웃라인)](#html-outline)
6. [이미지](#image)
   1. [이미지 네이밍](#image-naming)
   2. [공통 이미지](#image-comm)

## 기본 규칙 <a id="basic" href="#basic">#</a>

## 시작 전 세팅 <a id="editor" href="#editor">#</a>

- 공통 작업프로그램은 visual studio code(VSCode)을 사용합니다.
- 현재 파일인 reademe.md를 준수하여 작업합니다.
  - vscode에서 해당 파일을 열고 오른쪽 위 아이콘을 클릭하면 볼 수 있다.![](assets/2023-03-30-14-51-04.png)
- 확장프로그램
  - Autoprefixer : Autoprefixer 자동 추가
  - CSScomb : CSS 규칙 정의
  - PostCSS Sorting : CSS 규칙 정의
  - Sorting HTML and Jade attributes : HTML 규칙 정의
- 설정파일(SVC관리)
  - 프로젝트폴더 &gt; project &gt; .vscode &gt; settings.json (or)
  - 프로젝트폴더 &gt; .vscode &gt; settings.json
- 들여쓰기는 공백문자 2개로 합니다.
- 파일 저장 시 UTF-8 인코딩으로 저장합니다.

---

## 파일 구조 <a id="file" href="#file">#</a>

- `pub`폴더는 퍼블사이트용으로 검증서버나 운영서버에 이관하지 않습니다.
- `com`폴더와 `sample`폴더는 공통이므로 작업자가 수정하지 않습니다. 수정시 모든 프로젝트에 공유합니다.

```
project
├─ .vscode
│  └─ settings.json
├─ css
│  ├─ a_prj_comm.css
│  ├─ a_prj_comp.css
│  ├─ a_prj_cont.css
│  ├─ a_prj_layout.css
│  ├─ a_prj_main.css
│  ├─ a_prj_reset.css
│  └─ a_prj_var.css
├─ font
│  ├─ Noto_Sans_KR
│  └─ Roboto
├─ html
├─ img
├─ js
│  ├─ anime-3.2.1.min.js
│  └─ jquery-3.6.4.min.js
├─ pub
│  ├─ id //프로젝트별 화면 ID를 딴 작업 폴더
│  ├─ com
│  │  ├─ css
│  │  ├─ font
│  │  └─ img
│  ├─ sample
│  │  ├─ com_sample.html
│  │  └─ prj_sample.html
│  ├─ pubGuide.html
│  └─ pubList.html
└─ readme.md
```

---

## CSS <a id="css" href="#css">#</a>

> npm은 적응에 시간이 많이 필요하고, sass는 버전별 문법 변화가 잦기에 CSS 변수 기능 활용하여 사용합니다.

### 파일명 <a id="css-file" href="#css-file">#</a>

파일명 예시 : `a_prj_comm_v2.css`

- 하이브리드 앱의 경우 `a_`, PC웹일 경우 `i_`, 모바일웹일 경우`m_`을 파일명 앞에 붙여 구분합니다.
- 현재까지 명칭된 프로젝트명은 아래와 같습니다.
  - 스마트뱅킹 : sbz
  - 금융상품몰 : mbk(은행)/msh(상호)
- 필수 나눠야할 CSS는 아래와 같으며, 추가 분리는 채널별로 상의하여 결정합니다.
  - reset
  - var
  - layout //header, footer, nav 등을 포함합니다.
  - comp //tab, button, input, list 등을 포함합니다.
  - main //메인화면을 포함하며 메인화면에서만 호출합니다.
  - comm
  - cont //기타 모든 css
  - 금융상품몰
    - list //상품 리스트를 포함하며 그곳에서만 호출합니다.
    - prod //상품 상세 애니메이션 스타일을 포함 그곳에서만 호출합니다.

### CSS 문법 <a id="css-syntax" href="#css-syntax">#</a>

속성은 줄바꿈을 하지 않습니다. 마지막은 항상 세미콜론(`;`)으로 끝냅니다.
속성은 공백을 포함하지 않습니다.

```css
/* O */
.selector {
  property: value;
}
```

선택자를 그룹핑하는 경우 쉼표(`,`)를 사용하고 띄어쓰기 없이 한줄로 작성한다.

```css
/* X */
.selector1,
.selector2 {
  ...;
}
.selector1,
.selector2 {
  ...;
}
/* O */
.selector1,
.selector2 {
  ...;
}
```

속성값에는 홑따옴표(`''`)를 사용합니다.

```css
/* O: 속성 선택자 속성값에 홑따옴표 사용 */
[type="text"] {
  ...;
}

/* O: CSS 속성값에 홑따옴표 사용 */
 {
  background: url("ex.png");
}
```

괄호(`()`) 안에서는 쉼표(`,`) 뒤에 공백을 넣는다.

```css
/* X */
color: rgba(0, 0, 0, 0.5);

/* O */
color: rgba(0, 0, 0, 0.5);
```

축약 가능한 값을 축약합니다.

```css
/* X */
color: #ffffff;
font-weight: normal;
font-weight: bold;
border: none;
opacity: 0.5;
border-width: 0px;
background-size: 100% auto;
background-position: 50% 50%;

/* O */
color: #fff;
font-weight: 400;
font-weight: 700;
border: 0;
opacity: 0.5;
border-width: 0;
background-size: 100%;
background-position: 50%;
```

### 클래스 작명 <a id="css-naming" href="#css-naming">#</a>

- 클래스 이름은 `영문, 숫자, 대시(-)`로만 구성하며 동작이 추가될 경우 언더스코어(\_)를 사용합니다.
- 스크립트 기능이 들어간 클래스의 경우 `js_`를 사용하며 해당 클래스는 스타일을 적용하지 않습니다.
- 스타일 추가 시`st_`를 추가합니다. ex) `st_`
- 상태를 정의할때는`cs_`를 추가합니다. ex) `cs_active`

  ### 1 예시

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
  > 1.  `st_[name]` : name 부분에는 번호가 아닌 의미있는 값을 적용한다.
  > 2.  `cs_[value]` : 변경되는 상태값을 의미한다.

  ### 1.3 별도 속성 값 적용시

  ```
  .ta-center {}
  .bg-primary {}
  .c-primary {}
  .dp-flex {}
  ```

  > `emmit` 을 이용한 약어 사용으로 추가 속성을 지정한다.
  > `bg-primary`, `ta-center`, `c-primary`, `dp-flex`

### 속성(property) 선언 순서 <a id="css-property-order" href="#css-property-order">#</a>

- 포지셔닝과 박스모델 관련 속성을 가장 먼저 작성하고 나머지는 뒤에 놓습니다.
- `display`, `overflow`, `float`, `position`, `width & height`, `margin & padding`
- `.vscode > .setting.json`에 있는 파일을 사용하여 자동정렬되도록 설정합니다.

### 전처리문 중첩 <a id="css-preprocessor-nesting" href="#css-preprocessor-nesting">#</a>

과도하게 중첩하지 않습니다. 선택자 반복을 피하는 용도로만 중첩을 사용하십시오.

```css
/* Without nesting */
.table > thead > tr > th { … }
.table > thead > tr > td { … }

/* With nesting */
.table > thead th {...}
```

---

## HTML <a id="basic" href="#html">#</a>

### HTML 문법 <a id="html-syntax" href="#html-syntax">#</a>

- 초기파일은 셉템 공통파일을 따릅니다.
- attr 우선순위 등은 기본 json 세팅을 따릅니다.
- 단일 태그에는 슬래시(/)를 사용하지 않습니다. (예: &lt;br /&gt; or &lt;img /&gt;)
- 마크업의 깊이가 깊어질 때마다 탭 1개(Tab 크기:4)만큼 들여쓰지만 다음의 경우 들여쓰지 않는다.
  - `html` 의 자식 요소인 `head`, `body`
  - `head` 의 자식 요소
  - `body` 의 자식 요소

```html
<html>
  <head>
    <meta … />
    <title></title>
    <head>
      <body>
        <div id="wrap">
          <nav>...</nav>
        </div>
      </body>
      <html></html>
    </head>
  </head>
</html>
```

### HTML5 doctype <a id="html-doctype" href="#html-doctype">#</a>

모든 HTML 페이지 시작 지점에 공백 없이 HTML5 문서 타입을 선언합니다.

```html
<!DOCTYPE html>
<html>
  ...
</html>
```

### 언어(lang) 속성 <a id="html-lang" href="#html-lang">#</a>

문서 루트인 `html` 요소에 `lang` 속성을 추가합니다.

- 영어: `en`
- 한국어: `ko`
- 일본어: `ja`

```html
<html lang="ko"></html>
```

### 인코딩 설정 <a id="html-charset" href="#html-charset">#</a>

문자열 인코딩을 명시적으로 선언합니다.

```html
<head>
  <meta charset="UTF-8" />
</head>
```

### IE 호환모드 설정 <a id="html-ie-compatible" href="#html-ie-compatible">#</a>

- 작업 시작전 최저사양을 우선적으로 확인하고 작업 완료시에도 해당브라우저로 꼭 테스트 합니다.
- 인터넷 익스플로러가 항상 최신 버전의 레이아웃 엔진을 사용하여 문서를 렌더링하도록 지정합니다.

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
```

### CSS, JavaScript 삽입 <a id="html-type-attr" href="#html-type-attr">#</a>

CSS와 JavaScript를 불러올 때 `type` 속성을 생략합니다.

```html
<!-- External CSS -->
<link rel="stylesheet" href="code-guide.css" />

<!-- In-document CSS -->
<style>
  ...;
</style>

<!-- JavaScript -->
<script src="code-guide.js"></script>
```

### 속성(attr) 선언 순서 <a id="html-attr-order" href="#html-attr-order">#</a>

HTML 태그 속성은 가독성을 위해 아래 순서대로 작성합니다.

\*\* setting.json 기준으로 수정필요

1. 선택자로 사용하는 `id`, `class` 속성은 가장 앞에 선언합니다.
2. 콘텐츠를 설명하는 `alt`, `title`, `role`, `aria-*` 속성은 가장 뒤에 선언합니다.

```html
<a id="..." class="..." href="#">Example link</a>
<input class="form-control" type="text" />
<img src="..." alt="..." title="..." />
```

### Boolean 속성 <a id="html-boolean-attr" href="#html-boolean-attr">#</a>

불리언 속성의 값은 지정하지 않습니다.

```html
<input type="text" disabled />
<input type="checkbox" value="1" checked />
<option value="1" selected>1</option>
```

### 마크업 간소화 <a id="html-simplification" href="#html-simplification">#</a>

모듈화를 고려하여 과도한 마크업을 지양한다.

```html
<!-- Not so great -->
<span class="avatar">
  <img src="..." alt="..." />
</span>

<!-- Better -->
<img class="avatar" src="..." alt="..." />
```

### 문서 개요(HTML5 아웃라인) <a id="html-outline" href="#html-outline">#</a>

- 섹셔닝 요소와 헤딩 요소를 이용하여 문서 개요를 논리적으로 구성합니다. 섹셔닝 요소(`header`, `footer`, `section`, `article`, `nav`, `aside`,`figure`)에는 헤딩 요소를 명시적으로 사용합니다.
- 명시적 헤딩 기법은 `h1` 요소는 한 페이지에 한 번 `header`안에서만 사용합니다. 다른 h태그는 사용하지 않습니다.

### 주석 <a id="html-comment" href="#html-comment">#</a>

- 태그 구분시
  - 앤드 주석시 `//`를 사용합니다.
    ```html
    <!-- GNB -->
    …
    <!-- //GNB -->
    ```
- 수정시
  - `[수정날짜]`를 꼭 사용하며, 이름은 생략 가능하다.
    ```html
    <!-- [2023-01-01] 홍길동 : 문구 수정 -->
    …
    <!-- //[2023-01-01] 홍길동 : 문구 수정 -->
    ```
- 개발시 참고할 안내 주석 표시
  - `[D]`라는 말머리를 사용하여 확인하기 쉽게 합니다.
    ```html
    <!-- [D] 케이스별 클래스 변화
    의사 : my-doctor
    변호사 : my-lawyer -->
    ```
- a태그
  - 태그가 비어있을 경우 또는 이미지로 되어 있을 경우 title을 꼭 명시한다. 'OO으로 이동', 'OO버튼'
  - 타 사이트로 이동하는 경우가 아니라면 `button`태그를 사용한다. (disabled 이슈)
  - 부득이하게 a태그를 사용해야 하는 경우 `role="button`을 사용한다.
  - a태그의 href는 href="`javascript:;`"로 통일한다.
    ```html
    <a href="javascript:;" role="button" title="예금 페이지로 이동"></a>
    ```

---

## 이미지 <a id="image" href="#image">#</a>

### 파일명규칙 <a id="image-naming" href="#image-naming">#</a>

- 파일명은 모두 소문자를 사용하며 두 단어의 조합은 `_`를 사용합니다.
- 동일한 파일명이 여러개일 경우 `_01` 또는 `_001`부터 시작 합니다. 한자리 수는 사용하지 않는다.
- `형태_의미_상태` 순서로 조합합니다. ex) `btn_septem_mail.gif`
- 이미지명 약속어
  | 이미지명 | 타입 |
  | :--: | :--: |
  | line* | 선 |
  | bg* | 배경, 박스 |
  | arr* | 화살표(svn) |
  | ico* | 아이콘 |
  | btn* | 버튼(기능이 있는 경우) |
  | header* | 헤더에서만 사용하는 버튼 |
  | footer* | 푸터에서만 사용하는 버튼 |
  | img* | 이미지 |
  | bn* | 배너 |
  | sp* | 스프라이트 |
- ['common', 'content']
- 페이지내에서만 사용되는 콘텐츠 이미지를 제외한 모든 이미지는 common에 등록한다.

### 공통아이콘 <a id="image-comm" href="#image-comm">#</a>

- 공통 아이콘은 svg로 저장 후 CSS에 넣어서 사용합니다.

### 네이밍 참고

- [네이밍 만들기](project.md)
- [개발환경 셋팅](setting.md)
