module.exports = {
    pluginOptions: {
        apollo: {
            typescript: true,
        },
    },
    css: {
        loaderOptions: {
            postcss: {
                config: {
                    path: __dirname
                }
            }
        }
    }
};
