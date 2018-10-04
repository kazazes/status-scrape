module.exports = {
  pluginOptions: {
    apollo: {
      typescript: true
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: "/Users/pk/repositories/status-scrape/packages/frontend"
        }
      }
    },
    sourceMap: true
  },
  chainWebpack: config => {
    config.plugin("fork-ts-checker").tap(args => {
      const a = args;
      a.tslint = `${__dirname}/tslint.json`;
      return a;
    });

    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader")
      .tap(options => {
        const o = options;
        o.configFile = `${__dirname}/tsconfig.json`;
        return o;
      });
  }
};
