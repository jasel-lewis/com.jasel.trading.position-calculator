const path = require('path');
const rules = require('./webpack.rules');

rules.push({
  // Loaders run bottom-to-top: postcss-loader (Tailwind) -> css-loader -> style-loader
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'postcss-loader' }
  ]
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules
  },
  resolve: {
    // Lets shadcn's `@/...` imports (e.g. `@/lib/utils`) resolve to ./src
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    // `.jsx` added so extensionless shadcn component imports resolve
    extensions: ['.js', '.jsx', '.json']
  }
};
