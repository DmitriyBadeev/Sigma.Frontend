const CracoLessPlugin = require("craco-less")

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#7F48DA",
                            "@font-size-base": "15px",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
