# Sass Architecture Structure

```
sass/
|
|-- utilities/
|       - _variables.scss
|       - _mixins.scss
|       - _extends.scss
|
|- reset/
|       - _reset.scss
|       - _typography.scss
|
|- components/
|       - _example0.scss
|       - _example1.scss
|       - _example2.scss
|
|- layout/
|       - _example0_layout.scss
|       - _example1_layout.scss
|       - _example2_layout.scss
|
|- pages/
|       - _home.scss
|       - _settings.scss
|       - _another_page.scss
|
|- third-party-css/
|       – _bootstrap.scss
|
- main.scss

```
### Sử dụng biến trong SCSS + toán tử như các ngôn ngữ cơ bản 
    - Điều này hoạt động rất tốt khi chúng ta có một hệ thống thiết kế và muốn giữ cho màu sắc, kích thước tiêu đề và họ phông chữ nhất quán.
    
    ```
    // Css
    :root {
        --main-color: #000000;
        --main-bg: #FAFAFA;
    }
    body {
        background: var(--main-bg);
        color: var(--main-color);
    }
    ```

    ```
    // Scss
    $main-color: #000000;
    $main-bg: #FAFAFA;
    body {
        background: $main-bg;
        color: $main-color;
    }
    ```
### Sử dụng Interpolation và mixins: giúp code style của bạn trở lên thiên biến vạn hoá hơn, tái sử dụng hiệu quả.
    ```
    @mixin icon-name($name) {
        .icon-#{$name} {
            background-image: url("../images/#{$name}.png);
        }
    }
    ```

    ```
    @mixin flexContainer($direction, $justify, $align) {
        display: flex;
        flex-direction: $direction;
        justify-content: $justify;
        align-items: $align;
    }
    .main-container {
        @include flexContainer(column, center, center);
    }
    ```

### Extends: SCSS @extend, kế thừa những thuộc tính của thành phần khác đã được khai báo trước đó, giúp giảm thời gian code và trùng lặp code.
    Scss
    ```
    .box {
        background-color: #f1f1f1;
        border: 1px solid #ccc;
    }
    .section {
        @extend .box;
        padding: 20px;
    }
    ```

    Css
    ```
    .box, .section {
        background-color: #f1f1f1;
        border: 1px solid #ccc;
    }
    .section {
        padding: 20px;
    }
    ```
    NOTE: 
    - Chú ý là thành phần kế thừa và được kế thừa phải tương thích nhau. 
    Scss
    ```
    p.box {
        background-color: #f1f1f1;
        border: 1px solid #ccc;
    }
    div.section {
        @extend .box;
        padding: 20px;
    }
    ```
    Css
    ```
    p.box {
        background-color: #f1f1f1;
        border: 1px solid #ccc;
    }

    div.section {
        padding: 20px;
    }
    ```
    Không kế thừa được, vì p và div không tương thích nhau.
    
    4. SCSS placeholders: 
    - Cách sử dụng SCSS placeholder khá giống với @mixin, tuy nhiên các thành phần sử dụng placeholders sẽ được gom chung vào cùng một bộ các thuộc tính.
    Note: Placeholder không sử dụng đối số

    5. SCSS function
    - SCSS @function, khá giống nhau với @mixin, tuy nhiên thay vì biên dịch CSS style như @mixin, thì @function sẽ @return giá trị, thuộc tính, hoặc function hoặc thậm chí là một @mixin.

    ```
    @function getWidth($widthWarp, $item) {
        @return $widthWarp / $item;
    }
    .list {
        width: 600px;
        li {
            float: left;
            width: getWidth(600px,4);
        }
    }
    ```

    6. SCSS câu lệnh @if @else
    7. @for
    8. @while
    9. @each
    Những phần trên khá giống mixin tuỳ vào từng TH mà ứng biến. Chúng ta lướt nhanh tới phần quan trọng ở ngay bên dưới.

### Sass Best Practice and Tips

### BEM(Block-Element-Modifier) hiểu đơn giản nó là một quy ước đặt tên trong CSS. Nó giúp cho việc code CSS trở nên dễ đọc, dễ bảo trì và tránh bị đè thuộc tính khi bị trùng tên class, …
    - Nói về điểm mạnh và các dùng BEM thì quá là đơn giản rồi. Tôi sẽ chỉ ra những lỗi cần tránh khi sử dụng.
    
    * NHỮNG SAI LẦM: 
        + Trường hợp sau phần element lại có thêm các thẻ con nữa. 
        ```
        <div class="card">
            <div class="card__header">
                <h2 class="card__header__headline"></h2>
            </div>
        </div>
        ```
        X: Không đúng vì viết như này thì sau phần modifier sẽ rất dài.
        ```
        <div class="card">
            <div class="card__header">
                <h2 class="card__headline"></h2>
            </div>
        </div>
        ```
        O: Cứ viết như 1 element bình thường cho nó lành.

        + Vậy viết modifier sao cho hay:
        => Khi viết modifier thì bắt buộc phải có phần block hoặc element trước nó.
        ```
        <div class="card--highlight">
            <div class="card__header"></div>
        </div>

        <div class="card">
            <div class="card__header--important"></div>
        </div>
        ```
        X: Không đúng vì trước modifier phải có block hoặc element.
        
        ```
        <div class="card card--highlight">
            <div class="card__header"></div>
        </div>

        <div class="card">
            <div class="card__header card__header--important"></div>
        </div>
        ```
        O: Ví dụ trên nhìn ổn hơn rồi đó.

        + Phải làm sao khi block quá lớn ?
        => Sử dụng BEM vào một khổi quá lớn, có rất nhiều thẻ con là một điều hơi cố chấp. BEM sinh ra là để tạo ra các khổi module vừa, nhỏ và có thể tái sử dụng.
        Nên không phải lúc nào cũng sử dụng BEM, đây có thể là nhược điểm của BEM chăng ?

        X: Không nên
        ```
        <div class="body">
            <header class="body__header"></header>
            <main class="body__main"></main>
            <footer class="body__footer"></footer>
        </div>
        ```

        O: tách nhỏ ra cho để rối
        ```
        <div class="body">
            <header class="body__header"></header>
            <main class="body__main"></main>
            <footer class="body__footer"></footer>
        </div>
        ```

* Đây là kinh nghiệm cá nhân chia sẻ lại tất nhiên là có tham khảo qua một vài trang kiến thức rất nhiều bài viết hay như: https://dev.to/, https://www.w3schools.com/sass/ và
không thể thiếu https://sass-lang.com/documentation/,... vân vân và mây mây. Trên đây là những kiến thức giúp bạn tiếp cận sass nhanh nhất.

