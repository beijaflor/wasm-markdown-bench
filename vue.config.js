const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const path = require('path');

const options = {
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

// import { ProjectOptions } from '@vue/cli-service';
// import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';
// import * as path from 'path';

// const options: ProjectOptions = {
//   configureWebpack: {
//     plugins: [
//       new WasmPackPlugin({
//         crateDirectory: path.join(__dirname, 'wasm-markdown/pkg'),
//       }),
//     ],
//   },
// };

// module.exports = options;
