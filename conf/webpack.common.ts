import path from 'path'
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import webpack = require('webpack')

const rootPath = path.resolve(__dirname, '..')
const entryPath = path.resolve(rootPath, 'src/index.tsx')
const outputPath = path.resolve(rootPath, './public')

const commonConfig: webpack.Configuration = {    
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: path.resolve(rootPath, './tsconfig.json'),
            }),
        ],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'swc-loader',
            options:  {
              jsc: {
                parser: {
                  syntax: "typescript",
                  dynamicImport: true,
                  decorators: true,
                  tsx: true,
                },
                "transform": {
                  "legacyDecorator": true
                }
              },
            },
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        index: entryPath,
    },
    output: {
        filename: 'bundle.[hash].js',
        path: outputPath,
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(rootPath, './tsconfig.json'),
        }),
    ],
}

module.exports = commonConfig