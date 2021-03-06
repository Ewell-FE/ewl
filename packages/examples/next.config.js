const withLess = require('@zeit/next-less')
const path = require('path')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
const ModuleFederationPlugin = require("webpack").container
    .ModuleFederationPlugin;
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


const nextServerRemote = (remoteObject) => {
    if (!typeof remoteObject === "object") {
        throw new Error("Remotes must be configured as an object");
    }
    return Object.entries(remoteObject).reduce((acc, [name, config]) => {
        acc[name] = {
            external: `external new Promise(res => {
      let remote
      try {
      remote = require('${config}')['${name}']
      } catch (e) {
      delete require.cache['${config}']
      remote = require('${config}')['${name}']
      }
      const proxy = {get:(request)=> remote.get(request),init:(arg)=>{try {return remote.init(arg)} catch(e){console.log('remote container already initialized')}}}
      res(proxy)
      })`,
        };
        return acc;
    }, {});
};

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
                next2: isServer
                    ? "next2@http://localhost:3001/_next/static/remoteEntryMerged.js"
                    : "next2",
            },
            exposes: {

            },
            shared: [],
        };

        // withModuleFederation(config, options, mfConf);

        if (!isServer) {
            config.externals = {
                react: "React",
            };
        }
        const federationConfig = {
            name: mfConf.name,
            library: mfConf.library
                ? mfConf.library
                : { type: config.output.libraryTarget, name: mfConf.name },
            filename: "static/runtime/remoteEntry.js",
            remotes: options.isServer
                ? nextServerRemote(mfConf.remotes)
                : mfConf.remotes,
            exposes: mfConf.exposes,
            shared: mfConf.shared,
        };
        // config.plugins.push(
        //     new ModuleFederationPlugin(federationConfig)
        // );

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
