const path = require('path')
module.exports = {
    mode: 'production',
    optimization: { minimize: false },
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: ['babel-loader',
                {
                    loader: 'ts-loader',
                    options: {
                        // 加快编译速度
                        transpileOnly: true,
                        // 指定特定的ts编译配置，为了区分脚本的ts配置
                        configFile: path.resolve(__dirname, './tsconfig.json')
                    }
                }
            ],
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.json'
        ]
    }
}
