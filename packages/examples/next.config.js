const withLess = require('@zeit/next-less')
const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')

if (typeof require !== 'undefined') {
    require.extensions['.less'] = (file) => {
    }
}

const loadedVarOverrides = fs.readFileSync(path.resolve(__dirname, './client/config-overrides-antd-vars.less'), 'utf8')

// Pass in file contents
const modifyVars = lessToJs(loadedVarOverrides)

const nextConfig = {
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars
    },
    distDir: '../build/client',
    exportPathMap: function () {
        return {
            '/': { page: '/index' },
            '/docs': { page: '/docs' },
        }
    },
    webpack (config, options) {
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: 'raw-loader',
                    options: {
                        esModule: false,
                    }
                }
            ]
        })
        config.resolve.alias['~/components'] = path.join(__dirname, 'client/components')
        config.resolve.alias['~/client'] = path.join(__dirname, 'client')
        if (options.dev) {
            config.devtool = 'cheap-docs-eval-source-map'
        }
        return config
    }
}
module.exports = withLess(nextConfig)
