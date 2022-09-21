# WEBPACK truyền kỳ
* Webpack là gì?
    - là một gói module cho các ứng dụng Javascript.
    - Đóng gói nhiều file Javascript, CSS thành một file duy nhất, tổ chức lại các file js hợp lý.
    - Gói gọn các file Javascript và Css thành một file gọn nhất.
    - Conpile các file SCSS, Typescript một cách tự động.
    - Tối ưu hóa image, SVG, nén các file với dung lượng nhỏ nhất, hoặc chuyển đổi file thành URL (Base64) và chèn URL này vào Bundle
    - Giúp thao tác local, development hay server một cách thuận lợi, như tự động loading (build) khi save, hay kiếm soát quá trình upload file tránh sai sót, ...

    Note: Về thời nguyên thuỷ thì người ta thường chạy những file js cũng như những lib js bằng cách import hết những path của những file js đó vào một file .html thông qua thẻ 
    ```
    <script src=""> </script>
    ```
    Sau này khi đến thời kỳ khởi nguyên, dự án của bạn phình to ra, dẫn đến bạn phải import quá nhiều file js cũng như bạn không thể kiểm soát được version của các lib bạn sử dụng.
    Từ đó NPM ra đời, để giải quyết những vấn đề đó.

    ```
    npx webpack === ./node_modules/.bin/webpack
    ```

    Để run your file config
    ```
    npx webpack --config webpack.config.js
    ```

    - Trong folder dist chỉ cần có file index.html thì khi build nó sẽ tự sinh ra các file js khác. 

    Note: webpack chỉ hiểu được file javascript và JSON file

    1. core concept
    - loader (phạm vị đối với các module): Trước khi import file typecript hay scss,... phải có tiền sử lý loader nó sẽ can thiệp vào trước khi import để convert thành 1 cái module hợp lẹ
        + text: đề cập tới file mà mình muốn can thiệp vào. ex: /\.tst$/ (đối với typescript)...
        + use: trong phạm vị của text thì loader nào đc sử dụng
    
    - Plugins(pham vị rộng hơn loader): Giúp chúng ta mở rộng nhiều tinh năng hay ho, nó có thể can thiêp vào phạm vị rộng hơn loader, có thể là cả folder
        + có 2 loaị: build in plugin và các plugin cộng đồng phát triển. Cái nào plugin nào ở ngoài thì phải installed via npm và defined nó để dùng.
    
    - Mode
    - Watch Mode: Tự động theo dõi sự thay đổi: Bạn sẽ không cần phải chạy lại lệnh npx webpack để bundle.
    ```
    watch: true      ->     Bằng với: npx webpack --watch
    ```
    - Tự động tạo HTML với HtmlWebpackPlugin (plugin phát triển từ cộng đồng): Tự động phát hiện ra sự thay đổi khi bạn thay đổi tên file output
    - Tham khảo thêm: https://www.npmjs.com/package/html-webpack-plugin
    - Khi dự án của các bạn thay đổi, bạn cần thay đổi tên file nhiều lần. Như vậy, mỗi lần build sẽ sinh ra rất nhiều file trong dist.
    => sử dụng Clean plugin for webpack -> clean-plugin-webpack.
    Nhưng có một cách mới hơn đến từ webpack: sử dụng property "clean: true" trong phần output

    - Trong quá trình làm bạn sẽ gây ra những lỗi, ví dụ như có 1 biến undefined và bạn muốn show nó ra ở console để biết được là lỗi đó đến từ file nào.
    => ngày trước ở những phiên bản cũ để show ra lỗi ở file nào bạn cần dùng
    ```
    devtool: 'inline-source-map'
    ```

    - devServe: npm i webpack-dev-server --save-dev : Cài đặt nó sẽ giúp bạn tự động run project với port mà bạn mong muốn.
    ```
    devServer: {
        // open: true, // "dev": "webpack serve --open" setup -open tương đương với viẹc set open: true
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
    },
    ```

    - Multiple entry points: file index.js là 1 điểm entry point và sau khi build nó sẽ được compile ra 1 điểm entry point khác. Nhưng khi các bạn có nhiều hơn 1 điểm entry point thì sao?
    ```
    entry: {
        main: './src/index.js',
        test: './src/test.js'
    }, // file nguon lay tu day (bat dau doc tu day) - không thể tự change khi đổi tên ở đây
    output: {
        filename: ' [name].js',
        path: path.resolve(__dirname, 'dist'), // sinh ra file bundle nam trong dist
        clean: true // cách mới clean file rác của webpack
    },
    ```
    Các bạn chỉ việc defined thêm 1 file nữa ở phần entry, và phải đổi tên của output - filename thành [name].js để webpack nó tự động compile xuống. => nó sẽ sinh ra 2 file bundle khác nhau.
    
    + Thêm một các khác nữa là bây giờ các bạn có 2 điểm entry point nhưng chỉ muốn bundle ra 1 file duy nhất.
    ```
    entry: {
        main: ['./src/index.js', './src/test.js'],
        // test: './src/test.js'
    }, // file nguon lay tu day (bat dau doc tu day) - không thể tự change khi đổi tên ở đây
    output: {
        filename: ' oneFileBundle.js',
        path: path.resolve(__dirname, 'dist'), // sinh ra file bundle nam trong dist
        clean: true // cách mới clean file rác của webpack
    },
    ```
    Lúc này ở phần output - filename bạn chẳng cần phải đổi tên nữa, mà đặt hẳn 1 cái tên cho file bundle luôn


* Optimize project với Code Splitting: Khi bạn cùng lúc import 1 thư viện vào 2 entry point và khi build nó tạo ra 2 file bundle với dung lượng lớn khiến cho source của bạn bị chậm đi. 

* Biên dịch code cho browser cũ với Babel: Babel sẽ giúp bạn conpile code sang những phiên bản cũ hơn để các trình duyệt khác có thể hiểu được.

* Css loader:
    npm install --save-dev style-loader css-loader
    ```
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
    ```
    => Optimization Css
    Để tạo được file minify CSS tự động, ta cần thực hiện các bước sau:
    + Cài đặt plugin MiniCssExtractPlugin: plugin này có rất nhiều ứng dụng hay, sẽ giới thiệu ở bài khác nhe.
    + Cài đặt plugin OptimizeCSSAssetsPlugin.
    + Chỉnh webpack.config.js.
    + Chạy build lại

* 


