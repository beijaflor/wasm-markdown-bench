const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const path = require('path');

const options = {
  publicPath: '/wasm-markdown-bench/',
  configureWebpack: {
    plugins: [
      new WasmPackPlugin({
        crateDirectory: path.join(__dirname, 'wasm-markdown/pkg'),
        withTypeScript: true,
      }),
    ],
  },
};

module.exports = options;
