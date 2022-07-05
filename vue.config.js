/* eslint-disable @typescript-eslint/no-var-requires */
// const StyleLintPlugin = require("stylelint-webpack-plugin");
// const path = require(`path`);

module.exports = {
  // configureWebpack: {
  //   plugins: [
  //     new StyleLintPlugin({
  //       files: ["src/**/*.{vue,scss}"],
  //     }),
  //   ],
  //   resolve: {
  //     symlinks: false,
  //     alias: {
  //       vue: path.resolve(`./node_modules/vue`),
  //     },
  //   },
  // },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/variables.scss";
        `,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/TangoSecret/tango-secret/'
    : '/',
  lintOnSave: true,
};
