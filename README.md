# Pengolahan Citra Tapi WASM

Aplikasi ini dibangun menggunakan Photon.

Pastikan kalian sudah menginstall [Rust](https://www.rust-lang.org/tools/install).

Cara menjalankan:

1. Clone repository ini

    ```bash
    git clone
    ```

2. Masuk ke folder repositori lalu masuk lagi ke folder `crate` dan jalankan `wasm-pack build`. Pastikan kalian sudah menginstall [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) melalui `cargo`.

    ```bash
    cd citra-wasm-react/crate
    wasm-pack build
    ```

3. Jika sudah, akan ada sebuah folder baru bernama `pkg`. Masuk ke situ dan jalankan `npm link`.

    ```bash
    cd pkg
    npm link
    ```

4. Lalu masuk ke folder `react-app` dan jalankan `npm install`.

    ```bash
    cd ../../react-app
    npm install
    ```

5. Jika sudah, install `react-app-rewired` dan `wasm-loader`

    ```bash
    npm install react-app-rewired wasm-loader -D
    ```

6. Jalankan `npm link photon`

    ```bash
    npm link photon
    ```

7. Jalankan react-app-nya

    ```bash
    npm start
    ```