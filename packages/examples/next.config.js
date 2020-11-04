const withLess = require('@zeit/next-less')
const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
const {
    withModuleFederation,
    MergeRuntime,
} = require("@module-federation/nextjs-mf");

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
        const { buildId, dev, isServer, defaultLoaders, webpack } = options;
        const mfConf = {
            mergeRuntime: true, //experimental
            name: "next3",
            library: { type: config.output.libraryTarget, name: "next3" },
            filename: "static/runtime/remoteEntry.js",
            remotes: {
                next1: isServer
                    ? "next1@http://localhost:3000/_next/static/remoteEntryMerged.js"
                    : "next1",
            },
            exposes: {

            },
            shared: [],
        };

        withModuleFederation(config, options, mfConf);

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
            config.devtool = 'eval-source-map'
        }
        return config
    }
}
module.exports = withLess(nextConfig)
